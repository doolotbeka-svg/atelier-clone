import express from 'express';
import crypto from 'crypto';
import { readJson, writeJson, saveImage, openFile, isAllowedImageType } from './storage.js';

const CONTENT_PATH = 'content/site.json';
const ADMIN_PATH = 'config/admin.json';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || '1995';

interface AdminConfig {
  salt: string;
  hash: string;
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 32).toString('hex');
}

async function checkPassword(password: string): Promise<boolean> {
  const config = await readJson<AdminConfig>(ADMIN_PATH);
  if (!config) {
    const a = Buffer.from(password);
    const b = Buffer.from(DEFAULT_PASSWORD);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }
  const candidate = Buffer.from(hashPassword(password, config.salt), 'hex');
  const stored = Buffer.from(config.hash, 'hex');
  return candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored);
}

// Slows down password guessing; per instance only, so it is a speed bump rather than a lock
const failedAttempts = new Map<string, { count: number; until: number }>();

function clientKey(req: express.Request): string {
  const fwd = req.headers['x-forwarded-for'];
  return (Array.isArray(fwd) ? fwd[0] : fwd || req.ip || 'unknown').split(',')[0].trim();
}

const requireAdmin: express.RequestHandler = async (req, res, next) => {
  try {
    const key = clientKey(req);
    const entry = failedAttempts.get(key);
    if (entry && entry.until > Date.now()) {
      res.status(429).json({ error: 'too_many_attempts' });
      return;
    }
    const password = String(req.headers['x-admin-password'] || '');
    if (!password) {
      res.status(401).json({ error: 'unauthorized' });
      return;
    }
    if (await checkPassword(password)) {
      failedAttempts.delete(key);
      next();
      return;
    }
    const count = (entry?.count || 0) + 1;
    failedAttempts.set(key, { count, until: count >= 5 ? Date.now() + 60_000 : 0 });
    await new Promise((r) => setTimeout(r, 400));
    res.status(401).json({ error: 'unauthorized' });
  } catch (err) {
    next(err);
  }
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Site content edited in the admin panel (#admin) and published for every visitor
export function createSiteRouter() {
  const router = express.Router();

  router.get('/content', async (_req, res, next) => {
    try {
      const saved = await readJson<Record<string, unknown>>(CONTENT_PATH);
      res.set('Cache-Control', 'no-store');
      res.json({ content: saved });
    } catch (err) {
      next(err);
    }
  });

  router.put('/content', requireAdmin, express.json({ limit: '3mb' }), async (req, res, next) => {
    try {
      const content = req.body?.content;
      if (!isPlainObject(content)) {
        res.status(400).json({ error: 'bad_content' });
        return;
      }
      const updatedAt = new Date().toISOString();
      await writeJson(CONTENT_PATH, { ...content, updatedAt });
      res.json({ ok: true, updatedAt });
    } catch (err) {
      next(err);
    }
  });

  router.post('/admin/login', requireAdmin, (_req, res) => {
    res.json({ ok: true });
  });

  router.post('/admin/password', requireAdmin, express.json(), async (req, res, next) => {
    try {
      const newPassword = typeof req.body?.newPassword === 'string' ? req.body.newPassword.slice(0, 100) : '';
      if (newPassword.length < 4) {
        res.status(400).json({ error: 'too_short' });
        return;
      }
      const salt = crypto.randomBytes(16).toString('hex');
      await writeJson(ADMIN_PATH, { salt, hash: hashPassword(newPassword, salt) });
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/upload',
    requireAdmin,
    express.raw({ type: () => true, limit: '4mb' }),
    async (req, res, next) => {
      try {
        const contentType = String(req.headers['content-type'] || '').split(';')[0].trim();
        if (!isAllowedImageType(contentType) || !Buffer.isBuffer(req.body) || req.body.length === 0) {
          res.status(400).json({ error: 'bad_image' });
          return;
        }
        const pathname = await saveImage(req.body, contentType);
        res.json({ url: `/api/files/${pathname}` });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get('/files/*', async (req, res, next) => {
    try {
      const pathname = (req.params as Record<string, string>)[0];
      if (!/^uploads\/[\w.-]+$/.test(pathname)) {
        res.status(404).end();
        return;
      }
      const file = await openFile(pathname);
      if (!file) {
        res.status(404).end();
        return;
      }
      res.set('Content-Type', file.contentType);
      // Upload names are unique, so the file never changes
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
      file.stream.pipe(res);
    } catch (err) {
      next(err);
    }
  });

  router.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Site API error:', err);
    if (err?.type === 'entity.too.large') {
      res.status(413).json({ error: 'too_large' });
      return;
    }
    res.status(500).json({ error: 'server_error' });
  });

  return router;
}

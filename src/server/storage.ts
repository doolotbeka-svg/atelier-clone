import { put, get, list, del } from '@vercel/blob';
import { promises as fs, createReadStream } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Readable } from 'stream';

// Private Vercel Blob in production; a local folder when no Blob token is configured (local dev)
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
const LOCAL_DIR = path.resolve(process.cwd(), '.data');

function localPath(pathname: string): string {
  const full = path.resolve(LOCAL_DIR, pathname);
  if (!full.startsWith(LOCAL_DIR + path.sep)) throw new Error('Invalid path');
  return full;
}

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  return new Response(stream).text();
}

export async function readJson<T>(pathname: string): Promise<T | null> {
  if (useBlob) {
    const res = await get(pathname, { access: 'private', useCache: false }).catch((err) => {
      if (err?.name === 'BlobNotFoundError') return null;
      throw err;
    });
    if (!res || res.statusCode !== 200) return null;
    return JSON.parse(await streamToText(res.stream)) as T;
  }
  try {
    return JSON.parse(await fs.readFile(localPath(pathname), 'utf8')) as T;
  } catch (err: any) {
    if (err?.code === 'ENOENT') return null;
    throw err;
  }
}

export async function writeJson(pathname: string, data: unknown): Promise<void> {
  const body = JSON.stringify(data);
  if (useBlob) {
    await put(pathname, body, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    });
    return;
  }
  const file = localPath(pathname);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, body);
}

const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export function isAllowedImageType(contentType: string): boolean {
  return contentType in EXT_BY_TYPE;
}

// Stores an uploaded image under a random name and returns its pathname
export async function saveImage(data: Buffer, contentType: string): Promise<string> {
  const pathname = `uploads/${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${EXT_BY_TYPE[contentType]}`;
  if (useBlob) {
    await put(pathname, data, { access: 'private', addRandomSuffix: false, contentType });
    return pathname;
  }
  const file = localPath(pathname);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data);
  return pathname;
}

export async function openFile(pathname: string): Promise<{ stream: Readable; contentType: string } | null> {
  if (useBlob) {
    const res = await get(pathname, { access: 'private' }).catch((err) => {
      if (err?.name === 'BlobNotFoundError') return null;
      throw err;
    });
    if (!res || res.statusCode !== 200) return null;
    return { stream: Readable.fromWeb(res.stream as any), contentType: res.blob.contentType };
  }
  const file = localPath(pathname);
  try {
    await fs.access(file);
  } catch {
    return null;
  }
  const ext = path.extname(file).slice(1);
  const contentType = Object.keys(EXT_BY_TYPE).find((k) => EXT_BY_TYPE[k] === ext) || 'application/octet-stream';
  return { stream: createReadStream(file), contentType };
}

export async function listPaths(prefix: string): Promise<string[]> {
  if (useBlob) {
    const paths: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix, cursor, limit: 1000 });
      paths.push(...page.blobs.map((b) => b.pathname));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return paths;
  }
  try {
    const dir = localPath(prefix.replace(/\/$/, '') + '/.keep').replace(/\/\.keep$/, '');
    const names = await fs.readdir(dir);
    return names.map((n) => `${prefix.replace(/\/$/, '')}/${n}`);
  } catch (err: any) {
    if (err?.code === 'ENOENT') return [];
    throw err;
  }
}

export async function removePath(pathname: string): Promise<void> {
  if (useBlob) {
    await del(pathname);
    return;
  }
  await fs.rm(localPath(pathname), { force: true });
}

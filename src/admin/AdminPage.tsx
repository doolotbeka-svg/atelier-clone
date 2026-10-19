import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, KeyRound, Loader2, LogOut, RotateCcw, Upload } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { DEFAULT_CONTENT, SiteContent, normalizeContent } from '../content/siteContent';
import { ApiError, adminLogin, adminSession, changeAdminPassword, saveContent } from '../content/api';
import { FieldEditor } from './FieldEditor';
import { HIDDEN_TEXT_PATHS, TEXT_SECTION_LABELS } from './labels';
import { combineLanguages, pickLanguage } from './translationTree';

type DataSection = 'contacts' | 'heroSlides' | 'cases' | 'readyFurniture' | 'materials' | 'form' | 'configurator';
type SectionId = DataSection | 'texts' | 'security';

const SECTIONS: { id: SectionId; label: string; hint: string }[] = [
  { id: 'contacts', label: 'Контакты', hint: 'Телефоны, WhatsApp, почта и соцсети — в шапке, подвале, шоуруме и на кнопке WhatsApp.' },
  { id: 'heroSlides', label: 'Слайды главного экрана', hint: 'Фоновые фото первого экрана и подписи к ним. Можно добавить, убрать и поменять порядок.' },
  { id: 'cases', label: 'Портфолио', hint: 'Реализованные проекты: фото, чертёж, галерея, описание, материалы, цена.' },
  { id: 'readyFurniture', label: 'Готовая мебель', hint: 'Каталог мебели в наличии: фото, названия, размеры, материалы и цены.' },
  { id: 'materials', label: 'Материалы', hint: 'Библиотека материалов в разделе «Материалы».' },
  { id: 'form', label: 'Форма заявки', hint: 'Типы проектов и бюджеты в форме, подсказки в полях, подпись про визит в шоурум, заголовок карты.' },
  { id: 'configurator', label: '3D-конструктор', hint: 'Все надписи конструктора: заголовки, кнопки, вкладки, названия мебели, модулей, материалов и ручек.' },
  { id: 'texts', label: 'Тексты сайта', hint: 'Все надписи сайта. Каждая фраза — сразу на трёх языках: RU, EN и KG.' },
  { id: 'security', label: 'Пароль', hint: 'Смена пароля входа в админ-панель.' }
];

type TextKey = keyof SiteContent['translations']['ru'];

function errorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 401) return 'Неверный пароль.';
    if (err.status === 429) return 'Слишком много попыток. Подождите минуту.';
    if (err.status === 413) return 'Слишком большой объём данных.';
  }
  return 'Ошибка сервера. Попробуйте ещё раз.';
}

function LoginScreen({ onLogin }: { onLogin: (password: string) => void }) {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await adminLogin(password);
      onLogin(password);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141312] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-[#1D1B19] border border-white/10 rounded-sm p-8 space-y-5">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[#B38E5D] font-mono mb-2">Админ-панель</div>
          <h1 className="font-serif text-2xl tracking-[0.15em] uppercase text-white">Atelier Architectura</h1>
        </div>
        <label className="block space-y-2">
          <span className="text-xs text-neutral-400">Пароль</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#141312] border border-white/10 focus:border-[#B38E5D] rounded-sm px-3 py-2.5 text-white outline-none"
          />
        </label>
        {error && <div className="text-sm text-red-300">{error}</div>}
        <button type="submit" disabled={busy || !password} className="w-full flex items-center justify-center gap-2 py-3 bg-[#E8E4DF] hover:bg-[#B38E5D] text-[#141312] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm disabled:opacity-50 cursor-pointer">
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          Войти
        </button>
        <a href="#" className="block text-center text-xs text-neutral-500 hover:text-white">← Вернуться на сайт</a>
      </form>
    </div>
  );
}

function PasswordSection({ password, onChanged }: { password: string; onChanged: (p: string) => void }) {
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 4) return setMessage({ ok: false, text: 'Минимум 4 символа.' });
    if (next !== repeat) return setMessage({ ok: false, text: 'Пароли не совпадают.' });
    setBusy(true);
    setMessage(null);
    try {
      await changeAdminPassword(next, password);
      onChanged(next);
      setNext('');
      setRepeat('');
      setMessage({ ok: true, text: 'Пароль изменён.' });
    } catch (err) {
      setMessage({ ok: false, text: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const input = 'w-full bg-[#141312] border border-white/10 focus:border-[#B38E5D] rounded-sm px-3 py-2.5 text-white outline-none';
  return (
    <form onSubmit={submit} className="max-w-sm space-y-4">
      <label className="block space-y-1.5">
        <span className="text-xs text-neutral-300">Новый пароль</span>
        <input type="password" value={next} onChange={(e) => setNext(e.target.value)} className={input} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-xs text-neutral-300">Повторите пароль</span>
        <input type="password" value={repeat} onChange={(e) => setRepeat(e.target.value)} className={input} />
      </label>
      {message && <div className={`text-sm ${message.ok ? 'text-emerald-300' : 'text-red-300'}`}>{message.text}</div>}
      <button type="submit" disabled={busy} className="flex items-center gap-2 px-5 py-2.5 bg-[#E8E4DF] hover:bg-[#B38E5D] text-[#141312] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm disabled:opacity-50 cursor-pointer">
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
        Сменить пароль
      </button>
    </form>
  );
}

export default function AdminPage() {
  const { content, setContent } = useContent();
  const [password, setPassword] = useState(() => adminSession.get());
  const [checking, setChecking] = useState(() => Boolean(adminSession.get()));
  const [published, setPublished] = useState<SiteContent>(content);
  const [draft, setDraft] = useState<SiteContent>(content);
  const [section, setSection] = useState<SectionId>('contacts');
  const [textKey, setTextKey] = useState<TextKey>('hero');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  // A password remembered in this tab is re-checked before showing the editor
  useEffect(() => {
    if (!checking) return;
    adminLogin(password)
      .catch(() => {
        adminSession.clear();
        setPassword('');
      })
      .finally(() => setChecking(false));
  }, [checking, password]);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(published), [draft, published]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(t);
  }, [notice]);

  const combinedTexts = useMemo(
    () => combineLanguages(draft.translations.ru, draft.translations.en, draft.translations.ky) as Record<string, unknown>,
    [draft.translations]
  );

  if (checking) {
    return (
      <div className="min-h-screen bg-[#141312] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#B38E5D] animate-spin" />
      </div>
    );
  }

  if (!password) {
    return (
      <LoginScreen
        onLogin={(p) => {
          adminSession.set(p);
          setPassword(p);
        }}
      />
    );
  }

  const logout = () => {
    if (dirty && !window.confirm('Есть неопубликованные изменения. Выйти без сохранения?')) return;
    adminSession.clear();
    setPassword('');
    setDraft(published);
  };

  const publish = async () => {
    setSaving(true);
    try {
      const updatedAt = await saveContent(draft, password);
      const saved = { ...draft, updatedAt };
      setPublished(saved);
      setDraft(saved);
      setContent(normalizeContent(saved));
      setNotice({ ok: true, text: 'Опубликовано. Изменения уже видны всем посетителям.' });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setNotice({ ok: false, text: 'Пароль изменился или устарел. Войдите снова — правки останутся.' });
        adminSession.clear();
        setPassword('');
      } else {
        setNotice({ ok: false, text: `Не удалось опубликовать: ${errorMessage(err)}` });
      }
    } finally {
      setSaving(false);
    }
  };

  const discard = () => {
    if (window.confirm('Отменить все неопубликованные изменения?')) setDraft(published);
  };

  const meta = SECTIONS.find((s) => s.id === section)!;
  const ctx = { section, password };

  const resetSection = () => {
    if (section === 'security') return;
    if (!window.confirm('Вернуть этот раздел к исходному варианту сайта? Изменения станут видны после «Опубликовать».')) return;
    if (section === 'texts') {
      setDraft((d) => ({
        ...d,
        translations: {
          ru: { ...d.translations.ru, [textKey]: DEFAULT_CONTENT.translations.ru[textKey] },
          en: { ...d.translations.en, [textKey]: DEFAULT_CONTENT.translations.en[textKey] },
          ky: { ...d.translations.ky, [textKey]: DEFAULT_CONTENT.translations.ky[textKey] }
        }
      }));
    } else {
      setDraft((d) => ({ ...d, [section]: DEFAULT_CONTENT[section] }));
    }
  };

  const updateTexts = (key: TextKey, combined: unknown) => {
    setDraft((d) => ({
      ...d,
      translations: {
        ru: { ...d.translations.ru, [key]: pickLanguage(combined, 'ru') },
        en: { ...d.translations.en, [key]: pickLanguage(combined, 'en') },
        ky: { ...d.translations.ky, [key]: pickLanguage(combined, 'ky') }
      }
    }));
  };

  const renderTexts = () => {
    const keys = Object.keys(combinedTexts) as TextKey[];
    const current = combinedTexts[textKey];
    // Hide fields the site no longer reads, but keep their values when saving
    let shown = current;
    const hidden: Record<string, unknown> = {};
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      const visible: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(current)) {
        if (HIDDEN_TEXT_PATHS.has(`${textKey}.${k}`)) hidden[k] = v;
        else visible[k] = v;
      }
      shown = visible;
    }
    return (
      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-6">
        <div className="flex xl:flex-col gap-1 overflow-x-auto xl:overflow-visible pb-1">
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTextKey(k)}
              className={`shrink-0 text-left px-3 py-2 text-xs rounded-sm transition-colors cursor-pointer ${textKey === k ? 'bg-[#B38E5D]/15 text-white border-l-2 border-[#B38E5D]' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            >
              {TEXT_SECTION_LABELS[k] || k}
            </button>
          ))}
        </div>
        <div className="min-w-0">
          <FieldEditor
            key={textKey}
            name={textKey}
            label={TEXT_SECTION_LABELS[textKey] || textKey}
            value={shown}
            onChange={(v) => updateTexts(textKey, v && typeof v === 'object' && !Array.isArray(v) ? { ...(v as object), ...hidden } : v)}
            ctx={{ section: 'texts', password }}
            bare
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#141312] text-[#E8E4DF] font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#141312]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-serif text-lg tracking-[0.15em] uppercase text-white whitespace-nowrap">Atelier</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#B38E5D]">Админ-панель</span>
            {dirty ? (
              <span className="text-[11px] px-2 py-0.5 rounded-sm bg-amber-500/15 text-amber-300 whitespace-nowrap">Есть неопубликованные изменения</span>
            ) : (
              <span className="text-[11px] px-2 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-300 whitespace-nowrap hidden sm:inline">Всё опубликовано</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-300 hover:text-white border border-white/10 rounded-sm">
              <ExternalLink className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Сайт</span>
            </a>
            <button type="button" onClick={discard} disabled={!dirty} className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-300 hover:text-white border border-white/10 rounded-sm disabled:opacity-30 cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Отменить</span>
            </button>
            <button type="button" onClick={publish} disabled={!dirty || saving} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#B38E5D] text-[#141312] hover:bg-[#E8E4DF] rounded-sm disabled:opacity-40 cursor-pointer">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              Опубликовать
            </button>
            <button type="button" onClick={logout} title="Выйти" aria-label="Выйти" className="p-2 text-neutral-400 hover:text-white cursor-pointer">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        {notice && (
          <div className={`text-center text-sm py-2 ${notice.ok ? 'bg-emerald-500/15 text-emerald-200' : 'bg-red-500/15 text-red-200'}`}>{notice.text}</div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-6">
        {/* Sections */}
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:sticky lg:top-24 lg:self-start">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`shrink-0 text-left px-3 py-2.5 text-sm rounded-sm transition-colors cursor-pointer ${section === s.id ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Editor */}
        <main className="min-w-0 bg-[#1D1B19] border border-white/10 rounded-sm p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-6 pb-5 border-b border-white/10">
            <div>
              <h1 className="font-serif text-2xl text-white">{meta.label}</h1>
              <p className="text-sm text-neutral-400 mt-1 max-w-2xl">{meta.hint}</p>
            </div>
            {section !== 'security' && (
              <button type="button" onClick={resetSection} className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-400 hover:text-white border border-white/10 rounded-sm cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5" /> {section === 'texts' ? 'Вернуть исходные тексты блока' : 'Вернуть исходный вариант'}
              </button>
            )}
          </div>

          {section === 'security' && (
            <PasswordSection
              password={password}
              onChanged={(p) => {
                adminSession.set(p);
                setPassword(p);
              }}
            />
          )}
          {section === 'texts' && renderTexts()}
          {section !== 'security' && section !== 'texts' && (
            <FieldEditor
              key={section}
              name={section}
              value={draft[section]}
              onChange={(v) => setDraft((d) => ({ ...d, [section]: v }))}
              ctx={ctx}
              bare
            />
          )}
        </main>
      </div>
    </div>
  );
}

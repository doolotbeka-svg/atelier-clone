import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Copy, ImageUp, Loader2, Plus, Trash2 } from 'lucide-react';
import { ENUM_OPTIONS, FIELD_LABELS } from './labels';
import { uploadImage } from '../content/api';

const LANGS = [
  { id: 'ru', label: 'RU' },
  { id: 'en', label: 'EN' },
  { id: 'ky', label: 'KG' }
] as const;

type Json = unknown;

export interface EditorContext {
  // Top-level content section, used to pick enum options ("cases", "materials", …)
  section: string;
  password: string;
}

function isPlainObject(value: Json): value is Record<string, Json> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// { ru, en, ky } with string values is edited as one field with three inputs
export function isLocalized(value: Json): value is Record<'ru' | 'en' | 'ky', string> {
  if (!isPlainObject(value)) return false;
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((k) => k === 'ru' || k === 'en' || k === 'ky') && keys.every((k) => typeof value[k] === 'string');
}

const IMAGE_KEY = /(image|img|photo|picture|logo|avatar|gallery|cover)$/i;

function isImageField(name: string, value: Json): boolean {
  if (typeof value !== 'string') return false;
  if (IMAGE_KEY.test(name)) return true;
  return /^\/api\/files\//.test(value) || /^https?:\/\/\S+\.(jpe?g|png|webp|gif)(\?|$)/i.test(value) || /images\.unsplash\.com/.test(value);
}

export function fieldLabel(name: string): string {
  return FIELD_LABELS[name] || name;
}

// Title for a collapsed array item
function itemTitle(item: Json, index: number): string {
  if (isPlainObject(item)) {
    for (const key of ['title', 'name', 'question', 'author', 'label', 'item', 'sku', 'id']) {
      const v = item[key];
      if (typeof v === 'string' && v.trim()) return v;
      if (isLocalized(v) && v.ru.trim()) return v.ru;
    }
  }
  if (typeof item === 'string' && item.trim()) return item.length > 60 ? `${item.slice(0, 60)}…` : item;
  return `Элемент ${index + 1}`;
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// New items copy the last one; give them a fresh id so filters and keys stay unique
function freshCopy(item: Json): Json {
  const copy = deepClone(item);
  if (isPlainObject(copy) && typeof copy.id === 'string') {
    copy.id = `${copy.id.replace(/-copy-\w+$/, '')}-copy-${Date.now().toString(36)}`;
  }
  return copy;
}

const inputClass =
  'w-full bg-[#141312] border border-white/10 focus:border-[#B38E5D] rounded-sm px-3 py-2 text-sm text-white outline-none transition-colors';

function TextInput({ value, onChange, multiline }: { value: string; onChange: (v: string) => void; multiline?: boolean }) {
  if (multiline) {
    return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={Math.min(8, Math.max(2, Math.ceil(value.length / 90)))} className={`${inputClass} resize-y leading-relaxed`} />;
  }
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
}

function ImageInput({ value, onChange, password }: { value: string; onChange: (v: string) => void; password: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      onChange(await uploadImage(file, password));
    } catch (err) {
      console.error(err);
      setError('Не удалось загрузить фото. Попробуйте JPG или PNG меньшего размера.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="flex gap-3 items-start">
      <div className="w-28 h-20 shrink-0 rounded-sm border border-white/10 bg-[#141312] overflow-hidden flex items-center justify-center">
        {value ? <img src={value} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" /> : <span className="text-[10px] text-neutral-600">нет фото</span>}
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-3 py-2 text-xs rounded-sm bg-[#B38E5D]/15 border border-[#B38E5D]/40 text-[#E8E4DF] hover:bg-[#B38E5D]/30 disabled:opacity-50 cursor-pointer"
        >
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageUp className="w-3.5 h-3.5" />}
          {uploading ? 'Загрузка…' : 'Загрузить фото'}
        </button>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="или ссылка на фото" className={`${inputClass} text-xs font-mono`} />
        {error && <div className="text-xs text-red-300">{error}</div>}
      </div>
    </div>
  );
}

function LocalizedInput({ value, onChange }: { value: Record<string, string>; onChange: (v: Record<string, string>) => void }) {
  const multiline = Object.values(value).some((v) => v.length > 70 || v.includes('\n'));
  return (
    <div className="space-y-1.5">
      {LANGS.filter((l) => l.id in value).map((l) => (
        <div key={l.id} className="flex gap-2 items-start">
          <span className="w-7 shrink-0 pt-2 text-[10px] font-mono text-[#B38E5D]">{l.label}</span>
          <div className="flex-1 min-w-0">
            <TextInput value={value[l.id]} onChange={(v) => onChange({ ...value, [l.id]: v })} multiline={multiline} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ArrayEditor({ name, value, onChange, ctx, depth }: { name: string; value: Json[]; onChange: (v: Json[]) => void; ctx: EditorContext; depth: number }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const primitive = value.every((v) => typeof v !== 'object' || v === null);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const move = (i: number, delta: number) => {
    const j = i + delta;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen((prev) => {
      const s = new Set<number>();
      prev.forEach((k) => s.add(k === i ? j : k === j ? i : k));
      return s;
    });
  };

  const insertCopy = (i: number) => {
    const next = [...value];
    next.splice(i + 1, 0, freshCopy(value[i]));
    onChange(next);
    setOpen(new Set([i + 1]));
  };

  const remove = (i: number) => {
    if (!window.confirm(`Удалить «${itemTitle(value[i], i)}»?`)) return;
    onChange(value.filter((_, k) => k !== i));
    setOpen(new Set());
  };

  const add = () => {
    const template = value.length ? freshCopy(value[value.length - 1]) : '';
    onChange([...value, template]);
    setOpen(new Set([value.length]));
  };

  const controls = (i: number) => (
    <div className="flex items-center gap-0.5 shrink-0">
      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Выше" className="p-1.5 text-neutral-500 hover:text-white disabled:opacity-25 cursor-pointer"><ArrowUp className="w-3.5 h-3.5" /></button>
      <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} title="Ниже" className="p-1.5 text-neutral-500 hover:text-white disabled:opacity-25 cursor-pointer"><ArrowDown className="w-3.5 h-3.5" /></button>
      <button type="button" onClick={() => insertCopy(i)} title="Дублировать" className="p-1.5 text-neutral-500 hover:text-white cursor-pointer"><Copy className="w-3.5 h-3.5" /></button>
      <button type="button" onClick={() => remove(i)} disabled={!primitive && value.length === 1} title={!primitive && value.length === 1 ? 'Последний элемент нельзя удалить — по нему создаются новые' : 'Удалить'} className="p-1.5 text-red-400/70 hover:text-red-300 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
    </div>
  );

  return (
    <div className="space-y-2">
      {value.map((item, i) =>
        primitive ? (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <FieldEditor name={name} value={item} onChange={(v) => onChange(value.map((x, k) => (k === i ? v : x)))} ctx={ctx} depth={depth + 1} bare />
            </div>
            {controls(i)}
          </div>
        ) : (
          <div key={i} className="border border-white/10 rounded-sm bg-white/[0.02]">
            <div className="flex items-center gap-2 pl-3 pr-1 py-1.5">
              <button type="button" onClick={() => toggle(i)} className="flex-1 min-w-0 flex items-center gap-2 text-left text-sm text-neutral-200 hover:text-white cursor-pointer py-1">
                {open.has(i) ? <ChevronDown className="w-4 h-4 shrink-0 text-[#B38E5D]" /> : <ChevronRight className="w-4 h-4 shrink-0 text-neutral-500" />}
                <span className="text-[10px] font-mono text-neutral-500">{String(i + 1).padStart(2, '0')}</span>
                <span className="truncate">{itemTitle(item, i)}</span>
              </button>
              {controls(i)}
            </div>
            {open.has(i) && (
              <div className="px-3 pb-4 pt-1 border-t border-white/5">
                <FieldEditor name={name} value={item} onChange={(v) => onChange(value.map((x, k) => (k === i ? v : x)))} ctx={ctx} depth={depth + 1} bare />
              </div>
            )}
          </div>
        )
      )}
      <button type="button" onClick={add} className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-sm border border-dashed border-white/20 text-neutral-400 hover:text-white hover:border-white/50 cursor-pointer">
        <Plus className="w-3.5 h-3.5" /> Добавить
      </button>
    </div>
  );
}

interface FieldEditorProps {
  name: string;
  value: Json;
  onChange: (value: Json) => void;
  ctx: EditorContext;
  depth?: number;
  // Skip the field's own label (used for array items and section roots)
  bare?: boolean;
  label?: string;
}

// Builds a form for any JSON value: text, numbers, photos, { ru, en, ky } texts, lists and groups
export function FieldEditor({ name, value, onChange, ctx, depth = 0, bare, label }: FieldEditorProps) {
  const title = label ?? fieldLabel(name);
  const wrap = (control: React.ReactNode) =>
    bare ? (
      <>{control}</>
    ) : (
      <div className="space-y-1.5">
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-neutral-300">{title}</span>
          {title !== name && <span className="text-[10px] font-mono text-neutral-600">{name}</span>}
        </div>
        {control}
      </div>
    );

  const enumOptions = ENUM_OPTIONS[`${ctx.section}.${name}`];
  if (typeof value === 'string' && enumOptions) {
    return wrap(
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {!enumOptions.some((o) => o.value === value) && <option value={value}>{value}</option>}
        {enumOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  }

  if (typeof value === 'string') {
    if (name === 'colorHex') {
      return wrap(
        <div className="flex gap-2">
          <input type="color" value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#000000'} onChange={(e) => onChange(e.target.value)} className="w-11 h-10 bg-transparent border border-white/10 rounded-sm cursor-pointer" />
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} font-mono`} />
        </div>
      );
    }
    if (isImageField(name, value)) return wrap(<ImageInput value={value} onChange={onChange} password={ctx.password} />);
    return wrap(<TextInput value={value} onChange={onChange} multiline={value.length > 70 || value.includes('\n')} />);
  }

  if (typeof value === 'number') {
    return wrap(
      <input type="number" value={Number.isFinite(value) ? value : 0} onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))} className={`${inputClass} font-mono max-w-[240px]`} />
    );
  }

  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="accent-[#B38E5D] w-4 h-4" />
        {title}
      </label>
    );
  }

  if (Array.isArray(value)) return wrap(<ArrayEditor name={name} value={value} onChange={onChange} ctx={ctx} depth={depth} />);

  if (isLocalized(value)) return wrap(<LocalizedInput value={value} onChange={onChange} />);

  if (isPlainObject(value)) {
    const fields = Object.keys(value).filter((k) => k !== 'texturePattern');
    const body = (
      <div className={`space-y-4 ${depth > 0 && !bare ? 'pl-3 border-l border-white/10' : ''}`}>
        {fields.map((key) => (
          <FieldEditor key={key} name={key} value={value[key]} onChange={(v) => onChange({ ...value, [key]: v })} ctx={ctx} depth={depth + 1} />
        ))}
      </div>
    );
    return wrap(body);
  }

  return null;
}

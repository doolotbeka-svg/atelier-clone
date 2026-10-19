import { isLocalized } from './FieldEditor';

type Json = unknown;
type Lang = 'ru' | 'en' | 'ky';

function isPlainObject(value: Json): value is Record<string, Json> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Merges the three language trees into one whose text leaves are { ru, en, ky },
// so each phrase is edited in all languages side by side
export function combineLanguages(ru: Json, en: Json, ky: Json): Json {
  if (typeof ru === 'string') {
    return { ru, en: typeof en === 'string' ? en : ru, ky: typeof ky === 'string' ? ky : ru };
  }
  if (Array.isArray(ru)) {
    return ru.map((item, i) => combineLanguages(item, Array.isArray(en) ? en[i] : undefined, Array.isArray(ky) ? ky[i] : undefined));
  }
  if (isPlainObject(ru)) {
    const out: Record<string, Json> = {};
    for (const key of Object.keys(ru)) {
      out[key] = combineLanguages(ru[key], isPlainObject(en) ? en[key] : undefined, isPlainObject(ky) ? ky[key] : undefined);
    }
    return out;
  }
  return ru;
}

// Takes one language back out of a combined tree
export function pickLanguage(tree: Json, lang: Lang): Json {
  if (isLocalized(tree)) return tree[lang] ?? tree.ru;
  if (Array.isArray(tree)) return tree.map((item) => pickLanguage(item, lang));
  if (isPlainObject(tree)) {
    const out: Record<string, Json> = {};
    for (const key of Object.keys(tree)) out[key] = pickLanguage(tree[key], lang);
    return out;
  }
  return tree;
}

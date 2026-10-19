import { TRANSLATIONS, TranslationData } from '../i18n/translations';
import { CASE_STUDIES, MATERIALS_LIBRARY } from '../data/atelierData';
import { READY_FURNITURE_CATALOG } from '../data/readyFurnitureData';
import { HERO_SLIDES, HeroSlide } from '../data/heroSlides';
import type { CaseStudy, MaterialItem, ReadyFurnitureItem } from '../types';
import { FORM_TEXTS, FormTexts } from '../data/formTexts';
import { CONFIGURATOR_TEXTS, ConfiguratorTexts } from '../components/configurator/configuratorTexts';

export type Language = 'ru' | 'en' | 'ky';

export interface Contacts {
  phone: string;
  whatsapp: string;
  email: string;
  telegramUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  whatsappMessage: Record<Language, string>;
}

// Everything the admin panel can edit; the code holds the defaults
export interface SiteContent {
  contacts: Contacts;
  heroSlides: HeroSlide[];
  cases: CaseStudy[];
  readyFurniture: ReadyFurnitureItem[];
  materials: MaterialItem[];
  form: FormTexts;
  configurator: ConfiguratorTexts;
  translations: Record<Language, TranslationData>;
  updatedAt?: string;
}

export const DEFAULT_CONTENT: SiteContent = {
  contacts: {
    phone: '+996 (312) 98-68-00',
    whatsapp: '+996 (555) 92-68-00',
    email: 'atelier@architectura.kg',
    telegramUrl: 'https://t.me',
    instagramUrl: 'https://instagram.com',
    youtubeUrl: 'https://youtube.com',
    whatsappMessage: {
      ru: 'Здравствуйте! Хочу проконсультироваться с ведущим технологом Atelier Architectura (Бишкек) по поводу мебели.',
      en: 'Hello! I would like to consult with the lead technologist at Atelier Architectura (Bishkek) regarding bespoke or ready furniture.',
      ky: 'Саламатсызбы! Жеке же даяр эмерек боюнча Atelier Architectura (Бишкек) башкы технологу менен кеңешким келет.'
    }
  },
  heroSlides: HERO_SLIDES,
  cases: CASE_STUDIES,
  readyFurniture: READY_FURNITURE_CATALOG,
  materials: MATERIALS_LIBRARY,
  form: FORM_TEXTS,
  configurator: CONFIGURATOR_TEXTS,
  translations: TRANSLATIONS
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Lays saved values over the defaults, so fields added to the code later still have a value
// and a field saved with the wrong type falls back to the default
function mergeWithDefaults(defaults: unknown, saved: unknown): unknown {
  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return defaults;
    const template = defaults[0];
    return saved.map((item, i) => (template === undefined ? item : mergeWithDefaults(defaults[i] ?? template, item)));
  }
  if (isPlainObject(defaults)) {
    if (!isPlainObject(saved)) return defaults;
    const result: Record<string, unknown> = { ...saved };
    for (const key of Object.keys(defaults)) {
      result[key] = key in saved ? mergeWithDefaults(defaults[key], saved[key]) : defaults[key];
    }
    return result;
  }
  if (defaults === undefined) return saved;
  return typeof saved === typeof defaults ? saved : defaults;
}

export function normalizeContent(saved: unknown): SiteContent {
  return mergeWithDefaults(DEFAULT_CONTENT, saved) as SiteContent;
}

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function whatsappNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

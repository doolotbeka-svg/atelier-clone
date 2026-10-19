import { Language } from '../../context/LanguageContext';

export type Localized = Record<Language, string>;

export type PresetId = 'kitchen' | 'wardrobe' | 'living';

export type ModuleType =
  | 'doors'
  | 'drawers'
  | 'sink'
  | 'oven'
  | 'tall'
  | 'hanging'
  | 'shelves'
  | 'open';

export type FinishKind = 'wood' | 'lacquer' | 'stone';

export interface Finish {
  id: string;
  kind: FinishKind;
  label: Localized;
  color: string;
  // Grain colour for wood, vein colour for stone
  accent?: string;
  roughness: number;
  priceFactor: number;
}

export type HandleStyle = 'none' | 'brass' | 'black';

export interface FurnitureModule {
  id: string;
  type: ModuleType;
  width: number; // cm
}

export interface ConfiguratorState {
  preset: PresetId;
  modules: FurnitureModule[];
  height: number; // cm
  depth: number; // cm
  frontFinish: string;
  bodyFinish: string;
  topFinish: string;
  customFrontColor: string;
  customBodyColor: string;
  handles: HandleStyle;
  upperCabinets: boolean;
  island: boolean;
  islandWidth: number; // cm
  islandDepth: number; // cm
  wallPanel: boolean;
  lighting: boolean;
  frontsOpen: boolean;
}

export interface PresetConfig {
  id: PresetId;
  label: Localized;
  moduleTypes: ModuleType[];
  height: { min: number; max: number; step: number };
  depth: { min: number; max: number; step: number };
  width: { min: number; max: number; step: number };
  defaults: Omit<ConfiguratorState, 'preset' | 'customFrontColor' | 'customBodyColor' | 'frontsOpen'>;
}

export const MAX_MODULES = 12;

// Kitchen tall units (fridge / oven column) have a fixed height
export const KITCHEN_TALL_HEIGHT = 220;
export const UPPER_CABINET_BOTTOM = 145;
export const UPPER_CABINET_HEIGHT = 70;
export const UPPER_CABINET_DEPTH = 35;

export const MODULE_LABELS: Record<ModuleType, Localized> = {
  doors: { ru: 'Тумба с дверцами', en: 'Door cabinet', ky: 'Эшиктүү тумба' },
  drawers: { ru: 'Блок ящиков', en: 'Drawer unit', ky: 'Тартмалар блогу' },
  sink: { ru: 'Мойка', en: 'Sink unit', ky: 'Жуучу жай' },
  oven: { ru: 'Духовой шкаф', en: 'Oven unit', ky: 'Духовка' },
  tall: { ru: 'Пенал / холодильник', en: 'Tall unit / fridge', ky: 'Пенал / муздаткыч' },
  hanging: { ru: 'Секция для одежды', en: 'Hanging section', ky: 'Кийим илүүчү секция' },
  shelves: { ru: 'Полки за фасадом', en: 'Shelves behind doors', ky: 'Эшик артындагы текчелер' },
  open: { ru: 'Открытые полки', en: 'Open shelving', ky: 'Ачык текчелер' }
};

export const PRESETS: Record<PresetId, PresetConfig> = {
  kitchen: {
    id: 'kitchen',
    label: { ru: 'Кухня', en: 'Kitchen', ky: 'Ашкана' },
    moduleTypes: ['doors', 'drawers', 'sink', 'oven', 'tall', 'open'],
    height: { min: 85, max: 95, step: 1 },
    depth: { min: 55, max: 70, step: 1 },
    width: { min: 30, max: 120, step: 5 },
    defaults: {
      modules: [
        { id: 'k1', type: 'tall', width: 60 },
        { id: 'k2', type: 'drawers', width: 60 },
        { id: 'k3', type: 'oven', width: 60 },
        { id: 'k4', type: 'sink', width: 80 },
        { id: 'k5', type: 'doors', width: 60 }
      ],
      height: 90,
      depth: 62,
      frontFinish: 'walnut',
      bodyFinish: 'graphite',
      topFinish: 'calacatta',
      handles: 'none',
      upperCabinets: true,
      island: true,
      islandWidth: 220,
      islandDepth: 100,
      wallPanel: false,
      lighting: true
    }
  },
  wardrobe: {
    id: 'wardrobe',
    label: { ru: 'Гардеробная', en: 'Wardrobe', ky: 'Гардероб' },
    moduleTypes: ['hanging', 'shelves', 'drawers', 'open'],
    height: { min: 200, max: 280, step: 5 },
    depth: { min: 45, max: 65, step: 1 },
    width: { min: 40, max: 120, step: 5 },
    defaults: {
      modules: [
        { id: 'w1', type: 'hanging', width: 90 },
        { id: 'w2', type: 'shelves', width: 60 },
        { id: 'w3', type: 'drawers', width: 60 },
        { id: 'w4', type: 'hanging', width: 90 }
      ],
      height: 260,
      depth: 60,
      frontFinish: 'eucalyptus',
      bodyFinish: 'oak',
      topFinish: 'walnut',
      handles: 'brass',
      upperCabinets: false,
      island: false,
      islandWidth: 120,
      islandDepth: 60,
      wallPanel: false,
      lighting: true
    }
  },
  living: {
    id: 'living',
    label: { ru: 'ТВ-зона', en: 'TV wall', ky: 'ТВ-зона' },
    moduleTypes: ['doors', 'drawers', 'open'],
    height: { min: 40, max: 70, step: 1 },
    depth: { min: 35, max: 50, step: 1 },
    width: { min: 40, max: 120, step: 5 },
    defaults: {
      modules: [
        { id: 'l1', type: 'doors', width: 80 },
        { id: 'l2', type: 'open', width: 60 },
        { id: 'l3', type: 'drawers', width: 80 },
        { id: 'l4', type: 'doors', width: 80 }
      ],
      height: 50,
      depth: 42,
      frontFinish: 'sage',
      bodyFinish: 'walnut',
      topFinish: 'nero',
      handles: 'none',
      upperCabinets: false,
      island: false,
      islandWidth: 120,
      islandDepth: 60,
      wallPanel: true,
      lighting: true
    }
  }
};

export const CUSTOM_FINISH_ID = 'custom';

export const WOOD_AND_LACQUER_FINISHES: Finish[] = [
  { id: 'walnut', kind: 'wood', label: { ru: 'Американский орех', en: 'American walnut', ky: 'Америка жаңгагы' }, color: '#6b4630', accent: '#3d2618', roughness: 0.55, priceFactor: 1.0 },
  { id: 'eucalyptus', kind: 'wood', label: { ru: 'Копчёный эвкалипт', en: 'Fumed eucalyptus', ky: 'Ышталган эвкалипт' }, color: '#5a4334', accent: '#2e2119', roughness: 0.5, priceFactor: 1.25 },
  { id: 'oak', kind: 'wood', label: { ru: 'Морёный дуб', en: 'Stained oak', ky: 'Боёлгон эмен' }, color: '#8a6a48', accent: '#5b4229', roughness: 0.6, priceFactor: 0.95 },
  { id: 'oak_light', kind: 'wood', label: { ru: 'Светлый дуб', en: 'Natural oak', ky: 'Ачык эмен' }, color: '#c9a77d', accent: '#9b7a52', roughness: 0.6, priceFactor: 0.9 },
  { id: 'ivory', kind: 'lacquer', label: { ru: 'Лак слоновая кость', en: 'Ivory lacquer', ky: 'Пил сөөгү лак' }, color: '#ebe5da', roughness: 0.35, priceFactor: 0.85 },
  { id: 'graphite', kind: 'lacquer', label: { ru: 'Лак графит', en: 'Graphite lacquer', ky: 'Графит лак' }, color: '#38373a', roughness: 0.4, priceFactor: 0.85 },
  { id: 'sage', kind: 'lacquer', label: { ru: 'Лак шалфей', en: 'Sage lacquer', ky: 'Шалфей лак' }, color: '#86947f', roughness: 0.4, priceFactor: 0.9 },
  { id: 'terracotta', kind: 'lacquer', label: { ru: 'Лак терракота', en: 'Terracotta lacquer', ky: 'Терракота лак' }, color: '#a8634a', roughness: 0.4, priceFactor: 0.9 }
];

export const STONE_FINISHES: Finish[] = [
  { id: 'calacatta', kind: 'stone', label: { ru: 'Мрамор Calacatta Viola', en: 'Calacatta Viola marble', ky: 'Calacatta Viola мрамору' }, color: '#eee8e4', accent: '#7d4a68', roughness: 0.2, priceFactor: 1.45 },
  { id: 'patagonia', kind: 'stone', label: { ru: 'Кварцит Patagonia', en: 'Patagonia quartzite', ky: 'Patagonia кварцити' }, color: '#e4d9c6', accent: '#8b735a', roughness: 0.25, priceFactor: 1.6 },
  { id: 'nero', kind: 'stone', label: { ru: 'Мрамор Nero Marquina', en: 'Nero Marquina marble', ky: 'Nero Marquina мрамору' }, color: '#1e1e20', accent: '#cfcfcf', roughness: 0.2, priceFactor: 1.3 },
  { id: 'concrete', kind: 'stone', label: { ru: 'Микроцемент', en: 'Microcement', ky: 'Микроцемент' }, color: '#8e8a85', roughness: 0.8, priceFactor: 1.0 }
];

export const TOP_FINISHES: Finish[] = [...STONE_FINISHES, WOOD_AND_LACQUER_FINISHES[0], WOOD_AND_LACQUER_FINISHES[2]];

export const HANDLE_LABELS: Record<HandleStyle, Localized> = {
  none: { ru: 'Без ручек (Gola / push)', en: 'Handleless (Gola / push)', ky: 'Туткасыз (Gola / push)' },
  brass: { ru: 'Брашированная латунь', en: 'Brushed brass', ky: 'Жылтыратылган латунь' },
  black: { ru: 'Чёрный металл', en: 'Black metal', ky: 'Кара металл' }
};

const ALL_FINISHES = [...WOOD_AND_LACQUER_FINISHES, ...STONE_FINISHES];

export function findFinish(id: string): Finish | undefined {
  return ALL_FINISHES.find((f) => f.id === id);
}

// Resolves a finish id (or the custom colour) to a renderable finish
export function resolveFinish(id: string, customColor: string): Finish {
  if (id === CUSTOM_FINISH_ID) {
    return {
      id: CUSTOM_FINISH_ID,
      kind: 'lacquer',
      label: { ru: 'Свой цвет (лак)', en: 'Custom colour (lacquer)', ky: 'Өз түсүңүз (лак)' },
      color: customColor,
      roughness: 0.4,
      priceFactor: 0.95
    };
  }
  return findFinish(id) || WOOD_AND_LACQUER_FINISHES[0];
}

// Height of a module's carcass in cm, by preset
export function moduleHeight(state: ConfiguratorState, type: ModuleType): number {
  if (state.preset === 'kitchen' && type === 'tall') return KITCHEN_TALL_HEIGHT;
  return state.height;
}

export function totalWidth(state: ConfiguratorState): number {
  return state.modules.reduce((sum, m) => sum + m.width, 0);
}

// Price per running metre of a module in KGS, at the preset's reference height
const MODULE_PRICE_PER_M: Record<ModuleType, number> = {
  doors: 190000,
  drawers: 260000,
  sink: 240000,
  oven: 250000,
  tall: 420000,
  hanging: 230000,
  shelves: 210000,
  open: 130000
};

const REFERENCE_HEIGHT: Record<PresetId, number> = { kitchen: 90, wardrobe: 260, living: 50 };

export interface Estimate {
  totalKgs: number;
  totalRub: number;
}

// Rough budget estimate, same KGS → RUB rate as the bespoke calculator
export function estimatePrice(state: ConfiguratorState): Estimate {
  const front = resolveFinish(state.frontFinish, state.customFrontColor);
  const body = resolveFinish(state.bodyFinish, state.customBodyColor);
  const top = resolveFinish(state.topFinish, state.customFrontColor);
  const heightFactor = state.height / REFERENCE_HEIGHT[state.preset];
  const depthFactor = 0.85 + (state.depth / 100) * 0.25;

  let total = 0;
  for (const m of state.modules) {
    const metres = m.width / 100;
    const isTallKitchen = state.preset === 'kitchen' && m.type === 'tall';
    const scale = isTallKitchen ? 1 : heightFactor;
    const frontShare = m.type === 'open' ? 0.2 : 0.55;
    const materialFactor = frontShare * front.priceFactor + (1 - frontShare) * body.priceFactor;
    total += MODULE_PRICE_PER_M[m.type] * metres * scale * depthFactor * materialFactor;
  }

  const width = totalWidth(state) / 100;
  if (state.preset === 'kitchen' || state.preset === 'living') {
    const topMetres = state.preset === 'kitchen'
      ? state.modules.filter((m) => m.type !== 'tall').reduce((s, m) => s + m.width, 0) / 100
      : width;
    total += 140000 * topMetres * top.priceFactor;
  }
  if (state.preset === 'kitchen' && state.upperCabinets) {
    const upperMetres = state.modules.filter((m) => m.type !== 'tall').reduce((s, m) => s + m.width, 0) / 100;
    total += 160000 * upperMetres * front.priceFactor;
  }
  if (state.preset === 'kitchen' && state.island) {
    const islandArea = (state.islandWidth / 100) * (state.islandDepth / 100);
    total += 520000 * islandArea * (0.5 * front.priceFactor + 0.5 * top.priceFactor);
  }
  if (state.preset === 'living' && state.wallPanel) {
    total += 95000 * (width + 0.4) * front.priceFactor;
  }
  if (state.lighting) total += 18000 * Math.max(width, 1);
  if (state.handles !== 'none') {
    const fronts = state.modules.filter((m) => m.type !== 'open').length;
    total += fronts * (state.handles === 'brass' ? 9500 : 6500);
  }

  const totalKgs = Math.round(total / 1000) * 1000;
  return { totalKgs, totalRub: Math.round(totalKgs / 0.975) };
}

export function createInitialState(preset: PresetId, previous?: ConfiguratorState): ConfiguratorState {
  const d = PRESETS[preset].defaults;
  return {
    ...d,
    modules: d.modules.map((m) => ({ ...m })),
    preset,
    customFrontColor: previous?.customFrontColor ?? '#2f4a5a',
    customBodyColor: previous?.customBodyColor ?? '#d8cfc2',
    frontsOpen: false
  };
}

let moduleCounter = 0;
export function newModuleId(): string {
  moduleCounter += 1;
  return `m${Date.now().toString(36)}${moduleCounter}`;
}

// Plain-text summary of the configuration for the technologist (form / Telegram)
export function describeConfiguration(state: ConfiguratorState, priceText: string): string {
  const ru = (l: Localized) => l.ru;
  const front = resolveFinish(state.frontFinish, state.customFrontColor);
  const body = resolveFinish(state.bodyFinish, state.customBodyColor);
  const top = resolveFinish(state.topFinish, state.customFrontColor);
  const finishText = (f: Finish) => (f.id === CUSTOM_FINISH_ID ? `лак ${f.color}` : ru(f.label));

  const parts = [
    `3D-конструктор: ${ru(PRESETS[state.preset].label)}, ${totalWidth(state)} × ${state.height} × ${state.depth} см`,
    `Модули слева направо: ${state.modules.map((m) => `${ru(MODULE_LABELS[m.type])} ${m.width} см`).join('; ')}`,
    `Фасады: ${finishText(front)}; корпус: ${finishText(body)}`
  ];
  if (state.preset !== 'wardrobe') parts.push(`Столешница: ${finishText(top)}`);
  parts.push(`Ручки: ${ru(HANDLE_LABELS[state.handles])}`);

  const options: string[] = [];
  if (state.preset === 'kitchen' && state.upperCabinets) options.push('верхние шкафы');
  if (state.preset === 'kitchen' && state.island) options.push(`остров ${state.islandWidth} × ${state.islandDepth} см`);
  if (state.preset === 'living' && state.wallPanel) options.push('стеновая панель');
  if (state.lighting) options.push('LED-подсветка');
  if (options.length) parts.push(`Опции: ${options.join(', ')}`);

  parts.push(`Ориентир: ${priceText}`);
  return parts.join('\n');
}

import React, { Component, Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Copy,
  DoorOpen,
  Eye,
  Lightbulb,
  Plus,
  RotateCcw,
  Ruler,
  Send,
  Trash2,
  View
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import {
  CUSTOM_FINISH_ID,
  ConfiguratorState,
  Finish,
  HANDLE_LABELS,
  HandleStyle,
  Localized,
  MAX_MODULES,
  MODULE_LABELS,
  ModuleType,
  PRESETS,
  PresetId,
  TOP_FINISHES,
  WOOD_AND_LACQUER_FINISHES,
  createInitialState,
  describeConfiguration,
  estimatePrice,
  newModuleId,
  totalWidth
} from './configurator/configuratorData';
import type { CameraView } from './configurator/ConfiguratorScene';

// three.js is loaded only when the visitor scrolls near the configurator
const ConfiguratorScene = lazy(() => import('./configurator/ConfiguratorScene'));

const UI = {
  kicker: { ru: '3D-конструктор', en: '3D configurator', ky: '3D-конструктор' },
  title: { ru: 'Соберите свой проект в 3D', en: 'Design your piece in 3D', ky: 'Долбооруңузду 3D форматта түзүңүз' },
  subtitle: {
    ru: 'Вращайте модель, меняйте материалы и размеры, добавляйте и убирайте модули — стоимость пересчитывается сразу. Готовый проект отправьте технологу одним нажатием.',
    en: 'Rotate the model, change materials and dimensions, add or remove modules — the estimate updates instantly. Send the finished design to our technologist in one click.',
    ky: 'Моделди айлантыңыз, материалдарды жана өлчөмдөрдү өзгөртүңүз, модулдарды кошуп же алып салыңыз — баасы дароо кайра эсептелет. Даяр долбоорду технологго бир басуу менен жөнөтүңүз.'
  },
  hint: { ru: 'Мышь / палец — вращать · колесо / щипок — масштаб · клик по модулю — выбрать', en: 'Drag to rotate · scroll / pinch to zoom · click a module to select', ky: 'Сүйрөп айлантыңыз · дөңгөлөк менен чоңойтуңуз · модулду басып тандаңыз' },
  views: {
    perspective: { ru: '3/4', en: '3/4', ky: '3/4' },
    front: { ru: 'Фронт', en: 'Front', ky: 'Алдынан' },
    top: { ru: 'Сверху', en: 'Top', ky: 'Үстүнөн' }
  },
  openFronts: { ru: 'Открыть фасады', en: 'Open fronts', ky: 'Фасаддарды ачуу' },
  closeFronts: { ru: 'Закрыть фасады', en: 'Close fronts', ky: 'Фасаддарды жабуу' },
  resetView: { ru: 'Вид', en: 'View', ky: 'Көрүнүш' },
  tabs: {
    modules: { ru: 'Модули', en: 'Modules', ky: 'Модулдар' },
    materials: { ru: 'Материалы', en: 'Materials', ky: 'Материалдар' },
    size: { ru: 'Размеры', en: 'Size', ky: 'Өлчөмдөр' }
  },
  selected: { ru: 'Выбранный модуль', en: 'Selected module', ky: 'Тандалган модуль' },
  selectHint: { ru: 'Нажмите на модуль на 3D-сцене или в ленте под ней, чтобы изменить его.', en: 'Click a module in the 3D scene or in the strip below it to edit it.', ky: 'Өзгөртүү үчүн 3D сахнадагы же астындагы тилкедеги модулду басыңыз.' },
  type: { ru: 'Тип', en: 'Type', ky: 'Түрү' },
  width: { ru: 'Ширина', en: 'Width', ky: 'Туурасы' },
  moveLeft: { ru: 'Левее', en: 'Move left', ky: 'Солго' },
  moveRight: { ru: 'Правее', en: 'Move right', ky: 'Оңго' },
  duplicate: { ru: 'Копия', en: 'Duplicate', ky: 'Көчүрмө' },
  remove: { ru: 'Удалить', en: 'Remove', ky: 'Өчүрүү' },
  add: { ru: 'Добавить модуль', en: 'Add a module', ky: 'Модуль кошуу' },
  maxModules: { ru: 'Максимум модулей', en: 'Module limit reached', ky: 'Модулдардын эң көп саны' },
  fronts: { ru: 'Фасады', en: 'Fronts', ky: 'Фасаддар' },
  body: { ru: 'Корпус и полки', en: 'Carcass & shelves', ky: 'Корпус жана текчелер' },
  top: { ru: 'Столешница', en: 'Worktop', ky: 'Столешница' },
  handles: { ru: 'Ручки', en: 'Handles', ky: 'Туткалар' },
  customColor: { ru: 'Свой цвет', en: 'Custom colour', ky: 'Өз түсүңүз' },
  height: { ru: 'Высота', en: 'Height', ky: 'Бийиктиги' },
  depth: { ru: 'Глубина', en: 'Depth', ky: 'Тереңдиги' },
  totalWidth: { ru: 'Общая ширина', en: 'Total width', ky: 'Жалпы туурасы' },
  upperCabinets: { ru: 'Верхние шкафы', en: 'Wall cabinets', ky: 'Үстүңкү шкафтар' },
  island: { ru: 'Кухонный остров', en: 'Kitchen island', ky: 'Ашкана аралы' },
  islandWidth: { ru: 'Длина острова', en: 'Island length', ky: 'Аралдын узундугу' },
  islandDepth: { ru: 'Глубина острова', en: 'Island depth', ky: 'Аралдын тереңдиги' },
  wallPanel: { ru: 'Стеновая панель', en: 'Wall panel', ky: 'Дубал панели' },
  lighting: { ru: 'LED-подсветка', en: 'LED lighting', ky: 'LED жарык' },
  estimate: { ru: 'Ориентировочная стоимость', en: 'Estimated cost', ky: 'Болжолдуу баасы' },
  estimateNote: { ru: 'Точная смета — после замера и деталировки узлов', en: 'Final quote after site survey and detailing', ky: 'Так смета — өлчөөдөн жана деталдаштыруудан кийин' },
  send: { ru: 'Отправить проект технологу', en: 'Send design to technologist', ky: 'Долбоорду технологго жөнөтүү' },
  reset: { ru: 'Сбросить', en: 'Reset', ky: 'Баштапкы' },
  loading: { ru: 'Загружаем 3D-сцену…', en: 'Loading 3D scene…', ky: '3D сахна жүктөлүүдө…' },
  webglError: { ru: 'Ваш браузер не поддерживает 3D (WebGL). Откройте страницу в Chrome, Safari или Edge.', en: 'Your browser does not support 3D (WebGL). Please open the page in Chrome, Safari or Edge.', ky: 'Браузериңиз 3D (WebGL) колдобойт. Баракты Chrome, Safari же Edge аркылуу ачыңыз.' },
  cm: { ru: 'см', en: 'cm', ky: 'см' }
} satisfies Record<string, Localized | Record<string, Localized>>;

type Tab = 'modules' | 'materials' | 'size';

class SceneErrorBoundary extends Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function swatchBackground(finish: Finish): string {
  if (finish.kind === 'wood' && finish.accent) {
    return `repeating-linear-gradient(95deg, ${finish.color} 0 5px, ${finish.accent} 6px 7px, ${finish.color} 8px 12px)`;
  }
  if (finish.kind === 'stone' && finish.accent) {
    return `linear-gradient(125deg, ${finish.color} 0 40%, ${finish.accent} 46%, ${finish.color} 52% 100%)`;
  }
  return finish.color;
}

interface SwatchPickerProps {
  finishes: Finish[];
  value: string;
  onChange: (id: string) => void;
  lang: keyof Localized;
  custom?: { color: string; onColor: (c: string) => void; label: string };
}

function SwatchPicker({ finishes, value, onChange, lang, custom }: SwatchPickerProps) {
  const active = finishes.find((f) => f.id === value);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {finishes.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            title={f.label[lang]}
            aria-label={f.label[lang]}
            aria-pressed={value === f.id}
            className={`w-9 h-9 rounded-sm border transition-all cursor-pointer ${value === f.id ? 'border-[#B38E5D] ring-2 ring-[#B38E5D]/40 scale-105' : 'border-white/15 hover:border-white/40'}`}
            style={{ background: swatchBackground(f) }}
          />
        ))}
        {custom && (
          <label
            title={custom.label}
            className={`relative w-9 h-9 rounded-sm border cursor-pointer overflow-hidden transition-all ${value === CUSTOM_FINISH_ID ? 'border-[#B38E5D] ring-2 ring-[#B38E5D]/40 scale-105' : 'border-white/15 hover:border-white/40'}`}
            style={{ background: value === CUSTOM_FINISH_ID ? custom.color : 'conic-gradient(#e05a47, #e0c147, #5ae047, #47c1e0, #6147e0, #e047b8, #e05a47)' }}
          >
            <input
              type="color"
              value={custom.color}
              onChange={(e) => {
                custom.onColor(e.target.value);
                onChange(CUSTOM_FINISH_ID);
              }}
              onClick={() => onChange(CUSTOM_FINISH_ID)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label={custom.label}
            />
          </label>
        )}
      </div>
      <div className="mt-2 text-[11px] font-mono text-neutral-400">
        {value === CUSTOM_FINISH_ID && custom ? `${custom.label} · ${custom.color.toUpperCase()}` : active?.label[lang]}
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-neutral-400">{label}</span>
        <span className="font-mono text-white tabular-nums">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#B38E5D] cursor-pointer"
      />
    </label>
  );
}

function Toggle({ label, checked, onChange, icon }: { label: string; checked: boolean; onChange: (v: boolean) => void; icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between gap-3 py-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-[#B38E5D]' : 'bg-white/15'}`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-[18px]' : 'left-0.5'}`} />
      </span>
    </button>
  );
}

interface Configurator3DProps {
  onSendToTechnologist: (summary: string) => void;
}

export const Configurator3D: React.FC<Configurator3DProps> = ({ onSendToTechnologist }) => {
  const { lang } = useLanguage();
  const { formatPrice } = useCurrency();
  const L = (l: Localized) => l[lang] || l.ru;

  const [state, setState] = useState<ConfiguratorState>(() => createInitialState('kitchen'));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('modules');
  const [view, setView] = useState<CameraView>('perspective');
  const [fitKey, setFitKey] = useState(0);
  const [sceneRequested, setSceneRequested] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [tab, state.preset]);

  // Start loading three.js shortly before the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || sceneRequested) return;
    if (!('IntersectionObserver' in window)) {
      setSceneRequested(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSceneRequested(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [sceneRequested]);

  const preset = PRESETS[state.preset];
  const selectedIndex = state.modules.findIndex((m) => m.id === selectedId);
  const selected = selectedIndex >= 0 ? state.modules[selectedIndex] : null;
  const estimate = useMemo(() => estimatePrice(state), [state]);
  const priceText = formatPrice(estimate.totalRub, estimate.totalKgs);

  const update = (patch: Partial<ConfiguratorState>) => setState((s) => ({ ...s, ...patch }));

  const switchPreset = (id: PresetId) => {
    setState((s) => createInitialState(id, s));
    setSelectedId(null);
    setView('perspective');
  };

  const updateSelected = (patch: { type?: ModuleType; width?: number }) => {
    if (!selected) return;
    setState((s) => ({ ...s, modules: s.modules.map((m) => (m.id === selected.id ? { ...m, ...patch } : m)) }));
  };

  const moveSelected = (delta: -1 | 1) => {
    const target = selectedIndex + delta;
    if (selectedIndex < 0 || target < 0 || target >= state.modules.length) return;
    setState((s) => {
      const modules = [...s.modules];
      [modules[selectedIndex], modules[target]] = [modules[target], modules[selectedIndex]];
      return { ...s, modules };
    });
  };

  const addModule = (type: ModuleType, afterIndex = state.modules.length - 1, width?: number) => {
    if (state.modules.length >= MAX_MODULES) return;
    const id = newModuleId();
    const defaultWidth = type === 'hanging' ? 90 : type === 'sink' ? 80 : 60;
    const clamped = Math.min(preset.width.max, Math.max(preset.width.min, width ?? defaultWidth));
    setState((s) => {
      const modules = [...s.modules];
      modules.splice(afterIndex + 1, 0, { id, type, width: clamped });
      return { ...s, modules };
    });
    setSelectedId(id);
    setTab('modules');
  };

  const removeSelected = () => {
    if (!selected || state.modules.length <= 1) return;
    const next = state.modules[selectedIndex + 1] || state.modules[selectedIndex - 1];
    setState((s) => ({ ...s, modules: s.modules.filter((m) => m.id !== selected.id) }));
    setSelectedId(next ? next.id : null);
  };

  const selectModule = (id: string | null) => {
    setSelectedId(id);
    if (id) setTab('modules');
  };

  const widthCm = totalWidth(state);
  const canAdd = state.modules.length < MAX_MODULES;

  const sceneFallback = (
    <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-neutral-500">
      <span className="animate-pulse">{L(UI.loading)}</span>
    </div>
  );

  return (
    <section id="configurator" ref={sectionRef} className="py-28 bg-[#141312] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B38E5D] font-mono mb-4 flex items-center gap-2">
            <Box className="w-4 h-4" />
            {L(UI.kicker)}
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-light leading-tight mb-5">{L(UI.title)}</h2>
          <p className="text-neutral-400 font-light leading-relaxed">{L(UI.subtitle)}</p>
        </div>

        {/* Furniture type */}
        <div className="flex flex-wrap gap-2 mb-6" role="tablist">
          {(Object.keys(PRESETS) as PresetId[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={state.preset === id}
              onClick={() => switchPreset(id)}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-colors cursor-pointer ${state.preset === id ? 'bg-[#B38E5D] text-[#141312] border-[#B38E5D] font-semibold' : 'border-white/10 text-neutral-300 hover:border-white/30 hover:text-white'}`}
            >
              {L(PRESETS[id].label)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3D viewport */}
          <div className="lg:col-span-8 min-w-0">
            <div className="relative h-[380px] sm:h-[460px] lg:h-[560px] bg-[#1D1B19] border border-white/10 rounded-sm overflow-hidden">
              {sceneRequested ? (
                <SceneErrorBoundary fallback={<div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-neutral-400">{L(UI.webglError)}</div>}>
                  <Suspense fallback={sceneFallback}>
                    <ConfiguratorScene state={state} selectedId={selectedId} onSelect={selectModule} view={view} fitKey={fitKey} />
                  </Suspense>
                </SceneErrorBoundary>
              ) : (
                sceneFallback
              )}

              {/* Viewport toolbar */}
              <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="flex gap-1 bg-[#141312]/85 backdrop-blur-md border border-white/10 rounded-sm p-1 pointer-events-auto">
                  {(['perspective', 'front', 'top'] as CameraView[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setView(v);
                        setFitKey((k) => k + 1);
                      }}
                      className={`px-3 py-1.5 text-[11px] font-mono rounded-sm transition-colors cursor-pointer ${view === v ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      {L(UI.views[v])}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFitKey((k) => k + 1)}
                    title={L(UI.resetView)}
                    aria-label={L(UI.resetView)}
                    className="px-2 py-1.5 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <View className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => update({ frontsOpen: !state.frontsOpen })}
                  className={`pointer-events-auto flex items-center gap-2 px-3 py-2 text-[11px] font-mono rounded-sm border backdrop-blur-md transition-colors cursor-pointer ${state.frontsOpen ? 'bg-[#B38E5D] text-[#141312] border-[#B38E5D]' : 'bg-[#141312]/85 border-white/10 text-neutral-300 hover:text-white'}`}
                >
                  <DoorOpen className="w-3.5 h-3.5" />
                  {state.frontsOpen ? L(UI.closeFronts) : L(UI.openFronts)}
                </button>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-[10px] sm:text-[11px] font-mono text-neutral-500 pointer-events-none">
                {L(UI.hint)}
              </div>
            </div>

            {/* Module strip, proportional to widths */}
            <div className="mt-3 flex items-stretch gap-1 overflow-x-auto pb-1">
              {state.modules.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => selectModule(m.id)}
                  style={{ flexGrow: m.width, flexBasis: 0 }}
                  className={`min-w-[64px] px-2 py-2 text-left rounded-sm border transition-colors cursor-pointer ${m.id === selectedId ? 'border-[#B38E5D] bg-[#B38E5D]/10' : 'border-white/10 hover:border-white/30 bg-[#1D1B19]'}`}
                >
                  <div className="text-[10px] text-neutral-300 leading-tight line-clamp-2">{L(MODULE_LABELS[m.type])}</div>
                  <div className="text-[10px] font-mono text-[#B38E5D] mt-1">{m.width}</div>
                </button>
              ))}
              {canAdd && (
                <button
                  type="button"
                  onClick={() => addModule(preset.moduleTypes[0])}
                  title={L(UI.add)}
                  aria-label={L(UI.add)}
                  className="shrink-0 w-11 flex items-center justify-center rounded-sm border border-dashed border-white/20 text-neutral-400 hover:text-white hover:border-white/50 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <Ruler className="w-3.5 h-3.5 text-[#B38E5D]" />
              {L(UI.totalWidth)}: <span className="text-white">{widthCm} {L(UI.cm)}</span> · {L(UI.height)}: <span className="text-white">{state.height}</span> · {L(UI.depth)}: <span className="text-white">{state.depth}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 min-w-0 flex flex-col bg-[#1D1B19] border border-white/10 rounded-sm">
            <div className="flex border-b border-white/10" role="tablist">
              {(['modules', 'materials', 'size'] as Tab[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`flex-1 py-3.5 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${tab === id ? 'text-white border-b-2 border-[#B38E5D] -mb-px' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  {L(UI.tabs[id])}
                </button>
              ))}
            </div>

            <div ref={panelRef} className="p-5 space-y-6 flex-1 lg:max-h-[440px] lg:overflow-y-auto">
              {tab === 'modules' && (
                <>
                  {selected ? (
                    <div className="space-y-4">
                      <div className="text-[11px] uppercase font-mono tracking-wider text-[#B38E5D]">
                        {L(UI.selected)} · {selectedIndex + 1}/{state.modules.length}
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 mb-2">{L(UI.type)}</div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {preset.moduleTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => updateSelected({ type })}
                              className={`px-2.5 py-2 text-[11px] text-left rounded-sm border transition-colors cursor-pointer ${selected.type === type ? 'border-[#B38E5D] text-white bg-[#B38E5D]/10' : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'}`}
                            >
                              {L(MODULE_LABELS[type])}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Slider
                        label={L(UI.width)}
                        value={selected.width}
                        min={preset.width.min}
                        max={preset.width.max}
                        step={preset.width.step}
                        unit={L(UI.cm)}
                        onChange={(width) => updateSelected({ width })}
                      />
                      <div className="grid grid-cols-4 gap-1.5">
                        <button type="button" onClick={() => moveSelected(-1)} disabled={selectedIndex === 0} title={L(UI.moveLeft)} aria-label={L(UI.moveLeft)} className="py-2 flex items-center justify-center rounded-sm border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => moveSelected(1)} disabled={selectedIndex === state.modules.length - 1} title={L(UI.moveRight)} aria-label={L(UI.moveRight)} className="py-2 flex items-center justify-center rounded-sm border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => addModule(selected.type, selectedIndex, selected.width)} disabled={!canAdd} title={L(UI.duplicate)} aria-label={L(UI.duplicate)} className="py-2 flex items-center justify-center rounded-sm border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={removeSelected} disabled={state.modules.length <= 1} title={L(UI.remove)} aria-label={L(UI.remove)} className="py-2 flex items-center justify-center rounded-sm border border-red-400/30 text-red-300 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 font-light leading-relaxed flex gap-2">
                      <Eye className="w-4 h-4 text-[#B38E5D] shrink-0" />
                      {L(UI.selectHint)}
                    </p>
                  )}

                  <div className="pt-5 border-t border-white/5">
                    <div className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 mb-3">
                      {canAdd ? L(UI.add) : `${L(UI.maxModules)}: ${MAX_MODULES}`}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {preset.moduleTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          disabled={!canAdd}
                          onClick={() => addModule(type, selectedIndex >= 0 ? selectedIndex : state.modules.length - 1)}
                          className="flex items-center gap-1.5 px-2.5 py-2 text-[11px] text-left rounded-sm border border-white/10 text-neutral-300 hover:text-white hover:border-[#B38E5D]/60 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-[#B38E5D] shrink-0" />
                          {L(MODULE_LABELS[type])}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {tab === 'materials' && (
                <>
                  <div>
                    <div className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 mb-3">{L(UI.fronts)}</div>
                    <SwatchPicker
                      finishes={WOOD_AND_LACQUER_FINISHES}
                      value={state.frontFinish}
                      onChange={(frontFinish) => update({ frontFinish })}
                      lang={lang}
                      custom={{ color: state.customFrontColor, onColor: (customFrontColor) => update({ customFrontColor }), label: L(UI.customColor) }}
                    />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 mb-3">{L(UI.body)}</div>
                    <SwatchPicker
                      finishes={WOOD_AND_LACQUER_FINISHES}
                      value={state.bodyFinish}
                      onChange={(bodyFinish) => update({ bodyFinish })}
                      lang={lang}
                      custom={{ color: state.customBodyColor, onColor: (customBodyColor) => update({ customBodyColor }), label: L(UI.customColor) }}
                    />
                  </div>
                  {state.preset !== 'wardrobe' && (
                    <div>
                      <div className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 mb-3">{L(UI.top)}</div>
                      <SwatchPicker finishes={TOP_FINISHES} value={state.topFinish} onChange={(topFinish) => update({ topFinish })} lang={lang} />
                    </div>
                  )}
                  <div>
                    <div className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 mb-3">{L(UI.handles)}</div>
                    <div className="space-y-1.5">
                      {(Object.keys(HANDLE_LABELS) as HandleStyle[]).map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => update({ handles: h })}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-[11px] text-left rounded-sm border transition-colors cursor-pointer ${state.handles === h ? 'border-[#B38E5D] text-white bg-[#B38E5D]/10' : 'border-white/10 text-neutral-400 hover:text-white'}`}
                        >
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ background: h === 'brass' ? '#B38E5D' : h === 'black' ? '#171717' : 'transparent' }} />
                          {L(HANDLE_LABELS[h])}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {tab === 'size' && (
                <>
                  <Slider label={L(UI.height)} value={state.height} min={preset.height.min} max={preset.height.max} step={preset.height.step} unit={L(UI.cm)} onChange={(height) => update({ height })} />
                  <Slider label={L(UI.depth)} value={state.depth} min={preset.depth.min} max={preset.depth.max} step={preset.depth.step} unit={L(UI.cm)} onChange={(depth) => update({ depth })} />
                  <div className="flex items-center justify-between text-xs py-2 border-y border-white/5">
                    <span className="text-neutral-400">{L(UI.totalWidth)}</span>
                    <span className="font-mono text-white">{widthCm} {L(UI.cm)}</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {state.preset === 'kitchen' && (
                      <>
                        <Toggle label={L(UI.upperCabinets)} checked={state.upperCabinets} onChange={(upperCabinets) => update({ upperCabinets })} />
                        <Toggle label={L(UI.island)} checked={state.island} onChange={(island) => update({ island })} />
                        {state.island && (
                          <div className="py-3 space-y-4">
                            <Slider label={L(UI.islandWidth)} value={state.islandWidth} min={120} max={360} step={10} unit={L(UI.cm)} onChange={(islandWidth) => update({ islandWidth })} />
                            <Slider label={L(UI.islandDepth)} value={state.islandDepth} min={70} max={130} step={5} unit={L(UI.cm)} onChange={(islandDepth) => update({ islandDepth })} />
                          </div>
                        )}
                      </>
                    )}
                    {state.preset === 'living' && <Toggle label={L(UI.wallPanel)} checked={state.wallPanel} onChange={(wallPanel) => update({ wallPanel })} />}
                    <Toggle label={L(UI.lighting)} checked={state.lighting} onChange={(lighting) => update({ lighting })} icon={<Lightbulb className="w-3.5 h-3.5 text-[#B38E5D]" />} />
                  </div>
                </>
              )}
            </div>

            {/* Estimate & CTA */}
            <div className="p-5 border-t border-white/10 bg-[#141312]/60">
              <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">{L(UI.estimate)}</div>
              <div className="font-serif text-3xl text-white font-light mt-1 tabular-nums">{priceText}</div>
              <div className="text-[11px] text-neutral-500 font-light mt-1 mb-4">{L(UI.estimateNote)}</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onSendToTechnologist(describeConfiguration(state, priceText))}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#E8E4DF] hover:bg-[#B38E5D] text-[#141312] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {L(UI.send)}
                </button>
                <button
                  type="button"
                  onClick={() => switchPreset(state.preset)}
                  title={L(UI.reset)}
                  aria-label={L(UI.reset)}
                  className="px-3 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white rounded-sm cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

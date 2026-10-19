import {
  HANDLE_LABELS,
  Localized,
  MODULE_LABELS,
  PRESETS,
  TOP_FINISHES,
  WOOD_AND_LACQUER_FINISHES
} from './configuratorData';

// Every label of the 3D configurator; part of the site content, so the admin panel can edit it
export const CONFIGURATOR_UI = {
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
};

const finishLabels: Record<string, Localized> = {};
for (const f of [...WOOD_AND_LACQUER_FINISHES, ...TOP_FINISHES]) finishLabels[f.id] = f.label;

export const CONFIGURATOR_TEXTS = {
  ui: CONFIGURATOR_UI,
  presets: { kitchen: PRESETS.kitchen.label, wardrobe: PRESETS.wardrobe.label, living: PRESETS.living.label },
  modules: MODULE_LABELS,
  finishes: finishLabels,
  handles: HANDLE_LABELS
};

export type ConfiguratorTexts = typeof CONFIGURATOR_TEXTS;

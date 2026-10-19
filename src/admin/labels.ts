// Russian names for content fields shown in the admin panel; unknown keys fall back to the key itself
export const FIELD_LABELS: Record<string, string> = {
  // Contacts
  phone: 'Основной телефон',
  whatsapp: 'WhatsApp (номер)',
  email: 'Email',
  telegramUrl: 'Ссылка на Telegram',
  instagramUrl: 'Ссылка на Instagram',
  youtubeUrl: 'Ссылка на YouTube',
  whatsappMessage: 'Текст сообщения в WhatsApp',
  // Common
  id: 'ID (служебный)',
  title: 'Заголовок',
  subtitle: 'Подзаголовок',
  description: 'Описание',
  desc: 'Описание',
  text: 'Текст',
  name: 'Название',
  image: 'Фото',
  tag: 'Подпись',
  kicker: 'Надзаголовок',
  residence: 'Объект / адрес',
  // Portfolio cases
  zone: 'Зона (для фильтра)',
  zoneLabel: 'Зона (подпись)',
  style: 'Стиль (для фильтра)',
  styleLabel: 'Стиль (подпись)',
  area: 'Площадь',
  timeline: 'Срок реализации',
  task: 'Задача клиента',
  engineeringSolution: 'Инженерное решение',
  materials: 'Материалы',
  hardware: 'Фурнитура',
  drawingNote: 'Подпись к чертежу',
  realizedImage: 'Фото реализации',
  blueprintImage: 'Фото чертежа',
  gallery: 'Галерея',
  metrics: 'Показатели',
  label: 'Подпись',
  value: 'Значение',
  priceRub: 'Цена, ₽',
  priceKgs: 'Цена, сом',
  priceBreakdown: 'Состав сметы',
  item: 'Позиция',
  // Ready furniture
  sku: 'Артикул',
  category: 'Категория',
  categoryLabel: 'Категория (подпись)',
  dimensions: 'Размеры',
  finish: 'Отделка',
  specs: 'Характеристики',
  stockLocation: 'Где находится',
  inStock: 'В наличии',
  leadTimeDays: 'Срок, дней',
  // Materials
  origin: 'Происхождение',
  colorHex: 'Цвет',
  texturePattern: 'Текстура (служебное)',
  highlight: 'Акцент',
  // Reviews / FAQ
  author: 'Автор',
  role: 'Должность',
  question: 'Вопрос',
  answer: 'Ответ',
  year: 'Год',
  projectScope: 'Объём проекта'
};

// Section names for the texts (translations) tab
export const TEXT_SECTION_LABELS: Record<string, string> = {
  nav: 'Меню и шапка',
  hero: 'Главный экран',
  usps: 'Преимущества',
  portfolio: 'Портфолио',
  readyCollection: 'Готовая мебель и калькулятор',
  caseModal: 'Окно проекта',
  materials: 'Материалы',
  standards: 'Производство',
  workflow: 'Процесс работы',
  architects: 'Архитекторам',
  reviews: 'Отзывы и партнёры',
  faq: 'Вопросы и ответы',
  showroom: 'Шоурум и форма заявки',
  footer: 'Подвал сайта',
  whatsappTooltip: 'Подсказка WhatsApp',
  aiConcierge: 'AI-консьерж',
  consultationModal: 'Окно консультации'
};

// Fixed values the site's filters rely on, keyed by "section.field"
export const ENUM_OPTIONS: Record<string, { value: string; label: string }[]> = {
  'cases.zone': [
    { value: 'kitchen', label: 'Кухня' },
    { value: 'wardrobe', label: 'Гардеробная' },
    { value: 'living', label: 'Гостиная' },
    { value: 'cabinet', label: 'Кабинет' },
    { value: 'complex', label: 'Комплексный проект' }
  ],
  'cases.style': [
    { value: 'minimalism', label: 'Минимализм' },
    { value: 'modern_luxury', label: 'Современная классика / luxury' },
    { value: 'japandi', label: 'Джапанди' },
    { value: 'neoclassic', label: 'Неоклассика' }
  ],
  'readyFurniture.category': [
    { value: 'dining', label: 'Столовая' },
    { value: 'living', label: 'Гостиная' },
    { value: 'lounge', label: 'Лаунж / кресла' },
    { value: 'storage', label: 'Хранение' },
    { value: 'office', label: 'Кабинет' }
  ],
  'materials.category': [
    { value: 'veneer', label: 'Шпон' },
    { value: 'stone', label: 'Камень' },
    { value: 'metal', label: 'Металл' },
    { value: 'enamel', label: 'Эмаль' },
    { value: 'leather', label: 'Кожа' }
  ]
};

// Fields hidden from the editor because the site no longer reads them
export const HIDDEN_TEXT_PATHS = new Set(['showroom.phoneLabel']);

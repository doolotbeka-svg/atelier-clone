type Localized = { ru: string; en: string; ky: string };

export interface FormOption {
  id: string;
  label: Localized;
}

// Texts of the showroom lead form and the consultation modal that are not in the translations file
export const FORM_TEXTS = {
  mapTitle: { ru: 'Карта проезда · Бишкек', en: 'Bishkek Showroom Map', ky: 'Бишкек картасы' },
  namePlaceholder: { ru: 'Иван Демидов', en: 'Full Name', ky: 'Аты-жөнүңүз' },
  phonePlaceholder: '+996 (555) 00-00-00',
  notesPlaceholder: {
    ru: 'Опишите ваши предпочтения по шпону, камню, габаритам или укажите адрес объекта в Бишкеке/Иссык-Куле...',
    en: 'Notes regarding materials or drawings...',
    ky: 'Материалдар же чиймелер боюнча каалоолор...'
  },
  visitShowroomLabel: {
    ru: 'Хочу лично посетить шоурум в Бишкеке для подбора материалов при правильном свете',
    en: 'Schedule private showroom consultation in Bishkek',
    ky: 'Бишкектеги шоурумга жолугушууну пландоо (бул. Эркиндик, 35)'
  },
  modalNamePlaceholder: { ru: 'Константин / Alexander', en: 'Konstantin / Alexander', ky: 'Константин / Alexander' },
  modalNotesPlaceholder: { ru: 'Комментарий...', en: 'Notes...', ky: 'Комментарий...' },
  projectTypes: [
    { id: 'ready_furniture', label: { ru: 'Готовая мебель из наличия в шоуруме', en: 'Ready Furniture from Showroom Stock', ky: 'Шоурумда бар даяр эмерек' } },
    { id: 'kitchen', label: { ru: 'Кухонный гарнитур и остров', en: 'Kitchen Cabinetry & Island', ky: 'Ашкана гарнитуру жана арал' } },
    { id: 'wardrobe', label: { ru: 'Мастер-гардеробная комната', en: 'Master Dressing Room', ky: 'Мастер-гардероб бөлмөсү' } },
    { id: 'living', label: { ru: 'Гостиная зона & ТВ-консоль', en: 'Living Area & TV Console', ky: 'Конок бөлмө жана ТВ-консоль' } },
    { id: 'cabinet', label: { ru: 'Кабинет & библиотека', en: 'Private Study & Library', ky: 'Иш бөлмө жана китепкана' } },
    { id: 'complex', label: { ru: 'Комплексная меблировка виллы/пентхауса', en: 'Full Villa/Penthouse Fitout', ky: 'Вилланы/пентхаусту толук эмеректөө' } }
  ] as FormOption[],
  budgetsKgs: [
    { id: 'from_1_5m', label: { ru: '1.5 – 3 млн сом', en: '1.5M – 3M KGS', ky: '1.5 – 3 млн сом' } },
    { id: 'from_3m', label: { ru: '3 – 7 млн сом', en: '3M – 7M KGS', ky: '3 – 7 млн сом' } },
    { id: 'from_7m', label: { ru: '7 – 15 млн сом', en: '7M – 15M KGS', ky: '7 – 15 млн сом' } },
    { id: 'above_15m', label: { ru: 'Более 15 млн сом (High-End)', en: '15M+ KGS (Luxury)', ky: '15 млн сомдон жогору (High-End)' } }
  ] as FormOption[],
  budgetsRub: [
    { id: 'from_1_5m', label: { ru: 'От 1.5 до 3 млн ₽', en: '1.5M – 3M RUB', ky: '1.5 – 3 млн рубль' } },
    { id: 'from_3m', label: { ru: 'От 3 до 7 млн ₽', en: '3M – 7M RUB', ky: '3 – 7 млн рубль' } },
    { id: 'from_7m', label: { ru: 'От 7 до 15 млн ₽', en: '7M – 15M RUB', ky: '7 – 15 млн рубль' } },
    { id: 'above_15m', label: { ru: 'Более 15 млн ₽ (High-End)', en: '15M+ RUB (Luxury)', ky: '15 млн рублден жогору (High-End)' } }
  ] as FormOption[]
};

export type FormTexts = typeof FORM_TEXTS;

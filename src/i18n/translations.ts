import { Language } from '../context/LanguageContext';

export interface TranslationData {
  nav: {
    portfolio: string;
    readyCollection: string;
    configurator: string;
    materials: string;
    standards: string;
    workflow: string;
    architects: string;
    showroom: string;
    discuss: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaPortfolio: string;
    ctaReady: string;
    ctaShowroom: string;
    kpiProduction: string;
    kpiTolerance: string;
    kpiWarranty: string;
    kpiNda: string;
    kpiProductionSub: string;
    kpiToleranceSub: string;
    kpiWarrantySub: string;
    kpiNdaSub: string;
    currentObject: string;
  };
  usps: {
    sectionTag: string;
    title: string;
    list: {
      index: string;
      title: string;
      description: string;
    }[];
  };
  portfolio: {
    sectionTag: string;
    title: string;
    subtitle: string;
    zoneLabel: string;
    styleLabel: string;
    allZones: string;
    kitchens: string;
    wardrobes: string;
    living: string;
    cabinets: string;
    complex: string;
    allStyles: string;
    minimalism: string;
    modernLuxury: string;
    japandi: string;
    neoclassic: string;
    viewDetails: string;
    materialsAndNodes: string;
    emptyMessage: string;
    resetFilters: string;
    priceLabel: string;
  };
  readyCollection: {
    sectionTag: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterDining: string;
    filterStorage: string;
    filterLounge: string;
    filterLiving: string;
    filterOffice: string;
    inStockBadge: string;
    skuLabel: string;
    dimensionsLabel: string;
    materialsLabel: string;
    finishLabel: string;
    specsLabel: string;
    priceLabel: string;
    reserveBtn: string;
    detailsBtn: string;
    deliveryNote: string;
    calculatorTitle: string;
    calculatorSubtitle: string;
    calcSelectType: string;
    calcSelectMaterial: string;
    calcLengthLabel: string;
    calcEstimatedCost: string;
    calcSendEstimate: string;
    calcNote: string;
    modalTitle: string;
    modalSubtitle: string;
    modalReserveTitle: string;
    modalReserveSuccess: string;
  };
  caseModal: {
    projectCase: string;
    tabCompare: string;
    tabGallery: string;
    dragHint: string;
    realizedBadge: string;
    blueprintBadge: string;
    taskTitle: string;
    solutionTitle: string;
    materialsTitle: string;
    hardwareTitle: string;
    timeline: string;
    area: string;
    ctaCalculate: string;
    turnkeyCost: string;
    breakdownTitle: string;
  };
  materials: {
    sectionTag: string;
    title: string;
    tabMaterials: string;
    tabEngineering: string;
    selectHint: string;
    originLabel: string;
    finishLabel: string;
    specsLabel: string;
    engineeringPillars: {
      title: string;
      origin: string;
      desc: string;
      highlight: string;
    }[];
  };
  standards: {
    sectionTag: string;
    title: string;
    subtitle: string;
    toleranceLabel: string;
    zones: {
      title: string;
      country: string;
      desc: string;
    }[];
  };
  workflow: {
    sectionTag: string;
    title: string;
    subtitle: string;
    resultLabel: string;
    steps: {
      step: string;
      title: string;
      description: string;
      details: string;
      duration: string;
    }[];
  };
  architects: {
    sectionTag: string;
    title: string;
    subtitle: string;
    features: {
      title: string;
      desc: string;
    }[];
    libraryTitle: string;
    libraryDesc: string;
    downloadBtn: string;
    downloadSuccess: string;
    formTitle: string;
    formDesc: string;
    studioNameLabel: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    activeProjectLabel: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    privacyNote: string;
  };
  reviews: {
    sectionTag: string;
    title: string;
    partnersTag: string;
    partnersTitle: string;
  };
  faq: {
    sectionTag: string;
    title: string;
    subtitle: string;
    quickLinksTitle: string;
    quickServices: string[];
  };
  showroom: {
    sectionTag: string;
    title: string;
    subtitle: string;
    atmosphereTag: string;
    flagshipTitle: string;
    address: string;
    addressSub: string;
    parking: string;
    parkingSub: string;
    hours: string;
    hoursSub: string;
    phoneLabel: string;
    phoneSub: string;
    mapSchematic: string;
    mapTransit: string;
    street1: string;
    street2: string;
    formTitle: string;
    formDesc: string;
    nameField: string;
    phoneField: string;
    typeField: string;
    budgetField: string;
    commentsField: string;
    uploadField: string;
    uploadDrag: string;
    uploadOr: string;
    uploadSelect: string;
    ndaProtected: string;
    submitFormBtn: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    ndaGuarantee: string;
    contractProof: string;
    warrantyProof: string;
    ndaProof: string;
  };
  footer: {
    desc: string;
    productionFacility: string;
    navTitle: string;
    locationsTitle: string;
    contactsTitle: string;
    flagshipLabel: string;
    flagshipLocation: string;
    factoryLabel: string;
    factoryLocation: string;
    socialsTitle: string;
    copyright: string;
    privacy: string;
    ndaAgreement: string;
    techStandards: string;
  };
  whatsappTooltip: string;
  aiConcierge: {
    btnAria: string;
    headerTitle: string;
    headerSub: string;
    initialGreeting: string;
    prompts: string[];
    placeholder: string;
    loading: string;
  };
  consultationModal: {
    tag: string;
    title: string;
    desc: string;
    formatLabel: string;
    formatShowroom: string;
    formatOnline: string;
    nameLabel: string;
    phoneLabel: string;
    fileLabel: string;
    fileSelect: string;
    commentLabel: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    closeBtn: string;
    ndaText: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  ru: {
    nav: {
      portfolio: 'Портфолио',
      readyCollection: 'Готовая мебель',
      configurator: '3D-конструктор',
      materials: 'Материалы',
      standards: 'Производство',
      workflow: 'Процесс',
      architects: 'Архитекторам',
      showroom: 'Шоурум Бишкек',
      discuss: 'Обсудить проект',
    },
    hero: {
      kicker: 'Архитектурное мебельное ателье · Кыргызстан (Бишкек)',
      title: 'Мебель как продолжение архитектуры вашего пространства',
      subtitle: 'Проектирование и изготовление сложных авторских гарнитуров, стеновых панелей и готовая коллекция в шоуруме на бул. Эркиндик. Точность узлов до 0.5 мм, редкие натуральные шпоны, мрамор и скрытая европейская механика Salice и Blum.',
      ctaPortfolio: 'Смотреть портфолио',
      ctaReady: 'Коллекция в наличии',
      ctaShowroom: 'Записаться в шоурум',
      kpiProduction: '4 200 м²',
      kpiTolerance: '0.5 мм',
      kpiWarranty: '5 лет',
      kpiNda: '100% NDA',
      kpiProductionSub: 'Собственное ЧПУ-производство в Бишкеке (СЭЗ)',
      kpiToleranceSub: 'Допуск примыкания к стенам и потолкам',
      kpiWarrantySub: 'Сервисная гарантия по договору в Кыргызстане',
      kpiNdaSub: 'Конфиденциальность частных резиденций',
      currentObject: 'Текущий объект:',
    },
    usps: {
      sectionTag: 'Архитектурный стандарт качества',
      title: 'Почему сложные проекты в Кыргызстане доверяют нашему ателье',
      list: [
        {
          index: '01',
          title: 'Инженерная деталировка узлов',
          description: 'Собственный конструкторский отдел разрабатывает индивидуальные узлы сопряжений: примыкание камня к дереву под 45°, консольные выносы без видимых опор и скрытые силовые подрамники.'
        },
        {
          index: '02',
          title: 'Сплошной кряж и подбор волокон',
          description: 'Отбираем шпон из одной партии (log-matching), сохраняя непрерывный природный рисунок волокон по всей длине фасадов, стеновых панелей и скрытых дверей без визуальных разрывов.'
        },
        {
          index: '03',
          title: '100% сухая сборка в цеху Бишкека',
          description: 'Каждый гарнитур предварительно собирается на стапелях фабрики перед покраской. Инженеры ОТК проверяют зазоры щупом с точностью до 0.5 мм, исключая подгонку на объекте заказчика.'
        },
        {
          index: '04',
          title: 'Чистый монтаж Festool',
          description: 'Монтаж выполняют штатные бригады с опытом от 8 лет. Все работы ведутся с пылеудаляющими станциями Festool. Полы укрываются оргалитом, а изделия сдаются после финального клининга.'
        }
      ]
    },
    portfolio: {
      sectionTag: 'Избранные реализации · Case Studies',
      title: 'Портфолио реализованных архитектурных проектов',
      subtitle: 'Каждое изделие спроектировано и собрано индивидуально по чертежам ведущих архитекторов для элитных резиденций Бишкека и озера Иссык-Куль.',
      zoneLabel: 'Зона:',
      styleLabel: 'Стиль:',
      allZones: 'Все пространства',
      kitchens: 'Кухни',
      wardrobes: 'Гардеробные',
      living: 'Гостиные & ТВ',
      cabinets: 'Кабинеты',
      complex: 'Комплексные виллы',
      allStyles: 'Все стили',
      minimalism: 'Минимализм',
      modernLuxury: 'Современный люкс',
      japandi: 'Джапанди',
      neoclassic: 'Неоклассика',
      viewDetails: 'Смотреть чертеж и деталировку',
      materialsAndNodes: 'Материалы & узлы:',
      emptyMessage: 'В данной комбинации фильтров нет проектов. Сбросьте фильтры для просмотра всех кейсов.',
      resetFilters: 'Сбросить фильтры',
      priceLabel: 'Стоимость реализации:',
    },
    readyCollection: {
      sectionTag: 'Авторская коллекция · В наличии и под заказ',
      title: 'Готовая дизайнерская мебель в шоуруме Бишкека',
      subtitle: 'Уникальные предметы мебели из редких пород дерева, натурального мрамора и латуни. Все цены указаны в сомах и рублях с мгновенным переключением.',
      filterAll: 'Все предметы',
      filterDining: 'Обеденные столы',
      filterStorage: 'Комоды & Витрины',
      filterLounge: 'Кресла & Лаунж',
      filterLiving: 'Журнальные столики',
      filterOffice: 'Кабинетные столы',
      inStockBadge: 'В наличии в шоуруме',
      skuLabel: 'Артикул:',
      dimensionsLabel: 'Габариты:',
      materialsLabel: 'Материалы:',
      finishLabel: 'Отделка:',
      specsLabel: 'Спецификация:',
      priceLabel: 'Стоимость:',
      reserveBtn: 'Забронировать просмотр',
      detailsBtn: 'Характеристики и фото',
      deliveryNote: 'Бережная доставка по Бишкеку, Иссык-Кулю, Ошу и странам Центральной Азии в индивидуальных защитных кофрах.',
      calculatorTitle: 'Интерактивный калькулятор мебели',
      calculatorSubtitle: 'Рассчитайте предварительную смету по вашим параметрам в сомах или рублях с учетом материалов и европейской фурнитуры.',
      calcSelectType: 'Тип мебели / изделия:',
      calcSelectMaterial: 'Основной материал отделки:',
      calcLengthLabel: 'Длина / размер изделия:',
      calcEstimatedCost: 'Ориентировочная стоимость:',
      calcSendEstimate: 'Передать параметры в расчет сметы',
      calcNote: 'Финальная стоимость фиксируется после замера лазерным сканером Leica и утверждения рабочей 3D-деталировки узлов.',
      modalTitle: 'Детали авторского изделия',
      modalSubtitle: 'Экспонируется во флагманском шоуруме Atelier Architectura',
      modalReserveTitle: 'Бронирование предмета мебели',
      modalReserveSuccess: 'Ваш запрос на бронирование успешно зафиксирован',
    },
    caseModal: {
      projectCase: 'Кейс проекта',
      tabCompare: 'Чертеж КД vs Реализация',
      tabGallery: 'Фотогалерея деталей',
      dragHint: 'Потяните ползунок для сравнения',
      realizedBadge: 'Реализованный объект',
      blueprintBadge: 'Конструкторский чертеж КД',
      taskTitle: '01. Архитектурная задача',
      solutionTitle: '02. Конструкторское решение',
      materialsTitle: 'Использованные материалы',
      hardwareTitle: 'Премиальная фурнитура и механизмы',
      timeline: 'Срок реализации:',
      area: 'Площадь:',
      ctaCalculate: 'Рассчитать аналогичное решение',
      turnkeyCost: 'Стоимость под ключ:',
      breakdownTitle: 'Смета ключевых узлов:',
    },
    materials: {
      sectionTag: 'Фактура качества · Инженерная лаборатория',
      title: 'Благородные материалы и скрытая европейская механика',
      tabMaterials: 'Библиотека материалов',
      tabEngineering: 'Скрытая инженерия',
      selectHint: 'Выберите фактуру для инспекции:',
      originLabel: 'Происхождение:',
      finishLabel: 'Финишная обработка:',
      specsLabel: 'Технический регламент и допуски:',
      engineeringPillars: [
        {
          title: 'Скрытые петли Salice Air',
          origin: 'Италия',
          desc: 'Фрезеровка петли выполняется непосредственно в верхний и нижний торец полотна. На боковых стенках шкафа полностью отсутствует громоздкая фурнитура.',
          highlight: 'Нагрузка до 20 кг на створку при толщине петли всего 10 мм'
        },
        {
          title: 'Электроприводы Blum Servo-Drive',
          origin: 'Австрия',
          desc: 'Автоматическое открывание тяжелых выдвижных ящиков легким касанием фасада и бесшумное закрывание со встроенными демпферами Blumotion.',
          highlight: 'Идеально для монолитных кухонных островов без ручек'
        },
        {
          title: 'Копланарные системы Cinetto',
          origin: 'Италия',
          desc: 'В закрытом состоянии двери шкафа находятся в единой плоскости заподлицо. При открывании створка выдвигается вперед и скользит параллельно.',
          highlight: 'Ширина одной створки до 2 000 мм при весе до 100 кг'
        },
        {
          title: 'Скрытый биодинамический свет',
          origin: 'Германия / Австрия',
          desc: 'Светодиодные ленты с индексом цветопередачи CRI 98+ фрезеруются в тело полок под углом 45° с опаловым рассеивателем без точек диодов.',
          highlight: 'Адаптивное изменение температуры света от 2700K до 4000K'
        }
      ]
    },
    standards: {
      sectionTag: 'Фабрика в Бишкеке · 4 200 м²',
      title: 'Собственное высокоточное производство в Кыргызстане',
      subtitle: 'От автоматизированного раскроя на ЧПУ Biesse до ручной шлифовки и финишного масляного покрытия в чистой малярной камере.',
      toleranceLabel: 'Геометрия зазоров: ±0.5 мм',
      zones: [
        {
          title: '5-осевые ЧПУ-центры Biesse',
          country: 'Италия',
          desc: 'Фрезеровка криволинейных фасадов, пазов под петли Salice Air и посадочных мест замков с микронной повторяемостью деталей.'
        },
        {
          title: 'Малярный комплекс избыточного давления',
          country: 'Германия',
          desc: 'Камера с водяной завесой и фильтрацией класса F9 исключает микрочастицы пыли. 5-слойная покраска полиуретановыми эмалями Milesi.'
        },
        {
          title: 'Столярная мастерская ручной доводки',
          country: 'Мастера с опытом 10+ лет',
          desc: 'Ручной подбор рисунка шпона «рубашка в рубашку», прецизионная подгонка стыков под 45 градусов и финишная доводка воском.'
        },
        {
          title: 'Зона контрольной сухой сборки',
          country: 'Стандарт ОТК 0.5 мм',
          desc: '100% предварительная сборка всех гарнитуров на стапеле цеха перед отправкой заказчику для гарантии идеальных зазоров.'
        }
      ]
    },
    workflow: {
      sectionTag: 'Регламент работы · 6 этапов',
      title: 'Прозрачный процесс от эскиза до чистого монтажа',
      subtitle: 'Четкие сроки, юридическая фиксация каждого этапа и персональный ведущий технолог с первого дня взаимодействия.',
      resultLabel: 'Результат этапа:',
      steps: [
        {
          step: '01',
          title: 'Архитектурный бриф и 3D-лазерное сканирование',
          description: 'Анализируем концепцию дизайнера, выезжаем на объект в Бишкеке или за городом со сканером Leica для снятия точной геометрии пространства.',
          details: 'Выявление отклонений стен, перепадов пола и точная привязка коммуникаций.',
          duration: '2–4 дня'
        },
        {
          step: '02',
          title: 'Конструкторская 3D-деталировка узлов (КД)',
          description: 'Штатный инженерный отдел разрабатывает чертежи примыканий к камню, стеклу и металлу с детализацией скрытой европейской механики.',
          details: 'Разрезы 1:1, согласование фурнитуры Blum/Salice и расчет силовых нагрузок.',
          duration: '5–10 дней'
        },
        {
          step: '03',
          title: 'Утверждение образцов и выкрасов в шоуруме',
          description: 'Изготавливаем живые образцы фасадов 40×60 см с выбранным шпоном ореха, камнем и патиной латуни. Утверждаем при дневном свете.',
          details: 'Подписание эталонного контрольного образца (Sample Sign-Off) с фиксацией в договоре.',
          duration: '5–7 дней'
        },
        {
          step: '04',
          title: 'Производство и тестовая сухая сборка',
          description: 'Раскрой на 5-осевых ЧПУ, ручная фанеровка и покраска. Полная контрольная сборка гарнитура в цеху перед нанесением финишных составов.',
          details: 'Контроль зазоров поверочным щупом с видеофиксацией для заказчика.',
          duration: '35–50 дней'
        },
        {
          step: '05',
          title: 'Доставка в индивидуальных защитных кофрах',
          description: 'Элементы упаковываются в трехслойный вспененный полиэтилен, жесткие уголки и влагозащитные чехлы с мягкой внутренней подкладкой.',
          details: 'Транспортировка на специально оборудованном мебельном транспорте с пневмоподвеской.',
          duration: '1–2 дня'
        },
        {
          step: '06',
          title: 'Беспылевой монтаж Festool и паспорт изделия',
          description: 'Штатные мастера монтируют мебель с пылеудалением Festool, пол укрывается оргалитом. Финальный клининг и вручение паспорта с гарантией 5 лет.',
          details: 'Регулировка всех приводов и передача комплекта по уходу за натуральным деревом.',
          duration: '3–6 дней'
        }
      ]
    },
    architects: {
      sectionTag: 'B2B-Партнерство · Архитекторам и Дизайнерам',
      title: 'Инженерная поддержка авторских проектов в Кыргызстане',
      subtitle: 'Берем на себя всю техническую рутину: от 3D-деталировки узлов до авторского надзора и чистого монтажа на объекте.',
      features: [
        {
          title: 'Персональный технолог проекта',
          desc: 'Ведущий конструктор сопровождает проект от первых эскизов до сдачи, отвечая за реализацию сложных узлов.'
        },
        {
          title: 'BIM & 3D-библиотеки текстур',
          desc: 'Готовые 3D-модели узлов, селекционных шпонов и фурнитуры для 3ds Max / Corona / Revit.'
        },
        {
          title: 'Закрытый регламент вознаграждений',
          desc: 'Официальный прозрачный партнерский договор с гарантией защиты авторских прав и регулярными выплатами.'
        },
        {
          title: 'Тест-драйв материалов в шоуруме',
          desc: 'Возможность пригласить клиента в приватный VIP-зал с правильным освещением и полноразмерными образцами.'
        }
      ],
      libraryTitle: 'Библиотека 3D-моделей и бесшовных текстур',
      libraryDesc: 'Пакет материалов для 3ds Max / Corona Renderer / Revit: шпон американского ореха, мрамор Calacatta, латунь и механизмы Salice (1.2 ГБ).',
      downloadBtn: 'Скачать каталог 3D-моделей (ZIP, 1.2 ГБ)',
      downloadSuccess: 'Ссылка на скачивание архива сформирована',
      formTitle: 'Стать партнером Atelier Architectura',
      formDesc: 'Заполните форму, чтобы получить доступ к закрытой базе 3D-моделей, образцам материалов и специальным условиям для дизайн-студий Бишкека.',
      studioNameLabel: 'Название студии или бюро',
      nameLabel: 'Ваше имя',
      phoneLabel: 'Телефон',
      emailLabel: 'Рабочий Email',
      activeProjectLabel: 'Есть ли текущий проект в работе?',
      submitBtn: 'Получить партнерский пакет и 3D-базу',
      successTitle: 'Заявка на партнерство принята',
      successDesc: 'Руководитель B2B-направления свяжется с вами в течение 2 часов для передачи партнерского регламента и архива 3D-моделей.',
      privacyNote: 'Гарантируем конфиденциальность данных и защиту авторских прав',
    },
    reviews: {
      sectionTag: 'Доверие резидентов · Отзывы заказчиков',
      title: 'Реализованные пространства в Кыргызстане',
      partnersTag: 'Европейская фурнитура & Компоненты',
      partnersTitle: 'Официальные технологические партнеры',
    },
    faq: {
      sectionTag: 'Экспертные ответы на вопросы',
      title: 'Все об инженерном подходе и стандартах ателье',
      subtitle: 'Подробно рассказываем о гарантиях, сроках, ценах в сомах и рублях, а также о материалах премиального уровня.',
      quickLinksTitle: 'Быстрые направления ателье:',
      quickServices: [
        'Кухни по индивидуальным чертежам',
        'Мастер-гардеробные с витринами',
        'Стеновые панели буазери и скрытые двери',
        'Готовая мебель из наличия в Бишкеке',
        'Кабинеты со скрытыми сейфами',
        'Комплексное оснащение вилл на Иссык-Куле'
      ]
    },
    showroom: {
      sectionTag: 'Шоурум в Бишкеке · Закрытый формат встреч',
      title: 'Обсудить проект с ведущим технологом-конструктором',
      subtitle: 'Приглашаем вас и вашего архитектора во флагманский шоурум в центре Бишкека на чашку эспрессо. Продемонстрируем образцы редких шпонов, слэбов камня и механизмов в правильном свете CRI 98+.',
      atmosphereTag: 'Атмосфера шоурума в Бишкеке',
      flagshipTitle: 'Флагманский шоурум Atelier Architectura',
      address: 'Бишкек, бульвар Эркиндик (Дзержинского), 35',
      addressSub: 'Пересечение с ул. Токтогула, 1-й этаж',
      parking: 'Паркинг для резидентов и гостей',
      parkingSub: 'Зарезервируем парковочное место к моменту вашего визита',
      hours: 'Пн — Сб: 10:00 — 20:00',
      hoursSub: 'Встречи проводятся по предварительной договоренности',
      phoneLabel: '+996 (312) 98-68-00 / +996 (555) 92-68-00',
      phoneSub: 'Прямая связь с ведущим технологом и шоурумом',
      mapSchematic: 'Схема проезда',
      mapTransit: 'Ориентиры & Паркинг',
      street1: 'бульвар Эркиндик',
      street2: 'ул. Токтогула',
      formTitle: 'Заявка на инженерный расчет проекта',
      formDesc: 'Прикрепите дизайн-проект или эскизы в формате PDF/DWG. Ведущий технолог оценит сопряжения узлов и подготовит развернутую спецификацию в сомах или рублях в течение 24 часов.',
      nameField: 'Ваше имя',
      phoneField: 'Номер телефона (+996...)',
      typeField: 'Тип пространства или готовое изделие',
      budgetField: 'Ориентировочный бюджет',
      commentsField: 'Пожелания к материалам или комментарии к чертежам',
      uploadField: 'Прикрепить дизайн-проект или планы (PDF, DWG, ZIP до 50 МБ)',
      uploadDrag: 'Перетащите файл сюда или',
      uploadOr: '',
      uploadSelect: 'выберите на диске',
      ndaProtected: 'Все файлы защищены соглашением о конфиденциальности NDA',
      submitFormBtn: 'Отправить проект на инженерный просчет',
      submitting: 'Отправка данных...',
      successTitle: 'Проект успешно принят в работу',
      successDesc: 'Наш ведущий инженер-конструктор в Бишкеке уже изучает параметры объекта. Мы свяжемся с вами по указанному телефону для уточнения деталей и согласования визита в шоурум.',
      ndaGuarantee: 'Гарантируем 100% конфиденциальность согласно регламенту NDA',
      contractProof: 'Официальный договор в КР',
      warrantyProof: 'Гарантия 5 лет',
      ndaProof: 'Строгий NDA',
    },
    footer: {
      desc: 'Архитектурное мебельное ателье премиум-класса в Кыргызстане. Проектирование и изготовление мебели по индивидуальным проектам для частных резиденций, вилл и пентхаусов, а также готовая авторская коллекция.',
      productionFacility: 'Собственное высокоточное производство 4 200 м² (СЭЗ «Бишкек», ЧПУ Biesse)',
      navTitle: 'Навигация',
      locationsTitle: 'Локации в Кыргызстане',
      contactsTitle: 'Связь & Соцсети',
      flagshipLabel: 'Флагманский шоурум:',
      flagshipLocation: 'Бишкек, бул. Эркиндик, 35 / ул. Токтогула',
      factoryLabel: 'Производственный комплекс:',
      factoryLocation: 'Кыргызстан, г. Бишкек, СЭЗ «Бишкек» (Ак-Чий), 4 200 м²',
      socialsTitle: 'Портфолио & Медиа:',
      copyright: 'Все права защищены. Кыргызстан.',
      privacy: 'Политика конфиденциальности',
      ndaAgreement: 'Регламент соглашения NDA',
      techStandards: 'Технические ТУ фабрики',
    },
    whatsappTooltip: 'Написать технологу в WhatsApp (+996)',
    aiConcierge: {
      btnAria: 'Открыть чат с ИИ-технологом ателье',
      headerTitle: 'Консьерж-технолог (Бишкек)',
      headerSub: 'Atelier Architectura · Кыргызстан',
      initialGreeting: 'Саламатсызбы / Здравствуйте! Я цифровой инженер-технолог ателье Atelier Architectura в Бишкеке. Готов проконсультировать вас по готовой мебели в наличии, индивидуальным проектам в сомах (KGS) или рублях (RUB), шпону американского ореха, мрамору и механизмам Salice/Blum.',
      prompts: [
        'Какая мебель есть в наличии в шоуруме на Эркиндик?',
        'Какая стоимость готового обеденного стола Arch Monolith?',
        'Сколько стоит кухня под ключ в ЖК Avangard City в сомах?',
        'Условия доставки и монтажа на озере Иссык-Куль'
      ],
      placeholder: 'Спросите о наличии, ценах в сомах или сроках...',
      loading: 'Инженер готовит ответ...',
    },
    consultationModal: {
      tag: 'Консультация & Бронирование мебели',
      title: 'Обсудить проект с ведущим технологом',
      desc: 'Оставьте контактные данные. Мы забронируем понравившийся предмет мебели или подготовим образцы шпонов и камня к вашему визиту в шоурум на Эркиндик.',
      formatLabel: 'Формат встречи',
      formatShowroom: 'Встреча в шоуруме Бишкек (бул. Эркиндик, 35)',
      formatOnline: 'Онлайн-расчет по чертежам / WhatsApp',
      nameLabel: 'Ваше имя',
      phoneLabel: 'Номер телефона (+996...)',
      fileLabel: 'Прикрепить дизайн-проект (PDF/DWG, опционально)',
      fileSelect: 'Нажмите для выбора файла',
      commentLabel: 'Комментарий к проекту или предмету мебели',
      submitBtn: 'Зафиксировать запрос',
      submitting: 'Отправка...',
      successTitle: 'Ваш запрос принят',
      successDesc: 'Ведущий технолог-конструктор Atelier Architectura свяжется с вами в течение 2 часов для согласования удобного времени встречи в шоуруме или разбора чертежей.',
      closeBtn: 'Закрыть',
      ndaText: 'Конфиденциальность защищена NDA',
    }
  },

  en: {
    nav: {
      portfolio: 'Portfolio',
      readyCollection: 'Ready Collection',
      configurator: '3D Configurator',
      materials: 'Materials',
      standards: 'Facility',
      workflow: 'Process',
      architects: 'Architects',
      showroom: 'Bishkek Showroom',
      discuss: 'Discuss Project',
    },
    hero: {
      kicker: 'High-End Architectural Furniture Atelier · Bishkek, Kyrgyzstan',
      title: 'Furniture as the seamless continuation of your architecture',
      subtitle: 'Bespoke cabinetry, architectural wall panelling, and ready luxury showroom pieces at 35 Erkindik Boulevard. 0.5 mm engineering tolerances, exotic hand-selected veneers, Calacatta marble, and concealed Salice & Blum mechanisms.',
      ctaPortfolio: 'Explore Portfolio',
      ctaReady: 'Ready Collection',
      ctaShowroom: 'Book Showroom Visit',
      kpiProduction: '4,200 m²',
      kpiTolerance: '0.5 mm',
      kpiWarranty: '5 Years',
      kpiNda: '100% NDA',
      kpiProductionSub: 'In-house CNC manufacturing in Bishkek (FEZ)',
      kpiToleranceSub: 'Joint tolerance against ceiling & walls',
      kpiWarrantySub: 'Comprehensive service warranty contract',
      kpiNdaSub: 'Strict privacy for elite private residences',
      currentObject: 'Featured Project:',
    },
    usps: {
      sectionTag: 'Architectural Benchmark of Quality',
      title: 'Why Complex Luxury Commissions Choose Our Atelier',
      list: [
        {
          index: '01',
          title: 'Architectural Joint Engineering',
          description: 'Our in-house design engineering department resolves intricate junction details: 45° marble-to-wood mitres, column integrations, cantilever stone spans, and concealed subframes.'
        },
        {
          index: '02',
          title: 'Continuous Log-Matching',
          description: 'We curate flitches from single timber logs, maintaining a continuous natural grain cascade across expansive facade groups, wall cladding, and secret pivot doors.'
        },
        {
          index: '03',
          title: '100% Factory Dry Pre-Assembly',
          description: 'Every bespoke unit is fully assembled on factory jigs in Bishkek prior to finishing. QA engineers inspect panel reveals with feeler gauges to 0.5 mm precision.'
        },
        {
          index: '04',
          title: 'Dust-Free Festool Installation',
          description: 'Installed exclusively by seasoned full-time craftsmen with 8+ years experience using industrial HEPA Festool extraction. Floors protected with hardboard sheets.'
        }
      ]
    },
    portfolio: {
      sectionTag: 'Selected Realizations · Case Studies',
      title: 'Portfolio of Bespoke Architectural Commissions',
      subtitle: 'Every commission is engineered from zero to match the architectural drawings of leading designers without modular limitations.',
      zoneLabel: 'Zone:',
      styleLabel: 'Style:',
      allZones: 'All Spaces',
      kitchens: 'Kitchens',
      wardrobes: 'Wardrobes',
      living: 'Living & Media',
      cabinets: 'Executive Studies',
      complex: 'Full Residences',
      allStyles: 'All Styles',
      minimalism: 'Minimalism',
      modernLuxury: 'Modern Luxury',
      japandi: 'Japandi',
      neoclassic: 'Neoclassic',
      viewDetails: 'Inspect Drawings & Joints',
      materialsAndNodes: 'Materials & Nodes:',
      emptyMessage: 'No projects match this filter selection. Reset filters to view all cases.',
      resetFilters: 'Reset Filters',
      priceLabel: 'Realization Budget:',
    },
    readyCollection: {
      sectionTag: 'Ready Collection · In Showroom & Custom Made',
      title: 'Ready Luxury Furniture at Bishkek Flagship Showroom',
      subtitle: 'Exceptional standalone dining tables, credenzas, and lounge chairs in American walnut, Calacatta Viola marble, and patinated brass. Prices shown in KGS (som) and RUB.',
      filterAll: 'All Items',
      filterDining: 'Dining Tables',
      filterStorage: 'Credenzas & Vitrines',
      filterLounge: 'Lounge Chairs',
      filterLiving: 'Coffee Tables',
      filterOffice: 'Executive Desks',
      inStockBadge: 'In Showroom Stock',
      skuLabel: 'SKU:',
      dimensionsLabel: 'Dimensions:',
      materialsLabel: 'Materials:',
      finishLabel: 'Finishing:',
      specsLabel: 'Specification:',
      priceLabel: 'Price:',
      reserveBtn: 'Reserve Showroom Viewing',
      detailsBtn: 'Specs & Gallery',
      deliveryNote: 'White-glove delivery across Bishkek, Issyk-Kul resort area, Osh, and Central Asia in protective flight cases.',
      calculatorTitle: 'Interactive Furniture Cost Estimator',
      calculatorSubtitle: 'Get an instant preliminary estimate tailored to your dimensions and materials in KGS (som) or RUB.',
      calcSelectType: 'Furniture Category:',
      calcSelectMaterial: 'Primary Noble Material:',
      calcLengthLabel: 'Length / Dimensions:',
      calcEstimatedCost: 'Estimated Turnkey Cost:',
      calcSendEstimate: 'Transfer to Formal Quote',
      calcNote: 'Final cost is confirmed after Leica 3D laser survey and workshop drawing sign-off.',
      modalTitle: 'Ready Piece Details',
      modalSubtitle: 'On display at Atelier Architectura flagship showroom in Bishkek',
      modalReserveTitle: 'Reserve Luxury Furniture Piece',
      modalReserveSuccess: 'Your reservation request has been registered',
    },
    caseModal: {
      projectCase: 'Project Case',
      tabCompare: 'Shop Drawings vs Reality',
      tabGallery: 'Detail Gallery',
      dragHint: 'Drag slider to compare',
      realizedBadge: 'Realized Space',
      blueprintBadge: 'Architectural Shop Drawing',
      taskTitle: '01. Architectural Challenge',
      solutionTitle: '02. Engineering Resolution',
      materialsTitle: 'Specified Materials',
      hardwareTitle: 'Hardware & Concealed Systems',
      timeline: 'Timeline:',
      area: 'Area:',
      ctaCalculate: 'Request Estimate for Similar Solution',
      turnkeyCost: 'Turnkey Commission Cost:',
      breakdownTitle: 'Key Systems Breakdown:',
    },
    materials: {
      sectionTag: 'Texture of Quality · Engineering Lab',
      title: 'Noble Organic Materials & Concealed European Mechanics',
      tabMaterials: 'Materials Library',
      tabEngineering: 'Concealed Engineering',
      selectHint: 'Select texture for technical inspection:',
      originLabel: 'Origin:',
      finishLabel: 'Finishing:',
      specsLabel: 'Technical Standards & Tolerances:',
      engineeringPillars: [
        {
          title: 'Salice Air Concealed Pivot Hinges',
          origin: 'Italy',
          desc: 'Concealed milling into the top and bottom door headers eliminates all bulky side-wall cabinet hardware.',
          highlight: 'Supports up to 20 kg doors with a mere 10 mm hinge footprint'
        },
        {
          title: 'Blum Servo-Drive Motorized Opening',
          origin: 'Austria',
          desc: 'Effortless touch-to-open electric assistance for heavy stone-clad drawers paired with silent Blumotion soft-close.',
          highlight: 'Ideal for monolithic handleless kitchen islands'
        },
        {
          title: 'Cinetto Coplanar Sliding Systems',
          origin: 'Italy',
          desc: 'Doors sit flush in a single plane when closed, stepping forward softly on opening to glide parallel.',
          highlight: 'Supports leaves up to 2,000 mm wide and 100 kg weight'
        },
        {
          title: 'Concealed Biodynamic Illumination',
          origin: 'Germany / Austria',
          desc: 'High CRI 98+ linear LED arrays recessed at 45° with milky diffusers, ensuring zero diode hotspot glare.',
          highlight: 'Tunable white from 2700K warm to 4000K neutral'
        }
      ]
    },
    standards: {
      sectionTag: 'Bishkek Facility · 4,200 m²',
      title: 'In-House Precision Manufacturing in Kyrgyzstan',
      subtitle: 'From automated 5-axis Biesse CNC machining to hand-veneer joinery and clean-room spray coating.',
      toleranceLabel: 'Reveal Precision: ±0.5 mm',
      zones: [
        {
          title: '5-Axis Biesse CNC Machining Centers',
          country: 'Italy',
          desc: 'Sub-millimeter routing of curved profiles, concealed pocket hardware, and bespoke architectural elements.'
        },
        {
          title: 'Pressurized Clean-Room Coating Facility',
          country: 'Germany',
          desc: 'F9-filtered positive pressure atmosphere eliminates airborne dust. 5-stage polyurethane Italian Milesi coatings.'
        },
        {
          title: 'Artisanal Woodworking Workshop',
          country: 'Master Craftsmen (10+ yrs)',
          desc: 'Precision bookmatching of exotic veneers, 45° mitre lock joinery, and artisanal natural wax friction polishing.'
        },
        {
          title: 'Full-Scale Dry Assembly Rig',
          country: '0.5 mm QA Protocol',
          desc: '100% preliminary dry assembly of cabinetry before finishing to guarantee flawless site fit.'
        }
      ]
    },
    workflow: {
      sectionTag: 'Methodology · 6 Stages',
      title: 'Transparent Journey from Brief to Pristine Fit-Out',
      subtitle: 'Fixed contractual milestones, rigorous QA documentation, and a dedicated lead engineer from day one.',
      resultLabel: 'Milestone Deliverable:',
      steps: [
        {
          step: '01',
          title: 'Architectural Brief & Leica 3D Laser Scanning',
          description: 'We review the architectural package and scan the residence in Bishkek or countryside with Leica 3D laser systems.',
          details: 'Digital mapping of wall plumbness, floor levels, and concealed plumbing routes.',
          duration: '2–4 days'
        },
        {
          step: '02',
          title: 'Detailed Engineering & 3D Shop Drawings',
          description: 'In-house CAD engineers draft structural shop drawings for marble, wood, glass, and concealed hardware interfaces.',
          details: '1:1 scale construction details and weight load simulations.',
          duration: '5–10 days'
        },
        {
          step: '03',
          title: 'Sample Approval & Showroom Sign-Off',
          description: 'We craft bespoke 40×60 cm mockups of specified walnut veneer, stone, and brass patina under daylight and 2700K illumination.',
          details: 'Sign-off on golden master reference sample kept for final inspection.',
          duration: '5–7 days'
        },
        {
          step: '04',
          title: 'Precision Craft & Factory Dry Pre-Assembly',
          description: '5-axis CNC routing, hand veneering, and coating. Complete full-scale dry assembly in Bishkek plant before finishing.',
          details: 'QA feeler gauge tolerance audit with video documentation for client.',
          duration: '35–50 days'
        },
        {
          step: '05',
          title: 'Delivery in Custom Protective Flight Cases',
          description: 'Every element is safeguarded in three-tier polyethylene cushioning and moisture-resistant branded cases.',
          details: 'Dedicated climate-monitored fleet with air-ride suspension.',
          duration: '1–2 days'
        },
        {
          step: '06',
          title: 'Dust-Free Festool Fit-Out & Warranty Handover',
          description: 'Installed with Festool HEPA vacuum stations and floor protection. Final handover with 5-year warranty passport.',
          details: 'Fine adjustment of micro-dampers and wood care kit presentation.',
          duration: '3–6 days'
        }
      ]
    },
    architects: {
      sectionTag: 'B2B Collaboration · Architects & Interior Designers',
      title: 'Engineering Execution for Architectural Visions in Kyrgyzstan',
      subtitle: 'We eliminate technical risk for design studios: handling structural calculations, 3D detailing, and pristine on-site fit-out.',
      features: [
        {
          title: 'Dedicated Project Engineer',
          desc: 'A senior engineering technologist collaborates with your team from concept stage through final handover.'
        },
        {
          title: 'BIM & 3D CAD Asset Library',
          desc: 'Ready-to-render textured 3D models and parametric nodes for 3ds Max / Corona / Revit.'
        },
        {
          title: 'Confidential B2B Terms',
          desc: 'Transparent contractual collaboration agreements, copyright protection, and punctual commission schedules.'
        },
        {
          title: 'Private Showroom Sessions',
          desc: 'Access to private conference rooms with CRI 98+ illumination to present material boards to your high-net-worth clients.'
        }
      ],
      libraryTitle: '3D CAD Model & Seamless Texture Library',
      libraryDesc: 'Asset bundle for 3ds Max / Corona Renderer / Revit: American walnut, Calacatta marble, brushed brass, and Salice mechanics (1.2 GB).',
      downloadBtn: 'Download 3D Asset Library (ZIP, 1.2 GB)',
      downloadSuccess: 'Archive download link generated',
      formTitle: 'Apply for Atelier Architectura B2B Partnership',
      formDesc: 'Submit your studio details to access our 3D library, material swatch collections, and bespoke architect trade terms.',
      studioNameLabel: 'Studio or Architecture Practice Name',
      nameLabel: 'Your Name',
      phoneLabel: 'Phone Number',
      emailLabel: 'Direct Email',
      activeProjectLabel: 'Do you have an active residential project?',
      submitBtn: 'Request Architect Partnership Access',
      successTitle: 'Partnership Application Received',
      successDesc: 'Our Head of Architectural Relations in Bishkek will reach out within 2 hours with credentials and 3D assets.',
      privacyNote: 'Strictly confidential and intellectual property protected',
    },
    reviews: {
      sectionTag: 'Client Trust · Private Residences',
      title: 'Realized Commissions in Kyrgyzstan',
      partnersTag: 'European Hardware & Engineering',
      partnersTitle: 'Official Technological Partners',
    },
    faq: {
      sectionTag: 'Expert Insights & FAQ',
      title: 'Architectural Furniture Philosophy & Standards',
      subtitle: 'Learn about our engineering tolerances, 5-year warranty, pricing in SOM / RUB, and bespoke materials.',
      quickLinksTitle: 'Direct Service Lines:',
      quickServices: [
        'Bespoke architectural kitchens',
        'Master dressing rooms with vitrines',
        'Boiserie wall cladding & concealed doors',
        'Ready designer furniture in Bishkek',
        'Private studies with biometric safes',
        'Turnkey villa fit-outs at Lake Issyk-Kul'
      ]
    },
    showroom: {
      sectionTag: 'Bishkek Showroom · Private Appointment Only',
      title: 'Consult with the Lead Engineering Technologist',
      subtitle: 'We invite you and your architect to our flagship gallery in central Bishkek over an espresso. Inspect rare wood veneers, natural stone slabs, and concealed hardware under balanced CRI 98+ lighting.',
      atmosphereTag: 'Showroom Atmosphere',
      flagshipTitle: 'Atelier Architectura Flagship Showroom',
      address: '35 Erkindik Boulevard, Bishkek, Kyrgyzstan',
      addressSub: 'Cross with Toktogul Street, 1st Floor',
      parking: 'Dedicated Guest & Resident Parking',
      parkingSub: 'We reserve an access space for your car prior to arrival',
      hours: 'Mon — Sat: 10:00 — 20:00',
      hoursSub: 'Private consultations by prior appointment only',
      phoneLabel: '+996 (312) 98-68-00 / +996 (555) 92-68-00',
      phoneSub: 'Direct line for private clients and architects',
      mapSchematic: 'Location Map',
      mapTransit: 'Landmarks & Access',
      street1: 'Erkindik Boulevard',
      street2: 'Toktogul Street',
      formTitle: 'Request Bespoke Engineering Calculation',
      formDesc: 'Upload your architectural drawings in PDF or DWG. Our lead technologist will evaluate junction nodes and prepare a detailed specification in KGS (som) or RUB within 24 hours.',
      nameField: 'Your Name',
      phoneField: 'Contact Phone (+996...)',
      typeField: 'Space Type or Ready Furniture Piece',
      budgetField: 'Target Investment Range',
      commentsField: 'Material preferences or notes on drawings',
      uploadField: 'Attach design project or plans (PDF, DWG, ZIP up to 50 MB)',
      uploadDrag: 'Drag and drop file here or',
      uploadOr: '',
      uploadSelect: 'browse from device',
      ndaProtected: 'All uploaded assets are guarded under strict NDA',
      submitFormBtn: 'Submit Project for Engineering Audit',
      submitting: 'Transmitting data...',
      successTitle: 'Project Successfully Registered',
      successDesc: 'Our lead engineering technologist in Bishkek is reviewing your plans. We will contact you shortly to confirm appointment details and review initial estimates.',
      ndaGuarantee: 'Guaranteed 100% confidentiality governed by binding NDA',
      contractProof: 'Official Kyrgyzstan Contract',
      warrantyProof: '5-Year Warranty',
      ndaProof: 'Binding NDA',
    },
    footer: {
      desc: 'High-end architectural furniture atelier in Kyrgyzstan. Bespoke engineering and fabrication for private residences, luxury villas, and penthouses, plus ready-made showroom collection.',
      productionFacility: 'In-house 4,200 m² high-tech facility (FEZ Bishkek, 5-axis Biesse CNC)',
      navTitle: 'Navigation',
      locationsTitle: 'Kyrgyzstan Locations',
      contactsTitle: 'Contact & Media',
      flagshipLabel: 'Flagship Showroom:',
      flagshipLocation: '35 Erkindik Blvd / Toktogul St, Bishkek',
      factoryLabel: 'High-Tech Factory:',
      factoryLocation: 'FEZ Bishkek (Ak-Chiy), 4,200 m² facility',
      socialsTitle: 'Portfolio Channels:',
      copyright: 'All rights reserved. Kyrgyzstan.',
      privacy: 'Privacy Policy',
      ndaAgreement: 'NDA Confidentiality Terms',
      techStandards: 'Factory Technical Specifications',
    },
    whatsappTooltip: 'Chat with technologist on WhatsApp (+996)',
    aiConcierge: {
      btnAria: 'Open AI Atelier Technologist Concierge',
      headerTitle: 'AI Engineering Concierge (Bishkek)',
      headerSub: 'Atelier Architectura · Kyrgyzstan',
      initialGreeting: 'Hello! I am the digital engineering concierge for Atelier Architectura in Bishkek. I can assist you with ready furniture in stock, bespoke project calculations in KGS (som) or RUB, American walnut veneer, natural marble, and concealed Salice/Blum hardware.',
      prompts: [
        'What furniture is currently in stock at Erkindik showroom?',
        'What is the price of the Arch Monolith dining table?',
        'Estimated turnkey cost for a penthouse kitchen in Bishkek?',
        'Delivery and installation terms for Lake Issyk-Kul'
      ],
      placeholder: 'Ask about ready stock, prices in SOM, or timelines...',
      loading: 'Engineer is preparing reply...',
    },
    consultationModal: {
      tag: 'Consultation & Furniture Reservation',
      title: 'Consult with Lead Engineering Technologist',
      desc: 'Leave your contact information. We will reserve your chosen piece or assemble material swatches for your private appointment at our Erkindik showroom.',
      formatLabel: 'Meeting Format',
      formatShowroom: 'Flagship Showroom (35 Erkindik Blvd, Bishkek)',
      formatOnline: 'Online Review via WhatsApp / Drawing Audit',
      nameLabel: 'Your Name',
      phoneLabel: 'Phone Number (+996...)',
      fileLabel: 'Attach Drawings (PDF/DWG, optional)',
      fileSelect: 'Click to select file',
      commentLabel: 'Project or Furniture Notes',
      submitBtn: 'Confirm Consultation Request',
      submitting: 'Transmitting...',
      successTitle: 'Request Received',
      successDesc: 'Atelier Architectura lead technologist will reach out within 2 hours to coordinate your visit or review drawings.',
      closeBtn: 'Close',
      ndaText: 'Protected by Non-Disclosure Agreement',
    }
  },

  ky: {
    nav: {
      portfolio: 'Портфолио',
      readyCollection: 'Даяр эмерек',
      configurator: '3D-конструктор',
      materials: 'Материалдар',
      standards: 'Өндүрүш',
      workflow: 'Процесс',
      architects: 'Архитекторлорго',
      showroom: 'Бишкек шоуруму',
      discuss: 'Долбоорду талкуулоо',
    },
    hero: {
      kicker: 'High-End Архитектуралык Эмерек Ательеси · Кыргызстан (Бишкек)',
      title: 'Интерьериңиздин архитектурасын уланткан премиум эмерек',
      subtitle: 'Жеке чиймелер боюнча автордук гарнитурлар, дубал панелдери жана Эркиндик бульварындагы шоурумдагы даяр автордук коллекция. 0.5 мм тактык, сейрек кездешүүчү табигый шпондор, мрамор жана Salice менен Blum жашыруун механизмдери.',
      ctaPortfolio: 'Портфолиону көрүү',
      ctaReady: 'Даяр коллекция',
      ctaShowroom: 'Шоурумга жазылуу',
      kpiProduction: '4 200 м²',
      kpiTolerance: '0.5 мм',
      kpiWarranty: '5 жыл',
      kpiNda: '100% NDA',
      kpiProductionSub: 'Бишкектеги өздүк ЧПУ-өндүрүш комплекси (ЭЭА)',
      kpiToleranceSub: 'Дубалга жана шыпка тууралануу тактыгы',
      kpiWarrantySub: 'Кыргызстандагы расмий сервистик кепилдик',
      kpiNdaSub: 'Элиталык резиденциялардын купуялуулугу',
      currentObject: 'Учурдагы объект:',
    },
    usps: {
      sectionTag: 'Архитектуралык сапат стандарты',
      title: 'Эмне үчүн Кыргызстандагы татаал долбоорлор биздин ательеге ишенилет',
      list: [
        {
          index: '01',
          title: 'Инженердик түйүндөрдү деталдаштыруу',
          description: 'Өздүк конструктордук бөлүм жеке бириктирүү түйүндөрүн иштеп чыгат: ташты жыгачка 45° менен туташтыруу, көрүнбөгөн таянычсыз консолдук конструкциялар.'
        },
        {
          index: '02',
          title: 'Бирдиктүү дөңгөч жана булалардын шайкештиги',
          description: 'Шпонду бир партиядан (log-matching) тандап, фасаддар жана панелдер боюнча жыгачтын табигый чиймесин үзгүлтүксүз сактайбыз.'
        },
        {
          index: '03',
          title: 'Бишкек цехинде 100% кургак чогултуу',
          description: 'Боёодон мурун ар бир гарнитур фабрикада толук чогултулат. Конструкторлор 0.5 мм тактык менен боштуктарды текшерип, кемчиликтерди алдын алат.'
        },
        {
          index: '04',
          title: 'Festool менен чаңсыз таза орнотуу',
          description: '8 жылдан ашык тажрыйбасы бар өздүк бригадалар Festool чаң соргуч станциялары менен иштешет. Полдор корголуп, таза клинингден кийин тапшырылат.'
        }
      ]
    },
    portfolio: {
      sectionTag: 'Тандалган долбоорлор · Case Studies',
      title: 'Ишке ашырылган архитектуралык долбоорлор',
      subtitle: 'Ар бир буюм типтүү чектерсиз, алдыңкы архитекторлордун чиймелери боюнча Бишкектин жана Ысык-Көлдүн элиталык резиденциялары үчүн жекече даярдалган.',
      zoneLabel: 'Аймак:',
      styleLabel: 'Стиль:',
      allZones: 'Бардык бөлмөлөр',
      kitchens: 'Ашканалар',
      wardrobes: 'Гардеробдор',
      living: 'Конок бөлмөлөрү',
      cabinets: 'Иш бөлмөлөрү',
      complex: 'Комплекстүү виллалар',
      allStyles: 'Бардык стилдер',
      minimalism: 'Минимализм',
      modernLuxury: 'Заманбап люкс',
      japandi: 'Джапанди',
      neoclassic: 'Неоклассика',
      viewDetails: 'Чиймени жана деталдарды көрүү',
      materialsAndNodes: 'Материалдар & түйүндөр:',
      emptyMessage: 'Бул фильтрге дал келген долбоорлор табылган жок. Фильтрлерди баштапкы абалга келтириңиз.',
      resetFilters: 'Фильтрлерди тазалоо',
      priceLabel: 'Ишке ашыруу баасы:',
    },
    readyCollection: {
      sectionTag: 'Автордук коллекция · Шоурумда бар жана буйрутма боюнча',
      title: 'Бишкек шоурумундагы даяр дизайнердик эмеректер',
      subtitle: 'Сейрек кездешүүчү жыгач түрлөрүнөн, табигый мрамордон жана латундан жасалган өзүнчө эмеректер. Бардык баалар сом жана рубль менен көрсөтүлгөн.',
      filterAll: 'Бардык буюмдар',
      filterDining: 'Тамактануучу үстөлдөр',
      filterStorage: 'Комоддор & Витриналар',
      filterLounge: 'Креслолор & Лаунж',
      filterLiving: 'Журнал үстөлдөрү',
      filterOffice: 'Иш үстөлдөрү',
      inStockBadge: 'Шоурумда даяр бар',
      skuLabel: 'Артикул:',
      dimensionsLabel: 'Өлчөмдөрү:',
      materialsLabel: 'Материалдар:',
      finishLabel: 'Иштетүү:',
      specsLabel: 'Спецификация:',
      priceLabel: 'Баасы:',
      reserveBtn: 'Көрүүнү брондоо',
      detailsBtn: 'Мүнөздөмө жана сүрөттөр',
      deliveryNote: 'Бишкек, Ысык-Көл, Ош жана Борбордук Азия боюнча атайын коопсуз коргоочу каптарда жеткирүү.',
      calculatorTitle: 'Эмеректин интерактивдүү калькулятору',
      calculatorSubtitle: 'Өлчөмдөрүңүзгө жана материалдарга жараша болжолдуу бааны сом же рубль менен заматта эсептеңиз.',
      calcSelectType: 'Эмеректин түрү:',
      calcSelectMaterial: 'Негизги жасалга материалы:',
      calcLengthLabel: 'Буюмдун узундугу / өлчөмү:',
      calcEstimatedCost: 'Болжолдуу баасы:',
      calcSendEstimate: 'Параметрлерди сметага жөнөтүү',
      calcNote: 'Акыркы баасы Leica лазердик сканери менен ченөөдөн жана 3D-деталдаштыруудан кийин бекитилет.',
      modalTitle: 'Автордук буюмдун деталдары',
      modalSubtitle: 'Бишкектеги Atelier Architectura флагмандык шоурумунда көргөзмөдө',
      modalReserveTitle: 'Эмеректи брондоо',
      modalReserveSuccess: 'Сиздин брондоо сурооңуз ийгиликтүү катталды',
    },
    caseModal: {
      projectCase: 'Долбоордун кейси',
      tabCompare: 'КД чиймеси vs Чындык',
      tabGallery: 'Деталдардын фотогалереясы',
      dragHint: 'Салыштыруу үчүн сыдырманы тартыңыз',
      realizedBadge: 'Даяр объект',
      blueprintBadge: 'Конструктордук КД чиймеси',
      taskTitle: '01. Архитектуралык тапшырма',
      solutionTitle: '02. Конструктордук чечим',
      materialsTitle: 'Колдонулган материалдар',
      hardwareTitle: 'Премиалдуу фурнитура жана механизмдер',
      timeline: 'Ишке ашыруу мөөнөтү:',
      area: 'Аянты:',
      ctaCalculate: 'Ушундай долбоорду эсептөө',
      turnkeyCost: 'Ачкычка чейинки баасы:',
      breakdownTitle: 'Негизги түйүндөрдүн сметасы:',
    },
    materials: {
      sectionTag: 'Сапат фактурасы · Инженердик лаборатория',
      title: 'Асыл табигый материалдар жана жашыруун европалык механика',
      tabMaterials: 'Материалдар китепканасы',
      tabEngineering: 'Жашыруун инженерия',
      selectHint: 'Изилдөө үчүн материалды тандаңыз:',
      originLabel: 'Келип чыккан өлкөсү:',
      finishLabel: 'Акыркы иштетүү:',
      specsLabel: 'Техникалык регламент жана нормалар:',
      engineeringPillars: [
        {
          title: 'Salice Air жашыруун илгичтери',
          origin: 'Италия',
          desc: 'Илгич түздөн-түз эшиктин үстүнкү жана астыңкы кырына оюлуп орнотулат. Каптал дубалдарда ашыкча тетиктер болбойт.',
          highlight: 'Илгичтин калыңдыгы болгону 10 мм, 20 кг чейин салмакты көтөрөт'
        },
        {
          title: 'Blum Servo-Drive электр жетектери',
          origin: 'Австрия',
          desc: 'Салмактуу тартмаларды жеңил тийүү менен автоматтык ачуу жана Blumotion системасы менен тынч жабуу.',
          highlight: 'Туткасы жок монолиттүү фасаддар үчүн идеалдуу'
        },
        {
          title: 'Cinetto копланардык системалары',
          origin: 'Италия',
          desc: 'Жабык турганда эшиктер бир тегиздикте болот. Ачылганда алдыга чыгып, тынч жылат.',
          highlight: 'Бир канаттын туурасы 2 000 мм чейин, салмагы 100 кг чейин'
        },
        {
          title: 'Биодинамикалык жашыруун жарык',
          origin: 'Германия / Австрия',
          desc: 'CRI 98+ көрсөткүчтүү светодиоддор жашыруун оюктарга салынат. Түс температурасы 2700Kден 4000Kге чейин өзгөрөт.',
          highlight: 'Жыгачтын жана кездеменин табигый түсүн бузбайт'
        }
      ]
    },
    standards: {
      sectionTag: 'Бишкектеги фабрика · 4 200 м²',
      title: 'Кыргызстандагы өздүк жогорку тактыктагы өндүрүш',
      subtitle: 'Плитаны кесүүдөн баштап латунга патина салууга чейин ар бир этапты көзөмөлдөйбүз. Биздин өндүрүш заманбап европалык жабдуулар менен камсыздалган.',
      toleranceLabel: 'Геометрия тактыгы: ±0.5 мм',
      zones: [
        {
          title: '5-октуу Biesse ЧПУ борборлору',
          country: 'Италия',
          desc: 'Радиустук татаал тетиктерди жана Salice Air илгичтерине арналган оюктарды 0.1 мм чейинки тактыкта иштетүү.'
        },
        {
          title: 'Таза аймактуу сырдоо комплекси',
          country: 'Германия',
          desc: 'Ашыкча басымдагы вентиляция чаң түшүүсүн жокко чыгарат. 5 катмарга чейин полиуретан эмаль каптоо.'
        },
        {
          title: 'Кол менен иштетүүчү жыгач цехи',
          country: '10+ жыл тажрыйбасы бар усталар',
          desc: 'Шпонду кол менен микроскопиялык тактыкта бириктирүү жана табигый майларды сүйкөө.'
        },
        {
          title: 'Контролдук кургак чогултуу стенди',
          country: 'ОТК стандарты 0.5 мм',
          desc: 'Объектке жөнөтүүдөн мурун бардык эмерек цехте толук өлчөмдө кургак чогултулуп, текшерилет.'
        }
      ]
    },
    workflow: {
      sectionTag: 'Ишке ашыруу тартиби · 6 кадам',
      title: 'Чиймеден баштап таза орнотууга чейинки ачык процесс',
      subtitle: 'Так мөөнөттөр, ар бир этапты юридикалык бекитүү жана биринчи күндөн тартып жеке башкы технолог.',
      resultLabel: 'Этаптын натыйжасы:',
      steps: [
        {
          step: '01',
          title: 'Архитектуралык бриф жана Leica 3D-сканирлөө',
          description: 'Дизайнердин концепциясын изилдеп, геометрияны так алуу үчүн Leica сканери менен Бишкектеги же шаар четиндеги объектке чыгабыз.',
          details: 'Дубалдардын жана полдун кыйшаюусун, байланыштарды так аныктоо.',
          duration: '2–4 күн'
        },
        {
          step: '02',
          title: 'Конструктордук 3D-деталдаштыруу (КД)',
          description: 'Конструктордук бөлүм ташка, айнекке жана металлга туташуу чиймелерин жана жашыруун механизмдерди иштеп чыгат.',
          details: '1:1 масштабдагы кесилиштер жана Blum/Salice фурнитурасын бекитүү.',
          duration: '5–10 күн'
        },
        {
          step: '03',
          title: 'Шоурумда үлгүлөрдү жана боёкту бекитүү',
          description: 'Тандалган жаңгак шпону, таш жана латунь менен 40×60 см көлөмүндө чыныгы фасад үлгүлөрүн даярдайбыз.',
          details: 'Эталондук контролдук үлгүгө (Sample Sign-Off) кол коюу.',
          duration: '5–7 күн'
        },
        {
          step: '04',
          title: 'Өндүрүш жана сыноо кургак чогултуусу',
          description: '5-октуу ЧПУда кесүү, кол менен шпон чаптоо жана сырдоо. Буюмдар жөнөтүлө электе цехте толук кургак чогултулат.',
          details: 'Аралыктарды щуп менен текшерүү жана кардарга видео-отчет берүү.',
          duration: '35–50 күн'
        },
        {
          step: '05',
          title: 'Атайын коргоочу каптарда жеткирүү',
          description: 'Бардык элементтер үч катмарлуу полиэтиленге жана жумшак ички катмары бар суу өткөрбөс каптарга салынат.',
          details: 'Пневмоподвескасы бар атайын жабдылган эмерек унаасы менен жеткирүү.',
          duration: '1–2 күн'
        },
        {
          step: '06',
          title: 'Festool менен чаңсыз орнотуу жана паспорт',
          description: 'Чеберлер эмеректи Festool чаң соргучтары менен орнотот. Клининг жүргүзүлүп, 5 жылдык кепилдик паспорту тапшырылат.',
          details: 'Доводчиктерди жөндөө жана табигый жыгачка кам көрүү топтомун берүү.',
          duration: '3–6 күн'
        }
      ]
    },
    architects: {
      sectionTag: 'B2B-Өнөктөштүк · Архитекторлорго жана Дизайнерлерге',
      title: 'Кыргызстандагы автордук долбоорлорду инженердик ишке ашыруу',
      subtitle: 'Бардык техникалык милдеттерди өзүбүзгө алабыз: 3D-деталдаштыруудан баштап объекттеги таза орнотууга чейин.',
      features: [
        {
          title: 'Долбоордун жеке технологу',
          desc: 'Башкы конструктор алгачкы эскизден баштап тапшырууга чейин коштоп, татаал түйүндөргө жооп берет.'
        },
        {
          title: 'BIM & 3D-текстуралар китепканасы',
          desc: '3ds Max / Corona / Revit үчүн түйүндөрдүн, шпондордун жана фурнитуранын даяр 3D-моделдери.'
        },
        {
          title: 'Жабык өнөктөштүк регламенти',
          desc: 'Автордук укуктарды коргогон расмий келишим жана өз убагында төлөнүүчү өнөктөштүк сыйлыктар.'
        },
        {
          title: 'Шоурумда материалдарды сыноо',
          desc: 'Кардарыңызды туура жарыгы жана толук өлчөмдөгү үлгүлөрү бар приваттык бөлмөгө чакыруу мүмкүнчүлүгү.'
        }
      ],
      libraryTitle: '3D-моделдер жана тигишсиз текстуралар китепканасы',
      libraryDesc: '3ds Max / Corona / Revit үчүн материалдар пакети: америкалык жаңгак, Calacatta мрамору, латунь жана Salice механизмдери (1.2 ГБ).',
      downloadBtn: '3D-моделдер каталогун жүктөп алуу (ZIP, 1.2 ГБ)',
      downloadSuccess: 'Архивди жүктөө шилтемеси түзүлдү',
      formTitle: 'Atelier Architectura өнөктөшү болуу',
      formDesc: '3D-моделдер базасына, материал үлгүлөрүнө жана Бишкектеги дизайн-студиялар үчүн шарттарга жетүү үчүн форманы толтуруңуз.',
      studioNameLabel: 'Студиянын же бюронун аталышы',
      nameLabel: 'Сиздин атыңыз',
      phoneLabel: 'Телефон',
      emailLabel: 'Иш Email дареги',
      activeProjectLabel: 'Учурда иштеп жаткан долбооруңуз барбы?',
      submitBtn: 'Өнөктөштүк пакетин алуу',
      successTitle: 'Өнөктөштүк табыштамасы кабыл алынды',
      successDesc: 'Бишкектеги B2B жетекчиси 2 саат ичинде сиз менен байланышып, 3D-архивди жана шарттарды жөнөтөт.',
      privacyNote: 'Маалыматтардын купуялуулугуна жана автордук укуктарга кепилдик беребиз',
    },
    reviews: {
      sectionTag: 'Резиденттердин ишеними · Кардарлардын пикирлери',
      title: 'Кыргызстанда ишке ашырылган интерьерлер',
      partnersTag: 'Европалык фурнитура & Компоненттер',
      partnersTitle: 'Расмий технологиялык өнөктөштөр',
    },
    faq: {
      sectionTag: 'Суроолорго эксперттик жооптор',
      title: 'Ательенин инженердик мамилеси жана стандарттары',
      subtitle: 'Кепилдиктер, мөөнөттөр, сом жана рубль баалары, ошондой эле жогорку сапаттагы материалдар тууралуу кенен маалымат.',
      quickLinksTitle: 'Ательенин негизги багыттары:',
      quickServices: [
        'Жеке чиймелер боюнча ашканалар',
        'Витриналары бар мастер-гардеробдор',
        'Буазери панелдери жана жашыруун эшиктер',
        'Бишкекте даяр турган эмеректер',
        'Сейфтери бар жеке кабинеттер',
        'Ысык-Көлдөгү виллаларды комплекстүү жабдуу'
      ]
    },
    showroom: {
      sectionTag: 'Бишкектеги шоурум · Жекече жолугушуу форматы',
      title: 'Долбоорду башкы технолог-конструктор менен талкуулаңыз',
      subtitle: 'Сизди жана архитекторуңузду Бишкектин борборундагы флагмандык шоурумга бир чыны эспрессо ичүүгө чакырабыз. Сейрек шпондордун жана фурнитуранын үлгүлөрүн туура CRI 98+ жарыгында көрсөтөбүз.',
      atmosphereTag: 'Бишкек шоурумунун атмосферасы',
      flagshipTitle: 'Atelier Architectura флагмандык шоуруму',
      address: 'Бишкек ш., Эркиндик (Дзержинского) бульвары, 35',
      addressSub: 'Токтогул көчөсү менен кесилиши, 1-кабат',
      parking: 'Коноктор жана резиденттер үчүн паркинг',
      parkingSub: 'Келүү убактыңызга унаа токтотуучу орун даярдап коёбуз',
      hours: 'Дүй — Иш: 10:00 — 20:00',
      hoursSub: 'Жолугушуулар алдын ала макулдашуу боюнча жүргүзүлөт',
      phoneLabel: '+996 (312) 98-68-00 / +996 (555) 92-68-00',
      phoneSub: 'Башкы технолог жана шоурум менен түз байланыш',
      mapSchematic: 'Жол картасы',
      mapTransit: 'Багыттар & Паркинг',
      street1: 'Эркиндик бульвары',
      street2: 'Токтогул көчөсү',
      formTitle: 'Долбоорду инженердик эсептөөгө табыштама',
      formDesc: 'Дизайн-долбооруңузду же чиймелериңизди PDF/DWG форматында тиркеңиз. Башкы технолог түйүндөрдү баалап, 24 сааттын ичинде сом же рубль менен толук смета даярдайт.',
      nameField: 'Сиздин атыңыз',
      phoneField: 'Байланыш телефону (+996...)',
      typeField: 'Бөлмөнүн түрү же даяр эмерек',
      budgetField: 'Болжолдуу бюджет',
      commentsField: 'Материалдарга карата каалоолор же эскертүүлөр',
      uploadField: 'Дизайн-долбоорду тиркөө (PDF, DWG, ZIP 50 МБ чейин)',
      uploadDrag: 'Файлды бул жерге сүйрөңүз же',
      uploadOr: '',
      uploadSelect: 'дискте тандаңыз',
      ndaProtected: 'Файлдар NDA купуялуулук келишими менен корголгон',
      submitFormBtn: 'Долбоорду инженердик эсептөөгө жөнөтүү',
      submitting: 'Маалымат жөнөтүлүүдө...',
      successTitle: 'Долбоор ийгиликтүү кабыл алынды',
      successDesc: 'Бишкектеги башкы конструкторубуз объекттин параметрлерин изилдеп баштады. Шоурумга келүү убактысын тактоо үчүн сиз менен байланышабыз.',
      ndaGuarantee: 'NDA регламентине ылайык 100% купуялуулукка кепилдик беребиз',
      contractProof: 'КР расмий келишими',
      warrantyProof: '5 жыл кепилдик',
      ndaProof: 'Катуу NDA',
    },
    footer: {
      desc: 'Кыргызстандагы премиум класстагы архитектуралык эмерек ательеси. Элиталык резиденциялар жана пентхаустар үчүн автордук чиймелер боюнча эмерек жасоо жана даяр автордук коллекция.',
      productionFacility: 'Biesse ЧПУ жабдуулары менен 4 200 м² өздүк өндүрүш комплекси («Бишкек» ЭЭА)',
      navTitle: 'Навигация',
      locationsTitle: 'Кыргызстандагы локациялар',
      contactsTitle: 'Байланыш & Соцтармактар',
      flagshipLabel: 'Флагмандык шоурум:',
      flagshipLocation: 'Бишкек ш., Эркиндик бул., 35 / Токтогул көч.',
      factoryLabel: 'Өндүрүштүк комплекс:',
      factoryLocation: 'Кыргызстан, Бишкек ш., «Бишкек» ЭЭА (Ак-Чий), 4 200 м²',
      socialsTitle: 'Портфолио каналдары:',
      copyright: 'Бардык укуктар корголгон. Кыргызстан.',
      privacy: 'Купуялуулук саясаты',
      ndaAgreement: 'NDA келишиминин регламенти',
      techStandards: 'Фабриканын техникалык стандарттары',
    },
    whatsappTooltip: 'WhatsApp аркылуу технолог менен байланышуу (+996)',
    aiConcierge: {
      btnAria: 'ИИ-Технолог чатын ачуу',
      headerTitle: 'Консьерж-технолог (Бишкек)',
      headerSub: 'Atelier Architectura · Кыргызстан',
      initialGreeting: 'Саламатсызбы! Мен Бишкектеги Atelier Architectura ательесинин санариптик инженер-технологумун. Шоурумда бар даяр эмеректер, сом (KGS) же рубль (RUB) менен эсептөө, америкалык жаңгак, мрамор жана Salice/Blum механизмдери боюнча кеңеш берүүгө даярмын.',
      prompts: [
        'Эркиндик шоурумунда кайсы даяр эмеректер бар?',
        'Arch Monolith тамактануучу үстөлүнүн баасы канча сом?',
        'Бишкекте пентхаус үчүн ашкананын баасы канча чыгат?',
        'Ысык-Көлгө жеткирүү жана орнотуу шарттары'
      ],
      placeholder: 'Даяр эмерек, сом баалары же мөөнөт жөнүндө сураңыз...',
      loading: 'Инженер жооп даярдоодо...',
    },
    consultationModal: {
      tag: 'Кеңеш берүү & Эмеректи брондоо',
      title: 'Долбоорду башкы технолог менен талкуулоо',
      desc: 'Байланыш маалыматыңызды калтырыңыз. Тандалган эмеректи брондоп коёбуз же Эркиндиктеги шоурумга келүүңүзгө үлгүлөрдү даярдайбыз.',
      formatLabel: 'Жолугушуунун форматы',
      formatShowroom: 'Бишкек шоурумунда жолугушуу (Эркиндик бул., 35)',
      formatOnline: 'Чийме боюнча онлайн эсептөө / WhatsApp',
      nameLabel: 'Сиздин атыңыз',
      phoneLabel: 'Телефон номери (+996...)',
      fileLabel: 'Дизайн-долбоорду тиркөө (PDF/DWG, милдеттүү эмес)',
      fileSelect: 'Файлды тандоо үчүн басыңыз',
      commentLabel: 'Долбоор же эмерек боюнча эскертүү',
      submitBtn: 'Суроо-талапты бекитүү',
      submitting: 'Жөнөтүлүүдө...',
      successTitle: 'Суроо-талабыңыз кабыл алынды',
      successDesc: 'Atelier Architectura жетектөөчү технологу жолугушуу убактысын же чиймелерди тактоо үчүн 2 саат ичинде сиз менен байланышат.',
      closeBtn: 'Жабуу',
      ndaText: 'Купуялуулук NDA менен корголгон',
    }
  }
};

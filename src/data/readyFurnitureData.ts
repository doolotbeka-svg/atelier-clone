import { ReadyFurnitureItem } from '../types';

export const READY_FURNITURE_CATALOG: ReadyFurnitureItem[] = [
  {
    id: 'ready-dining-walnut',
    sku: 'ARCH-TBL-01',
    title: {
      ru: 'Обеденный стол Arch Monolith из американского ореха и латуни',
      en: 'Arch Monolith Dining Table in American Walnut & Brass',
      ky: 'Америкалык жаңгак жана латундан жасалган Arch Monolith тамактануучу үстөлү'
    },
    category: 'dining',
    categoryLabel: {
      ru: 'Обеденные столы',
      en: 'Dining Tables',
      ky: 'Тамактануучу үстөлдөр'
    },
    dimensions: '2 800 × 1 100 × 760 мм',
    materials: {
      ru: 'Массив и радиальный шпон американского ореха, подстолье из брашированной латуни с защитным воском',
      en: 'Solid American walnut & radial veneer, brushed brass base with protective Renaissance wax',
      ky: 'Америкалык жаңгактын массиви жана радиалдык шпону, коргоочу мом менен капталган браширленген латунь'
    },
    finish: {
      ru: 'Шелковисто-матовое бельгийское масло Rubio Monocoat 0% блеска, тактильная бархатистость',
      en: 'Silky-matte Belgian Rubio Monocoat oil 0% gloss, tactile velvety touch',
      ky: 'Жибектей жалтырабаган бельгиялык Rubio Monocoat майы 0% жалтырак'
    },
    priceKgs: 680000,
    priceRub: 698000,
    inStock: true,
    stockLocation: {
      ru: 'В наличии в шоуруме (Ош)',
      en: 'In stock at the Osh showroom',
      ky: 'Ош шоурумунда бар'
    },
    leadTimeDays: 1,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85'
    ],
    description: {
      ru: 'Архитектурный стол на 10 персон со скругленной геометрией фаски под 45 градусов. Центральное скульптурное подстолье со скрытым стальным каркасом обеспечивает абсолютную монолитную устойчивость.',
      en: 'Architectural 10-seater dining table with 45-degree chamfered contour edge. Sculptural central pedestal with concealed steel core provides uncompromised structural rigidity.',
      ky: '45 градус фаскасы менен 10 кишилик архитектуралык үстөл. Жашыруун болот каркасы бар борбордук скульптуралык буту толук туруктуулукту камсыз кылат.'
    },
    specs: [
      {
        label: { ru: 'Вместимость', en: 'Seating capacity', ky: 'Орун сыйымдуулугу' },
        value: { ru: '8–10 персон', en: '8–10 persons', ky: '8–10 кишилик' }
      },
      {
        label: { ru: 'Толщина столешницы', en: 'Top thickness', ky: 'Үстөлдүн калыңдыгы' },
        value: { ru: '42 мм (сэндвич с сотовым стабилизатором)', en: '42 mm stabilized core', ky: '42 мм турукташтырылган негиз' }
      },
      {
        label: { ru: 'Вес изделия', en: 'Weight', ky: 'Салмагы' },
        value: { ru: '145 кг', en: '145 kg', ky: '145 кг' }
      }
    ]
  },
  {
    id: 'ready-credenza-marble',
    sku: 'ARCH-CRD-02',
    title: {
      ru: 'Консоль-комод Cantilever со слэбом Calacatta Viola и эвкалиптом',
      en: 'Cantilever Credenza in Calacatta Viola Marble & Eucalyptus',
      ky: 'Calacatta Viola мрамору жана эвкалипттен жасалган Cantilever комоду'
    },
    category: 'storage',
    categoryLabel: {
      ru: 'Комоды & Консоли',
      en: 'Credenzas & Consoles',
      ky: 'Комоддор жана консолдор'
    },
    dimensions: '2 200 × 480 × 820 мм',
    materials: {
      ru: 'Шпон копченого эвкалипта селекции Extra Flamed, цельный слэб Calacatta Viola 20 мм (Италия)',
      en: 'Fumed eucalyptus veneer (Extra Flamed), solid Italian Calacatta Viola marble slab 20 mm',
      ky: 'Ышталган эвкалипт шпону, Calacatta Viola табигый италиялык мрамор слэби 20 мм'
    },
    finish: {
      ru: 'Глубокий матовый лак 3% Gloss, мрамор в шлифовке Honed с грязеотталкивающей защитой',
      en: 'Deep matte 3% gloss lacquer, honed marble finish with hydrophobic seal',
      ky: 'Жалтырабаган 3% Gloss лак, кир жукпас катмар менен иштетилген Honed мрамор'
    },
    priceKgs: 520000,
    priceRub: 535000,
    inStock: true,
    stockLocation: {
      ru: 'В наличии в шоуруме (Ош)',
      en: 'In stock at the Osh showroom',
      ky: 'Ош шоурумунда бар'
    },
    leadTimeDays: 1,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85'
    ],
    description: {
      ru: 'Парящая консольная геометрия с 4 бесшовными распашными фасадами на торцевых петлях Salice Air. Внутреннее наполнение ящиков отделано седельной кожей и оснащено мягкой LED-подсветкой с датчиком открытия.',
      en: 'Floating cantilever aesthetics with 4 seamless flush doors on concealed Salice Air pivot hinges. Internal drawers lined with saddle leather and ambient motion-activated lighting.',
      ky: 'Salice Air жашыруун илгичтери менен 4 тигишсиз эшиги бар парящая консоль. Ички тартмалары булгаары менен капталган жана автоматтык LED-жарыгы бар.'
    },
    specs: [
      {
        label: { ru: 'Петли и доводчики', en: 'Hinges & Slides', ky: 'Илгичтер жана механизмдер' },
        value: { ru: 'Salice Air (Италия) скрытые торцевые', en: 'Salice Air concealed end-mount', ky: 'Salice Air (Италия) жашыруун' }
      },
      {
        label: { ru: 'Внутренняя отделка', en: 'Interior lining', ky: 'Ички жасалгасы' },
        value: { ru: 'Натуральная кожа Cuoio + микровелюр', en: 'Cuoio saddle leather + microvelour', ky: 'Cuoio табигый булгаарысы' }
      },
      {
        label: { ru: 'Подсветка', en: 'Lighting', ky: 'Жарыктандыруу' },
        value: { ru: 'Теплый свет 2700K с датчиком движения', en: 'Warm 2700K motion-activated LED', ky: 'Кыймыл сенсору бар жылуу 2700K жарык' }
      }
    ]
  },
  {
    id: 'ready-lounge-sella',
    sku: 'ARCH-LNG-03',
    title: {
      ru: 'Лаунж-кресло Sella с каркасом из мореного дуба и седельной кожей',
      en: 'Sella Lounge Chair in Bog Oak & Italian Saddle Leather',
      ky: 'Эмен жыгачы жана италиялык булгаарыдан жасалган Sella лаунж креслосу'
    },
    category: 'lounge',
    categoryLabel: {
      ru: 'Мягкая зона & Кресла',
      en: 'Lounge Chairs',
      ky: 'Лаунж креслолор'
    },
    dimensions: '840 × 880 × 740 мм (высота посадки 410 мм)',
    materials: {
      ru: 'Массив мореного кавказского дуба ручной полировки, седельная кожа Cuoio растительного дубления (Италия)',
      en: 'Solid bog Caucasian oak hand-polished, vegetable-tanned Italian Cuoio saddle leather',
      ky: 'Кол менен жылмаланган кавказ эменинин массиви, италиялык Cuoio табигый булгаарысы'
    },
    finish: {
      ru: 'Защитный карнаубский воск, открытая строчка вощеной нитью толщиной 1.2 мм',
      en: 'Carnauba protective wax, exposed waxed heavy-thread artisanal saddle stitching',
      ky: 'Карнауб мому, 1.2 мм момдолгон жип менен кол менен тигилген тигиштер'
    },
    priceKgs: 290000,
    priceRub: 298000,
    inStock: true,
    stockLocation: {
      ru: 'В наличии: 2 кресла в шоуруме в Оше',
      en: 'In stock: 2 chairs at Osh showroom',
      ky: 'Ош шоурумунда бар: 2 даана'
    },
    leadTimeDays: 1,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    description: {
      ru: 'Эргономичное кресло с глубокой посадкой, разработанное по канонам датского и японского модернизма. Толстая 3.5-миллиметровая ременная кожа с годами приобретает благородную винтажную патину.',
      en: 'Deep-seat ergonomic lounge chair reflecting Danish-Japandi modernist lineage. Heavy 3.5 mm saddle leather gracefully patinates over decades of tactile use.',
      ky: 'Даниялык жана япондук модернизм үлгүсүндө жасалган терең ыңгайлуу отургучтуу кресло. 3.5 мм калың табигый булгаары жылдар өткөн сайын кооз патинага ээ болот.'
    },
    specs: [
      {
        label: { ru: 'Каркас', en: 'Frame', ky: 'Каркасы' },
        value: { ru: 'Шиповое соединение на ласточкин хвост', en: 'Dovetail mortise & tenon joinery', ky: 'Шиптүү бышык бириктирүү' }
      },
      {
        label: { ru: 'Наполнитель', en: 'Cushion core', ky: 'Ички толтургучу' },
        value: { ru: 'Пенополиуретан с памятью формы + гусиный пух', en: 'Memory foam core + sanitized down', ky: 'Форманы сактаган пенополиуретан + тыбыт' }
      },
      {
        label: { ru: 'Эргономика', en: 'Ergonomics', ky: 'Эргономикасы' },
        value: { ru: 'Угол наклона спинки 108°', en: '108° anatomical recline angle', ky: '108° эңкейүү бурчу' }
      }
    ]
  },
  {
    id: 'ready-coffee-patagonia',
    sku: 'ARCH-CFT-04',
    title: {
      ru: 'Кофейный дуэт столов Nexus из светящегося кварцита Patagonia',
      en: 'Nexus Coffee Table Duo in Illuminated Patagonia Quartzite',
      ky: 'Жарык берүүчү Patagonia кварцитинен жасалган Nexus кофе үстөлдөр топтому'
    },
    category: 'living',
    categoryLabel: {
      ru: 'Журнальные столики',
      en: 'Coffee Tables',
      ky: 'Журнал үстөлдөрү'
    },
    dimensions: 'Большой: Ø 1 000 мм (h 380 мм) + Малый: Ø 650 мм (h 460 мм)',
    materials: {
      ru: 'Редкий бразильский кварцит Patagonia с природными жеодами, основание из матовой черненой стали',
      en: 'Exotic Brazilian Patagonia quartzite with natural crystal geode voids, blackened blackened steel pedestal',
      ky: 'Бразилиянын сейрек Patagonia кварцити, жалтырабаган карартылган болоттон жасалган негиз'
    },
    finish: {
      ru: 'Шелковисто-сатиновая поверхность Satin Touch, встроенная аккумуляторная подсветка',
      en: 'Satin Touch silky surface, integrated wireless rechargeable illumination',
      ky: 'Satin Touch жибектей бети, орнотулган зымсыз аккумулятордук жарык'
    },
    priceKgs: 380000,
    priceRub: 390000,
    inStock: true,
    stockLocation: {
      ru: 'В наличии в шоуруме (Ош)',
      en: 'In stock at the Osh showroom',
      ky: 'Ош шоурумунда бар'
    },
    leadTimeDays: 1,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85'
    ],
    description: {
      ru: 'Два стола разной высоты задвигаются друг под друга, создавая скульптурную композицию. Полупрозрачные зоны кварцита мягко светятся в темноте при включении встроенной подсветки.',
      en: 'Nesting duo of varying elevations forming an organic architectural ensemble. Translucent crystalline pockets gently glow in low-light environments via hidden LED array.',
      ky: 'Ар кандай бийиктиктеги эки үстөл бири-биринин алдына кирип, кооз скульптуралык көрүнүштү жаратат. Кварциттин тунук жерлери түнкүсүн жумшак нур чачат.'
    },
    specs: [
      {
        label: { ru: 'Подсветка', en: 'Lighting system', ky: 'Жарык системасы' },
        value: { ru: 'Автономная LED 2700K (до 18 часов работы без подзарядки)', en: 'Cordless rechargeable LED (18h runtime)', ky: 'Автономдуу LED 2700K (18 саатка чейин)' }
      },
      {
        label: { ru: 'Кромка камня', en: 'Stone edge', ky: 'Таштын кыры' },
        value: { ru: 'Плавный радиус с ручной микрополировкой', en: 'Hand-shaped soft-touch bullnose', ky: 'Кол менен жылмаланган тегиз кыр' }
      },
      {
        label: { ru: 'Твердость', en: 'Hardness', ky: 'Катуулугу' },
        value: { ru: '7 по шкале Мооса (устойчив к царапинам и горячему)', en: 'Mohs scale 7 (scratch & heat proof)', ky: 'Моос шкаласы боюнча 7 (чийилбейт)' }
      }
    ]
  },
  {
    id: 'ready-executive-desk',
    sku: 'ARCH-DSK-05',
    title: {
      ru: 'Кабинетный стол Sovereign со скрытым кабель-менеджментом и кожей',
      en: 'Sovereign Executive Desk with Concealed Cable Management & Leather',
      ky: 'Жашыруун кабель системасы жана булгаары менен Sovereign иш үстөлү'
    },
    category: 'office',
    categoryLabel: {
      ru: 'Кабинет & Рабочая зона',
      en: 'Executive Desks',
      ky: 'Иш үстөлдөрү'
    },
    dimensions: '2 400 × 950 × 760 мм',
    materials: {
      ru: 'Шпон термоясеня темного шоколадного тона, бювар из натуральной кожи Nappa, латунные вставки',
      en: 'Deep chocolate thermal ash veneer, integrated fine Nappa leather blotter, brushed brass inlays',
      ky: 'Кара шоколад түстүү термокүл жыгачы, табигый Nappa булгаары бювары, латунь деталдары'
    },
    finish: {
      ru: 'Матовое полиуретановое покрытие повышенной износостойкости, водоотталкивающая пропитка кожи',
      en: 'High-durability matte polyurethane coat, hydrophobic leather preservation',
      ky: 'Өтө бышык жалтырабаган полиуретан каптоо, суу жукпас булгаары'
    },
    priceKgs: 740000,
    priceRub: 760000,
    inStock: true,
    stockLocation: {
      ru: 'В наличии в шоуруме (Ош)',
      en: 'In stock at the Osh showroom',
      ky: 'Ош шоурумунда бар'
    },
    leadTimeDays: 1,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85'
    ],
    description: {
      ru: 'Статусный кабинетный стол с консольным вылетом столешницы и встроенными скрытыми люками для беспроводной зарядки и сетевых интерфейсов. Скрытый выдвижной сейфовый ящик с замком по отпечатку пальца.',
      en: 'Prestigious executive desk with cantilevered overhang and flush concealed access ports for wireless charging and data conduits. Biometric fingerprint-locked hidden drawer.',
      ky: 'Зымсыз кубаттоо жана тармак люктары жашырылган престиждүү кабинет үстөлү. Манжа изи менен ачылуучу жашыруун сейф тартмасы бар.'
    },
    specs: [
      {
        label: { ru: 'Безопасность', en: 'Security', ky: 'Коопсуздук' },
        value: { ru: 'Биометрический сенсорный замок со скрытым сканером', en: 'Concealed biometric fingerprint lock', ky: 'Жашыруун манжа изи сканери' }
      },
      {
        label: { ru: 'Электроника', en: 'Connectivity', ky: 'Байланыш' },
        value: { ru: '2 встроенные Qi-зарядки 15W + выдвижные розетки Bachmann', en: 'Dual integrated 15W Qi chargers + Bachmann module', ky: '2 орнотулган Qi 15W зымсыз кубаттагыч' }
      },
      {
        label: { ru: 'Направляющие ящиков', en: 'Drawer runners', ky: 'Тартма механизмдери' },
        value: { ru: 'Blum Movento с механизмом Tip-On Blumotion', en: 'Blum Movento Tip-On Blumotion', ky: 'Blum Movento Tip-On Blumotion' }
      }
    ]
  },
  {
    id: 'ready-wardrobe-vitrine',
    sku: 'ARCH-VIT-06',
    title: {
      ru: 'Остров-витрина для часов и украшений Horlogerie с рифленым стеклом',
      en: 'Horlogerie Vitrine Island for Watches & Fine Jewelry',
      ky: 'Саат жана зер буюмдар үчүн рифленген айнектүү Horlogerie арал-витринасы'
    },
    category: 'storage',
    categoryLabel: {
      ru: 'Гардеробные витрины',
      en: 'Wardrobe Vitrines',
      ky: 'Гардероб витриналары'
    },
    dimensions: '1 600 × 900 × 880 мм',
    materials: {
      ru: 'Осветленное рифленое стекло Flutes Extra Clear, каркас из анодированного бронзового алюминия, американский орех',
      en: 'Ultra-clear fluted Flutes glass, architectural anodized bronze aluminum profile, American walnut base',
      ky: 'Ачык рифленген Flutes айнеги, анодирленген коло алюминий профили, америкалык жаңгак'
    },
    finish: {
      ru: 'Ложементы из мягкого итальянского микровелюра цвета антрацит, сенсорное включение подсветки полок',
      en: 'Anthracite Italian microvelour compartments, soft capacitive dimmable shelf lighting',
      ky: 'Антрацит түстүү жумшак италиялык микровелюр ложементтер, сенсордук жарык'
    },
    priceKgs: 490000,
    priceRub: 505000,
    inStock: true,
    stockLocation: {
      ru: 'В наличии в шоуруме (Ош)',
      en: 'In stock at the Osh showroom',
      ky: 'Ош шоурумунда бар'
    },
    leadTimeDays: 1,
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=85'
    ],
    description: {
      ru: 'Центральный остров для мастер-гардеробной. Двусторонние выдвижные секции с индивидуальными секциями для часов с автоподзаводом, украшений, ремней и аксессуаров. Стеклянный верхний периметр открывает панорамный обзор.',
      en: 'Centerpiece island for master walk-in wardrobe. Dual-sided soft-close drawers featuring watch-winder modules, custom jewelry dividers, and 360-degree glass perimeter visibility.',
      ky: 'Мастер-гардеробдун борбордук аралы. Сааттар, зергер буюмдар жана аксессуарлар үчүн өзүнчө бөлүктөрү бар эки тараптуу тартмалар.'
    },
    specs: [
      {
        label: { ru: 'Отсеки хранения', en: 'Compartments', ky: 'Сактоо бөлүктөрү' },
        value: { ru: '36 ячеек под украшения + 4 слота автоподзавода часов', en: '36 jewelry trays + 4 automatic watch winders', ky: '36 зер уячасы + 4 автоматтык саат кубаттагыч' }
      },
      {
        label: { ru: 'Стекло', en: 'Glass type', ky: 'Айнек түрү' },
        value: { ru: 'Закаленный триплекс Flutes Extra Clear 8 мм', en: '8 mm tempered laminated Flutes Extra Clear', ky: '8 мм чыңалган Extra Clear айнеги' }
      },
      {
        label: { ru: 'Освещение', en: 'Lighting', ky: 'Жарыктандыруу' },
        value: { ru: 'Спектр CRI 98+ (без искажения цвета драгоценных камней)', en: 'High CRI 98+ spectrum (color-neutral for gems)', ky: 'Табигый CRI 98+ спектри' }
      }
    ]
  }
];

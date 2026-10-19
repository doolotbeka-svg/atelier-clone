type Localized = { ru: string; en: string; ky: string };

export interface HeroSlide {
  title: Localized;
  residence: Localized;
  image: string;
  tag: Localized;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: {
      ru: 'Монолитные кухни с островом из Calacatta',
      en: 'Monolithic Kitchens with Calacatta Viola Island',
      ky: 'Calacatta аралы бар монолиттүү ашканалар'
    },
    residence: {
      ru: 'Пентхаус в ЖК Avangard City (Бишкек)',
      en: 'Avangard City Penthouse (Bishkek)',
      ky: 'Avangard City турак жайындагы пентхаус (Бишкек)'
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    tag: {
      ru: 'Скрытые фасады · Копченый эвкалипт · Salice Air',
      en: 'Concealed Fronts · Fumed Eucalyptus · Salice Air',
      ky: 'Жашыруун фасаддар · Ышталган эвкалипт · Salice Air'
    }
  },
  {
    title: {
      ru: 'Архитектурные гардеробные с подсветкой полок',
      en: 'Architectural Dressing Suites with Integrated Lighting',
      ky: 'Жарыгы бар архитектуралык гардеробдор'
    },
    residence: {
      ru: 'КД Monaco (Бишкек, бул. Эркиндик)',
      en: 'Monaco Club House (Erkindik Blvd, Bishkek)',
      ky: 'Monaco клубдук үйү (Эркиндик бул., Бишкек)'
    },
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=2000&q=85',
    tag: {
      ru: 'Американский орех · Седельная кожа · Бронза',
      en: 'American Walnut · Saddle Leather · Bronze',
      ky: 'Америкалык жаңгак · Булгаары · Коло'
    }
  },
  {
    title: {
      ru: 'Кабинеты буазери с потайными поворотными дверями',
      en: 'Boiserie Executive Studies with Secret Pivot Doors',
      ky: 'Жашыруун айланма эшиктүү буазери иш бөлмөлөрү'
    },
    residence: {
      ru: 'Вилла в VIP-городке «Ала-Арча»',
      en: 'Ala-Archa Luxury Residence',
      ky: 'Ала-Арча VIP-шаарчасындагы вилла'
    },
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=2000&q=85',
    tag: {
      ru: 'Мореный дуб · Латунь 3 мм · Петли FritsJurgens',
      en: 'Bog Oak · Solid Brass 3mm · FritsJurgens Pivots',
      ky: 'Эмен жыгачы · Латунь 3 мм · FritsJurgens илгичтери'
    }
  }
];

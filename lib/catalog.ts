import type { ShopifyProduct } from './shopify';

export type Department = 'women' | 'men' | 'jewellery' | 'new' | 'trending' | 'sale';
export type Family = 'bags' | 'apparel' | 'shoes' | 'accessories' | 'jewellery';
export type Occasion = 'day' | 'work' | 'evening' | 'travel';

export type FilterKey =
  | 'material'
  | 'color'
  | 'size'
  | 'price'
  | 'occasion'
  | 'capacity'
  | 'device-fit'
  | 'waterproof'
  | 'wheels'
  | 'width'
  | 'closure'
  | 'heel-height'
  | 'fit'
  | 'length'
  | 'fabric'
  | 'season';

export interface NormalizedProduct extends ShopifyProduct {
  normalizedTitle: string;
  tagSet: Set<string>;
  attributes: Record<string, string[]>;
  gender: 'women' | 'men' | 'unisex';
  families: Set<Family>;
  occasions: Set<Occasion>;
  bagCategory?: 'day' | 'travel' | 'work' | 'small' | 'evening';
  apparelCategory?: 'tops' | 'bottoms' | 'outer' | 'dresses' | 'lounge';
  shoesCategory?: 'sneakers' | 'boots' | 'sandals' | 'heels' | 'formal';
  accessoriesCategory?: 'belts' | 'scarves' | 'headwear' | 'umbrellas';
  jewelleryGender?: 'women' | 'men' | 'unisex';
  createdAtDate: Date;
  isNew: boolean;
  trending: {
    bestsellers: boolean;
    mostWanted: boolean;
    backIn: boolean;
  };
  isSale: boolean;
}

export interface CatalogDefinition {
  slug: string[];
  title: string;
  section: Department;
  allowedFilters: FilterKey[];
  rule: (product: NormalizedProduct) => boolean;
}

<<<<<<< HEAD
<<<<<<< HEAD
const CORE_FILTERS: FilterKey[] = ['material', 'color', 'size', 'price', 'occasion'];
const FAMILY_FILTERS: Record<Family, FilterKey[]> = {
  bags: [...CORE_FILTERS, 'capacity', 'device-fit', 'waterproof', 'wheels'],
  shoes: [...CORE_FILTERS, 'width', 'closure', 'heel-height'],
  apparel: [...CORE_FILTERS, 'fit', 'length', 'fabric', 'season'],
  accessories: CORE_FILTERS,
  jewellery: ['material', 'color', 'price']
};

const BAG_RULES = [
  {
    key: 'travel' as const,
    tags: ['occasion:travel'],
    keywords: ['duffel', 'weekend', 'carry-on', 'carryon', 'cabin', 'trolley', 'wheeled', 'garment', 'flight', 'suitcase']
  },
  {
    key: 'work' as const,
    tags: ['occasion:work'],
    keywords: ['briefcase', 'messenger', 'attaché', 'attache', 'laptop', 'portfolio']
  },
  {
    key: 'evening' as const,
    tags: ['occasion:evening'],
    keywords: ['clutch', 'evening', 'wristlet', 'minaudiere', 'minaudière']
  },
  {
    key: 'small' as const,
    tags: ['size:mini', 'size:micro', 'small'],
    keywords: ['mini', 'micro', 'pouch', 'wallet', 'card holder', 'cardholder', 'coin']
  },
  {
    key: 'day' as const,
    tags: ['occasion:day'],
    keywords: ['tote', 'shoulder', 'crossbody', 'hobo', 'satchel']
  }
];

const KEYWORD_RULES: Record<Exclude<Family, 'jewellery'>, Array<{ key: string; keywords: string[] }>> = {
  bags: [],
  apparel: [
    { key: 'outer', keywords: ['jacket', 'coat', 'parka', 'poncho', 'rain', 'leather jacket'] },
    { key: 'dresses', keywords: ['dress', 'gown'] },
    { key: 'lounge', keywords: ['lounge', 'sleep', 'pyjama', 'pj', 'pajama'] },
    { key: 'tops', keywords: ['shirt', 't-shirt', 'tee', 'hoodie', 'sweat', 'knit', 'blouse', 'vest', 'gilet'] },
    { key: 'bottoms', keywords: ['trouser', 'pant', 'jean', 'short', 'legging', 'skirt'] }
  ],
  shoes: [
    { key: 'sneakers', keywords: ['sneaker', 'trainer'] },
    { key: 'boots', keywords: ['boot', 'chelsea', 'combat', 'hiking'] },
    { key: 'sandals', keywords: ['sandal', 'slide', 'flip flop', 'flip-flop'] },
    { key: 'heels', keywords: ['heel', 'pump', 'stiletto'] },
    { key: 'formal', keywords: ['oxford', 'derby', 'loafer', 'dress'] }
  ],
  accessories: [
    { key: 'belts', keywords: ['belt'] },
    { key: 'scarves', keywords: ['scarf', 'shawl', 'stole'] },
    { key: 'headwear', keywords: ['cap', 'hat', 'beanie', 'visor', 'headband', 'ear muff', 'earmuff'] },
    { key: 'umbrellas', keywords: ['umbrella', 'parasol'] }
  ]
};

const FAMILY_LABELS: Record<Family, string> = {
  bags: 'Bags',
  apparel: 'Apparel',
  shoes: 'Shoes',
  accessories: 'Accessories',
  jewellery: 'Jewellery'
};

const NORMALISERS: Array<[RegExp, string]> = [
=======
const BAG_KEYWORDS = {
  travel: ['duffel', 'weekend', 'carry-on', 'carryon', 'cabin', 'trolley', 'wheeled', 'garment', 'flight', 'suitcase'],
=======
const BAG_KEYWORDS = {
  travel: [
    'duffel',
    'weekend',
    'carry-on',
    'carryon',
    'cabin',
    'trolley',
    'wheeled',
    'garment',
    'flight',
    'suitcase'
  ],
>>>>>>> origin/main
  work: ['briefcase', 'messenger', 'attache', 'attaché', 'laptop', 'portfolio'],
  evening: ['clutch', 'evening', 'wristlet', 'minaudiere', 'minaudière'],
  small: ['mini', 'micro', 'pouch', 'wallet', 'card holder', 'cardholder', 'coin'],
  day: ['tote', 'shoulder', 'crossbody', 'hobo', 'satchel']
} as const;

const APPAREL_KEYWORDS = {
  outer: ['jacket', 'coat', 'parka', 'poncho', 'rain', 'leather jacket'],
  dresses: ['dress', 'gown'],
  lounge: ['lounge', 'sleep', 'pyjama', 'pj', 'pajama'],
  tops: ['shirt', 't-shirt', 'tee', 'hoodie', 'sweat', 'knit', 'blouse', 'vest', 'gilet'],
  bottoms: ['trouser', 'pant', 'jean', 'short', 'legging', 'skirt']
} as const;

const SHOES_KEYWORDS = {
  sneakers: ['sneaker', 'trainer'],
  boots: ['boot', 'chelsea', 'combat', 'hiking'],
  sandals: ['sandal', 'slide', 'flip flop', 'flip-flop'],
  heels: ['heel', 'pump', 'stiletto'],
  formal: ['oxford', 'derby', 'loafer', 'dress']
} as const;

const ACCESSORY_KEYWORDS = {
  belts: ['belt'],
  scarves: ['scarf', 'shawl', 'stole'],
  headwear: ['cap', 'hat', 'beanie', 'visor', 'headband', 'ear muff', 'earmuff'],
  umbrellas: ['umbrella', 'parasol']
} as const;

<<<<<<< HEAD
const TEXT_NORMALISERS: Array<[RegExp, string]> = [
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
=======
const TEXT_NORMALIZATIONS: Array<[RegExp, string]> = [
>>>>>>> origin/main
  [/cross-body/g, 'crossbody'],
  [/carry on/g, 'carry-on']
];

<<<<<<< HEAD
<<<<<<< HEAD
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

const normaliseText = (value: string) =>
  NORMALISERS.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), value.toLowerCase());
=======
=======
>>>>>>> origin/main
const CORE_FILTERS: FilterKey[] = ['material', 'color', 'size', 'price', 'occasion'];
const BAG_FILTERS: FilterKey[] = ['capacity', 'device-fit', 'waterproof', 'wheels'];
const SHOES_FILTERS: FilterKey[] = ['width', 'closure', 'heel-height'];
const APPAREL_FILTERS: FilterKey[] = ['fit', 'length', 'fabric', 'season'];

const filtersForFamily = (family?: Family): FilterKey[] => {
<<<<<<< HEAD
=======
  if (!family) {
    return CORE_FILTERS;
  }
>>>>>>> origin/main
  switch (family) {
    case 'bags':
      return [...CORE_FILTERS, ...BAG_FILTERS];
    case 'shoes':
      return [...CORE_FILTERS, ...SHOES_FILTERS];
    case 'apparel':
      return [...CORE_FILTERS, ...APPAREL_FILTERS];
<<<<<<< HEAD
=======
    case 'accessories':
      return CORE_FILTERS;
>>>>>>> origin/main
    case 'jewellery':
      return ['material', 'color', 'price'];
    default:
      return CORE_FILTERS;
  }
};

<<<<<<< HEAD
const normaliseText = (value: string) =>
  TEXT_NORMALISERS.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), value.toLowerCase());
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
=======
const normalizeText = (input: string) =>
  TEXT_NORMALIZATIONS.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    input.toLowerCase()
  );
>>>>>>> origin/main

const addAttribute = (attributes: Record<string, string[]>, key: string, value: string) => {
  const bucket = (attributes[key] ??= []);
  if (!bucket.includes(value)) {
    bucket.push(value);
  }
};

<<<<<<< HEAD
<<<<<<< HEAD
const matchByKeywords = (title: string, rules: Array<{ key: string; keywords: string[] }>) =>
  rules.find((rule) => rule.keywords.some((keyword) => title.includes(keyword)))?.key;

const detectBagCategory = (title: string, tags: Set<string>): NormalizedProduct['bagCategory'] | undefined => {
  for (const rule of BAG_RULES) {
    if (rule.tags.some((tag) => tags.has(tag)) || rule.keywords.some((keyword) => title.includes(keyword))) {
      return rule.key;
    }
  }
  return tags.has('department:bags') ? 'day' : undefined;
};

const detectKeywordCategory = <K extends keyof typeof KEYWORD_RULES>(
  kind: K,
  title: string,
  tags: Set<string>
): NormalizedProduct[`${K}Category` & keyof NormalizedProduct] => {
  const tagPrefix = `${kind}:`;
  const tagMatch = Array.from(tags).find((tag) => tag.startsWith(tagPrefix));
  if (tagMatch) {
    return tagMatch.replace(tagPrefix, '') as any;
  }
  const keywordMatch = matchByKeywords(title, KEYWORD_RULES[kind]);
  return (keywordMatch as any) ?? undefined;
};
=======
const hasKeyword = (title: string, keywords: readonly string[]) => keywords.some((keyword) => title.includes(keyword));
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
=======
const hasKeyword = (title: string, keywords: readonly string[]) =>
  keywords.some((keyword) => title.includes(keyword));

const hasAnyTag = (tags: Set<string>, candidates: string[]) =>
  candidates.some((candidate) => tags.has(candidate));
>>>>>>> origin/main

const inferGender = (tags: Set<string>): 'women' | 'men' | 'unisex' => {
  if (tags.has('gender:women')) return 'women';
  if (tags.has('gender:men')) return 'men';
  if (tags.has('gender:unisex')) return 'unisex';
  return 'unisex';
};

const inferFamilies = (tags: Set<string>): Set<Family> => {
  const families = new Set<Family>();
<<<<<<< HEAD
<<<<<<< HEAD
  tags.forEach((tag) => {
    if (tag.startsWith('department:')) {
      const [, value] = tag.split(':');
      if (value && value in FAMILY_LABELS) {
        families.add(value as Family);
      }
    }
  });
=======
=======
>>>>>>> origin/main
  if (tags.has('department:bags')) families.add('bags');
  if (tags.has('department:apparel')) families.add('apparel');
  if (tags.has('department:shoes')) families.add('shoes');
  if (tags.has('department:accessories')) families.add('accessories');
  if (tags.has('department:jewellery')) families.add('jewellery');
<<<<<<< HEAD
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
=======
>>>>>>> origin/main
  return families;
};

const inferOccasions = (tags: Set<string>): Set<Occasion> => {
  const occasions = new Set<Occasion>();
  (['day', 'work', 'evening', 'travel'] as Occasion[]).forEach((occasion) => {
    if (tags.has(`occasion:${occasion}`)) {
      occasions.add(occasion);
    }
  });
  return occasions;
};

<<<<<<< HEAD
<<<<<<< HEAD
const ensureFamilyPresence = (product: NormalizedProduct) => {
  if (product.families.size > 0) {
    return;
  }
  if (product.bagCategory) {
    product.families.add('bags');
  } else if (product.apparelCategory) {
    product.families.add('apparel');
  } else if (product.shoesCategory) {
    product.families.add('shoes');
  } else if (product.accessoriesCategory) {
    product.families.add('accessories');
  } else {
    product.families.add('jewellery');
  }
};

=======
const inferBagCategory = (title: string, tags: Set<string>): NormalizedProduct['bagCategory'] => {
  if (tags.has('occasion:travel') || hasKeyword(title, BAG_KEYWORDS.travel)) return 'travel';
  if (tags.has('occasion:work') || hasKeyword(title, BAG_KEYWORDS.work)) return 'work';
  if (tags.has('occasion:evening') || hasKeyword(title, BAG_KEYWORDS.evening)) return 'evening';
  if (tags.has('size:mini') || tags.has('size:micro') || tags.has('small') || hasKeyword(title, BAG_KEYWORDS.small)) {
    return 'small';
  }
  if (hasKeyword(title, BAG_KEYWORDS.day)) return 'day';
=======
const inferBagCategory = (title: string, tags: Set<string>): NormalizedProduct['bagCategory'] => {
  if (hasAnyTag(tags, ['occasion:travel'])) return 'travel';
  if (hasKeyword(title, BAG_KEYWORDS.travel)) return 'travel';

  if (hasAnyTag(tags, ['occasion:work'])) return 'work';
  if (hasKeyword(title, BAG_KEYWORDS.work)) return 'work';

  if (hasAnyTag(tags, ['occasion:evening'])) return 'evening';
  if (hasKeyword(title, BAG_KEYWORDS.evening)) return 'evening';

  if (hasAnyTag(tags, ['small', 'size:mini', 'size:micro'])) return 'small';
  if (hasKeyword(title, BAG_KEYWORDS.small)) return 'small';

  if (hasKeyword(title, BAG_KEYWORDS.day)) return 'day';

>>>>>>> origin/main
  return 'day';
};

const inferApparelCategory = (title: string, tags: Set<string>): NormalizedProduct['apparelCategory'] => {
  for (const [category, values] of Object.entries(APPAREL_KEYWORDS)) {
    if (hasKeyword(title, values)) {
      return category as NormalizedProduct['apparelCategory'];
    }
  }
  if (tags.has('apparel:outer')) return 'outer';
  if (tags.has('apparel:dresses')) return 'dresses';
  if (tags.has('apparel:lounge')) return 'lounge';
  if (tags.has('apparel:tops')) return 'tops';
  if (tags.has('apparel:bottoms')) return 'bottoms';
  return undefined;
};

const inferShoesCategory = (title: string, tags: Set<string>): NormalizedProduct['shoesCategory'] => {
  if (tags.has('shoes:sneakers')) return 'sneakers';
  if (tags.has('shoes:boots')) return 'boots';
  if (tags.has('shoes:sandals')) return 'sandals';
  if (tags.has('shoes:heels')) return 'heels';
  if (tags.has('shoes:formal')) return 'formal';
  for (const [category, values] of Object.entries(SHOES_KEYWORDS)) {
    if (hasKeyword(title, values)) {
      return category as NormalizedProduct['shoesCategory'];
    }
  }
  return undefined;
};

const inferAccessoryCategory = (title: string, tags: Set<string>): NormalizedProduct['accessoriesCategory'] => {
  if (tags.has('accessories:belts')) return 'belts';
  if (tags.has('accessories:scarves')) return 'scarves';
  if (tags.has('accessories:headwear')) return 'headwear';
  if (tags.has('accessories:umbrellas')) return 'umbrellas';
  for (const [category, values] of Object.entries(ACCESSORY_KEYWORDS)) {
    if (hasKeyword(title, values)) {
      return category as NormalizedProduct['accessoriesCategory'];
    }
  }
  return undefined;
};

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

<<<<<<< HEAD
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
export const normalizeProducts = (products: ShopifyProduct[]): NormalizedProduct[] => {
  const now = Date.now();
  return products.map((product) => {
    const normalizedTitle = normaliseText(product.title);
=======
export const normalizeProducts = (products: ShopifyProduct[]): NormalizedProduct[] => {
  const now = Date.now();
  return products.map((product) => {
    const normalizedTitle = normalizeText(product.title);
>>>>>>> origin/main
    const normalizedTags = (product.tags ?? []).map((tag) => tag.trim().toLowerCase());
    const tagSet = new Set(normalizedTags);
    const attributes: Record<string, string[]> = {};

    normalizedTags.forEach((tag) => {
      const [key, value] = tag.split(':');
      if (value) {
        addAttribute(attributes, key, value);
      }
    });

    const createdAtDate = new Date(product.createdAt);
    const gender = inferGender(tagSet);
    const families = inferFamilies(tagSet);
    const occasions = inferOccasions(tagSet);
<<<<<<< HEAD
<<<<<<< HEAD

    const bagCategory = detectBagCategory(normalizedTitle, tagSet);
    if (bagCategory) {
      families.add('bags');
    }

    const apparelCategory = detectKeywordCategory('apparel', normalizedTitle, tagSet);
    if (apparelCategory) {
      families.add('apparel');
    }

    const shoesCategory = detectKeywordCategory('shoes', normalizedTitle, tagSet);
    if (shoesCategory) {
      families.add('shoes');
    }

    const accessoriesCategory = detectKeywordCategory('accessories', normalizedTitle, tagSet);
    if (accessoriesCategory) {
      families.add('accessories');
    }

=======
=======

>>>>>>> origin/main
    const bagCategory = families.has('bags') ? inferBagCategory(normalizedTitle, tagSet) : undefined;
    const apparelCategory = families.has('apparel') ? inferApparelCategory(normalizedTitle, tagSet) : undefined;
    const shoesCategory = families.has('shoes') ? inferShoesCategory(normalizedTitle, tagSet) : undefined;
    const accessoriesCategory = families.has('accessories')
      ? inferAccessoryCategory(normalizedTitle, tagSet)
      : undefined;
<<<<<<< HEAD
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
    const jewelleryGender = families.has('jewellery')
      ? tagSet.has('gender:women')
        ? 'women'
        : tagSet.has('gender:men')
          ? 'men'
          : 'unisex'
      : undefined;
=======
>>>>>>> origin/main

    const isNew = tagSet.has('new') || now - createdAtDate.getTime() <= THIRTY_DAYS;
    const trending = {
      bestsellers: tagSet.has('bestseller'),
      mostWanted: tagSet.has('most-wanted') || tagSet.has('mostwanted'),
      backIn: tagSet.has('back-in') || now - createdAtDate.getTime() <= FOURTEEN_DAYS
    } as const;
<<<<<<< HEAD

<<<<<<< HEAD
    const normalizedProduct: NormalizedProduct = {
=======
    return {
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
=======
    const isSale = tagSet.has('sale');

    const jewelleryGender = families.has('jewellery')
      ? tagSet.has('gender:women')
        ? 'women'
        : tagSet.has('gender:men')
          ? 'men'
          : 'unisex'
      : undefined;

    return {
>>>>>>> origin/main
      ...product,
      normalizedTitle,
      tagSet,
      attributes,
      gender,
      families,
      occasions,
      bagCategory,
      apparelCategory,
      shoesCategory,
      accessoriesCategory,
      jewelleryGender,
      createdAtDate,
      isNew,
      trending,
<<<<<<< HEAD
      isSale: tagSet.has('sale')
<<<<<<< HEAD
    };

    ensureFamilyPresence(normalizedProduct);

    return normalizedProduct;
  });
};

const matchesGender = (gender: 'women' | 'men') => (product: NormalizedProduct) =>
=======
=======
      isSale
>>>>>>> origin/main
    } satisfies NormalizedProduct;
  });
};

<<<<<<< HEAD
const matchesGender = (product: NormalizedProduct, gender: 'women' | 'men') =>
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
  gender === 'women'
    ? product.gender === 'women' || product.gender === 'unisex'
    : product.gender === 'men' || product.gender === 'unisex';

<<<<<<< HEAD
const belongsToFamily = (family: Exclude<Family, 'jewellery'>) => (product: NormalizedProduct) =>
  product.families.has(family);

=======
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
const bagCategoryIs = (...categories: NonNullable<NormalizedProduct['bagCategory']>[]) =>
  (product: NormalizedProduct) => {
    const category = product.bagCategory ?? 'day';
    return categories.includes(category);
  };

const categoryIs = <Key extends 'apparelCategory' | 'shoesCategory' | 'accessoriesCategory'>(
  key: Key,
  ...values: NonNullable<NormalizedProduct[Key]>[]
) =>
  (product: NormalizedProduct) => {
    const current = product[key];
    return current ? values.includes(current as NonNullable<NormalizedProduct[Key]>) : false;
  };

<<<<<<< HEAD
interface CategoryConfig {
  slug: string[];
  label: string;
  predicate?: (product: NormalizedProduct) => boolean;
}

interface GenderFamilyConfig {
  family: Exclude<Family, 'jewellery'>;
  categories: CategoryConfig[];
}

const GENDER_COLLECTIONS: Record<'women' | 'men', GenderFamilyConfig[]> = {
  women: [
    {
      family: 'bags',
      categories: [
        { slug: [], label: 'Bags' },
        { slug: ['day'], label: 'Bags · Day', predicate: bagCategoryIs('day', 'work') },
        { slug: ['travel'], label: 'Bags · Travel', predicate: bagCategoryIs('travel') },
        { slug: ['small'], label: 'Bags · Small', predicate: bagCategoryIs('small') },
        { slug: ['evening'], label: 'Bags · Evening', predicate: bagCategoryIs('evening') }
      ]
    },
    {
      family: 'apparel',
      categories: [
        { slug: [], label: 'Apparel' },
        { slug: ['tops'], label: 'Apparel · Tops', predicate: categoryIs('apparelCategory', 'tops') },
        { slug: ['bottoms'], label: 'Apparel · Bottoms', predicate: categoryIs('apparelCategory', 'bottoms') },
        { slug: ['outer'], label: 'Apparel · Outer', predicate: categoryIs('apparelCategory', 'outer') },
        { slug: ['dresses'], label: 'Apparel · Dresses', predicate: categoryIs('apparelCategory', 'dresses') }
      ]
    },
    {
      family: 'shoes',
      categories: [
        { slug: [], label: 'Shoes' },
        { slug: ['sneakers'], label: 'Shoes · Sneakers', predicate: categoryIs('shoesCategory', 'sneakers') },
        { slug: ['boots'], label: 'Shoes · Boots', predicate: categoryIs('shoesCategory', 'boots') },
        { slug: ['sandals'], label: 'Shoes · Sandals', predicate: categoryIs('shoesCategory', 'sandals') },
        { slug: ['heels'], label: 'Shoes · Heels', predicate: categoryIs('shoesCategory', 'heels') }
      ]
    },
    {
      family: 'accessories',
      categories: [
        { slug: [], label: 'Accessories' },
        { slug: ['belts'], label: 'Accessories · Belts', predicate: categoryIs('accessoriesCategory', 'belts') },
        { slug: ['scarves'], label: 'Accessories · Scarves', predicate: categoryIs('accessoriesCategory', 'scarves') },
        { slug: ['headwear'], label: 'Accessories · Headwear', predicate: categoryIs('accessoriesCategory', 'headwear') },
        { slug: ['umbrellas'], label: 'Accessories · Umbrellas', predicate: categoryIs('accessoriesCategory', 'umbrellas') }
      ]
    }
  ],
  men: [
    {
      family: 'bags',
      categories: [
        { slug: [], label: 'Bags' },
        { slug: ['day'], label: 'Bags · Day', predicate: bagCategoryIs('day') },
        { slug: ['travel'], label: 'Bags · Travel', predicate: bagCategoryIs('travel') },
        { slug: ['small'], label: 'Bags · Small', predicate: bagCategoryIs('small') },
        { slug: ['work'], label: 'Bags · Work', predicate: bagCategoryIs('work') }
      ]
    },
    {
      family: 'apparel',
      categories: [
        { slug: [], label: 'Apparel' },
        { slug: ['tops'], label: 'Apparel · Tops', predicate: categoryIs('apparelCategory', 'tops') },
        { slug: ['bottoms'], label: 'Apparel · Bottoms', predicate: categoryIs('apparelCategory', 'bottoms') },
        { slug: ['outer'], label: 'Apparel · Outer', predicate: categoryIs('apparelCategory', 'outer') },
        { slug: ['lounge'], label: 'Apparel · Lounge', predicate: categoryIs('apparelCategory', 'lounge') }
      ]
    },
    {
      family: 'shoes',
      categories: [
        { slug: [], label: 'Shoes' },
        { slug: ['sneakers'], label: 'Shoes · Sneakers', predicate: categoryIs('shoesCategory', 'sneakers') },
        { slug: ['boots'], label: 'Shoes · Boots', predicate: categoryIs('shoesCategory', 'boots') },
        { slug: ['sandals'], label: 'Shoes · Sandals', predicate: categoryIs('shoesCategory', 'sandals') },
        { slug: ['formal'], label: 'Shoes · Formal', predicate: categoryIs('shoesCategory', 'formal') }
      ]
    },
    {
      family: 'accessories',
      categories: [
        { slug: [], label: 'Accessories' },
        { slug: ['belts'], label: 'Accessories · Belts', predicate: categoryIs('accessoriesCategory', 'belts') },
        { slug: ['scarves'], label: 'Accessories · Scarves', predicate: categoryIs('accessoriesCategory', 'scarves') },
        { slug: ['headwear'], label: 'Accessories · Headwear', predicate: categoryIs('accessoriesCategory', 'headwear') },
        { slug: ['umbrellas'], label: 'Accessories · Umbrellas', predicate: categoryIs('accessoriesCategory', 'umbrellas') }
      ]
    }
  ]
};

const createGenderDefinitions = () => {
  const definitions: CatalogDefinition[] = [];

  (['women', 'men'] as const).forEach((gender) => {
    const genderRule = matchesGender(gender);
    const genderLabel = gender === 'women' ? 'Women' : 'Men';
    definitions.push({
      slug: [gender],
      title: genderLabel,
      section: gender,
      allowedFilters: CORE_FILTERS,
      rule: genderRule
    });

    GENDER_COLLECTIONS[gender].forEach(({ family, categories }) => {
      const familyRule = (product: NormalizedProduct) => belongsToFamily(family)(product) && genderRule(product);
      categories.forEach(({ slug, label, predicate }) => {
        definitions.push({
          slug: [gender, family, ...slug],
          title: `${genderLabel} · ${label}`,
          section: gender,
          allowedFilters: FAMILY_FILTERS[family],
          rule: (product) => familyRule(product) && (!predicate || predicate(product))
        });
      });
    });
  });

  return definitions;
};

const SIMPLE_DEFINITIONS: Array<{
  slug: string[];
  title: string;
  section: Department;
  allowedFilters?: FilterKey[];
  rule: (product: NormalizedProduct) => boolean;
}> = [
  {
    slug: ['jewellery'],
    title: 'Jewellery',
    section: 'jewellery',
    allowedFilters: FAMILY_FILTERS.jewellery,
    rule: (product) => product.families.has('jewellery')
  },
  {
    slug: ['jewellery', 'women'],
    title: 'Jewellery · Women',
    section: 'jewellery',
    allowedFilters: FAMILY_FILTERS.jewellery,
    rule: (product) => product.families.has('jewellery') && (!product.jewelleryGender || product.jewelleryGender !== 'men')
  },
  {
    slug: ['jewellery', 'men'],
    title: 'Jewellery · Men',
    section: 'jewellery',
    allowedFilters: FAMILY_FILTERS.jewellery,
    rule: (product) => product.families.has('jewellery') && (!product.jewelleryGender || product.jewelleryGender !== 'women')
  },
  {
    slug: ['new', 'all'],
    title: 'New · All',
    section: 'new',
    rule: (product) => product.isNew
  },
  {
    slug: ['new', 'bags'],
    title: 'New · Bags',
    section: 'new',
    allowedFilters: FAMILY_FILTERS.bags,
    rule: (product) => product.isNew && product.families.has('bags')
  },
  {
    slug: ['new', 'apparel'],
    title: 'New · Apparel',
    section: 'new',
    allowedFilters: FAMILY_FILTERS.apparel,
    rule: (product) => product.isNew && product.families.has('apparel')
  },
  {
    slug: ['new', 'shoes'],
    title: 'New · Shoes',
    section: 'new',
    allowedFilters: FAMILY_FILTERS.shoes,
    rule: (product) => product.isNew && product.families.has('shoes')
  },
  {
    slug: ['trending', 'bestsellers'],
    title: 'Trending · Bestsellers',
    section: 'trending',
    rule: (product) => product.trending.bestsellers
  },
  {
    slug: ['trending', 'most-wanted'],
    title: 'Trending · Most-Wanted',
    section: 'trending',
    rule: (product) => product.trending.mostWanted
  },
  {
    slug: ['trending', 'back-in'],
    title: 'Trending · Back-In',
    section: 'trending',
    rule: (product) => product.trending.backIn
  },
  {
    slug: ['sale'],
    title: 'Private Sale',
    section: 'sale',
    rule: (product) => product.isSale
  }
];

const buildCatalogDefinitions = (): CatalogDefinition[] => {
  const definitions = createGenderDefinitions();

  SIMPLE_DEFINITIONS.forEach(({ slug, title, section, allowedFilters, rule }) => {
    definitions.push({
      slug,
      title,
      section,
      allowedFilters: allowedFilters ?? CORE_FILTERS,
=======
interface GenderFamilyConfigEntry {
  slug: string[];
  title: string;
  predicate?: (product: NormalizedProduct) => boolean;
}

type GenderFamilyConfig = Partial<Record<Exclude<Family, 'jewellery'>, GenderFamilyConfigEntry[]>>;

const GENDER_COLLECTIONS: Record<'women' | 'men', { title: string; families: GenderFamilyConfig }> = {
  women: {
    title: 'Women',
    families: {
      bags: [
        { slug: [], title: 'Women · Bags' },
        { slug: ['day'], title: 'Women · Bags · Day', predicate: bagCategoryIs('day', 'work') },
        { slug: ['travel'], title: 'Women · Bags · Travel', predicate: bagCategoryIs('travel') },
        { slug: ['small'], title: 'Women · Bags · Small', predicate: bagCategoryIs('small') },
        { slug: ['evening'], title: 'Women · Bags · Evening', predicate: bagCategoryIs('evening') }
      ],
      apparel: [
        { slug: [], title: 'Women · Apparel' },
        { slug: ['tops'], title: 'Women · Apparel · Tops', predicate: categoryIs('apparelCategory', 'tops') },
        { slug: ['bottoms'], title: 'Women · Apparel · Bottoms', predicate: categoryIs('apparelCategory', 'bottoms') },
        { slug: ['outer'], title: 'Women · Apparel · Outer', predicate: categoryIs('apparelCategory', 'outer') },
        { slug: ['dresses'], title: 'Women · Apparel · Dresses', predicate: categoryIs('apparelCategory', 'dresses') }
      ],
      shoes: [
        { slug: [], title: 'Women · Shoes' },
        { slug: ['sneakers'], title: 'Women · Shoes · Sneakers', predicate: categoryIs('shoesCategory', 'sneakers') },
        { slug: ['boots'], title: 'Women · Shoes · Boots', predicate: categoryIs('shoesCategory', 'boots') },
        { slug: ['sandals'], title: 'Women · Shoes · Sandals', predicate: categoryIs('shoesCategory', 'sandals') },
        { slug: ['heels'], title: 'Women · Shoes · Heels', predicate: categoryIs('shoesCategory', 'heels') }
      ],
      accessories: [
        { slug: [], title: 'Women · Accessories' },
        { slug: ['belts'], title: 'Women · Accessories · Belts', predicate: categoryIs('accessoriesCategory', 'belts') },
        { slug: ['scarves'], title: 'Women · Accessories · Scarves', predicate: categoryIs('accessoriesCategory', 'scarves') },
        { slug: ['headwear'], title: 'Women · Accessories · Headwear', predicate: categoryIs('accessoriesCategory', 'headwear') },
        { slug: ['umbrellas'], title: 'Women · Accessories · Umbrellas', predicate: categoryIs('accessoriesCategory', 'umbrellas') }
      ]
    }
  },
  men: {
    title: 'Men',
    families: {
      bags: [
        { slug: [], title: 'Men · Bags' },
        { slug: ['day'], title: 'Men · Bags · Day', predicate: bagCategoryIs('day') },
        { slug: ['travel'], title: 'Men · Bags · Travel', predicate: bagCategoryIs('travel') },
        { slug: ['small'], title: 'Men · Bags · Small', predicate: bagCategoryIs('small') },
        { slug: ['work'], title: 'Men · Bags · Work', predicate: bagCategoryIs('work') }
      ],
      apparel: [
        { slug: [], title: 'Men · Apparel' },
        { slug: ['tops'], title: 'Men · Apparel · Tops', predicate: categoryIs('apparelCategory', 'tops') },
        { slug: ['bottoms'], title: 'Men · Apparel · Bottoms', predicate: categoryIs('apparelCategory', 'bottoms') },
        { slug: ['outer'], title: 'Men · Apparel · Outer', predicate: categoryIs('apparelCategory', 'outer') },
        { slug: ['lounge'], title: 'Men · Apparel · Lounge', predicate: categoryIs('apparelCategory', 'lounge') }
      ],
      shoes: [
        { slug: [], title: 'Men · Shoes' },
        { slug: ['sneakers'], title: 'Men · Shoes · Sneakers', predicate: categoryIs('shoesCategory', 'sneakers') },
        { slug: ['boots'], title: 'Men · Shoes · Boots', predicate: categoryIs('shoesCategory', 'boots') },
        { slug: ['sandals'], title: 'Men · Shoes · Sandals', predicate: categoryIs('shoesCategory', 'sandals') },
        { slug: ['formal'], title: 'Men · Shoes · Formal', predicate: categoryIs('shoesCategory', 'formal') }
      ],
      accessories: [
        { slug: [], title: 'Men · Accessories' },
        { slug: ['belts'], title: 'Men · Accessories · Belts', predicate: categoryIs('accessoriesCategory', 'belts') },
        { slug: ['scarves'], title: 'Men · Accessories · Scarves', predicate: categoryIs('accessoriesCategory', 'scarves') },
        { slug: ['headwear'], title: 'Men · Accessories · Headwear', predicate: categoryIs('accessoriesCategory', 'headwear') },
        { slug: ['umbrellas'], title: 'Men · Accessories · Umbrellas', predicate: categoryIs('accessoriesCategory', 'umbrellas') }
      ]
    }
  }
};

const buildCatalogDefinitions = (): CatalogDefinition[] => {
  const definitions: CatalogDefinition[] = [];
  const register = (definition: CatalogDefinition) => definitions.push(definition);

  const registerGender = (gender: 'women' | 'men') => {
    const config = GENDER_COLLECTIONS[gender];
    register({
      slug: [gender],
      title: config.title,
      section: gender,
      allowedFilters: filtersForFamily(),
      rule: (product) => matchesGender(product, gender)
    });

    Object.entries(config.families).forEach(([familyKey, entries]) => {
      const family = familyKey as Exclude<Family, 'jewellery'>;
      entries?.forEach((entry) => {
        register({
          slug: [gender, family, ...entry.slug],
          title: entry.title,
          section: gender,
          allowedFilters: filtersForFamily(family),
          rule: (product) =>
            matchesGender(product, gender) &&
            product.families.has(family) &&
            (!entry.predicate || entry.predicate(product))
        });
      });
    });
  };

  registerGender('women');
  registerGender('men');

  const simpleDefinitions: Array<{
    slug: string[];
    title: string;
    section: Department;
    filters?: FilterKey[];
    rule: (product: NormalizedProduct) => boolean;
  }> = [
    {
      slug: ['jewellery'],
      title: 'Jewellery',
      section: 'jewellery',
      filters: filtersForFamily('jewellery'),
      rule: (product) => product.families.has('jewellery')
    },
    {
      slug: ['jewellery', 'women'],
      title: 'Jewellery · Women',
      section: 'jewellery',
      filters: filtersForFamily('jewellery'),
      rule: (product) => product.families.has('jewellery') && (!product.jewelleryGender || product.jewelleryGender !== 'men')
    },
    {
      slug: ['jewellery', 'men'],
      title: 'Jewellery · Men',
      section: 'jewellery',
      filters: filtersForFamily('jewellery'),
      rule: (product) => product.families.has('jewellery') && (!product.jewelleryGender || product.jewelleryGender !== 'women')
    },
    {
      slug: ['new', 'all'],
      title: 'New · All',
      section: 'new',
      rule: (product) => product.isNew
    },
    {
      slug: ['new', 'bags'],
      title: 'New · Bags',
      section: 'new',
      filters: filtersForFamily('bags'),
      rule: (product) => product.isNew && product.families.has('bags')
    },
    {
      slug: ['new', 'apparel'],
      title: 'New · Apparel',
      section: 'new',
      filters: filtersForFamily('apparel'),
      rule: (product) => product.isNew && product.families.has('apparel')
    },
    {
      slug: ['new', 'shoes'],
      title: 'New · Shoes',
      section: 'new',
      filters: filtersForFamily('shoes'),
      rule: (product) => product.isNew && product.families.has('shoes')
    },
    {
      slug: ['trending', 'bestsellers'],
      title: 'Trending · Bestsellers',
      section: 'trending',
      rule: (product) => product.trending.bestsellers
    },
    {
      slug: ['trending', 'most-wanted'],
      title: 'Trending · Most-Wanted',
      section: 'trending',
      rule: (product) => product.trending.mostWanted
    },
    {
      slug: ['trending', 'back-in'],
      title: 'Trending · Back-In',
      section: 'trending',
      rule: (product) => product.trending.backIn
    },
    {
      slug: ['sale'],
      title: 'Private Sale',
      section: 'sale',
      rule: (product) => product.isSale
    }
  ];

  simpleDefinitions.forEach(({ slug, title, section, filters, rule }) => {
    register({
      slug,
      title,
      section,
      allowedFilters: filters ?? filtersForFamily(),
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
      rule
    });
  });

  return definitions;
};

const CATALOG_DEFINITIONS = buildCatalogDefinitions();

export const listCatalogDefinitions = () => [...CATALOG_DEFINITIONS];

export const getCatalogDefinition = (slug: string[]): CatalogDefinition | undefined =>
  CATALOG_DEFINITIONS.find((definition) => definition.slug.join('/') === slug.join('/'));
=======
const catalogDefinitions: CatalogDefinition[] = [];

const registerDefinition = (definition: CatalogDefinition) => {
  catalogDefinitions.push(definition);
};

const matchesGender = (product: NormalizedProduct, gender: 'women' | 'men') => {
  if (gender === 'women') {
    return product.gender === 'women' || product.gender === 'unisex';
  }
  return product.gender === 'men' || product.gender === 'unisex';
};

const registerGenderFamily = (
  gender: 'women' | 'men',
  family: Family,
  slugTail: string[],
  title: string,
  predicate?: (product: NormalizedProduct) => boolean
) => {
  registerDefinition({
    slug: [gender, family, ...slugTail],
    title,
    section: gender,
    allowedFilters: filtersForFamily(family),
    rule: (product) =>
      matchesGender(product, gender) &&
      product.families.has(family) &&
      (!predicate || predicate(product))
  });
};

// Women definitions
registerDefinition({
  slug: ['women'],
  title: 'Women',
  section: 'women',
  allowedFilters: filtersForFamily(),
  rule: (product) => matchesGender(product, 'women')
});

registerGenderFamily('women', 'bags', [], 'Women · Bags');
registerGenderFamily(
  'women',
  'bags',
  ['day'],
  'Women · Bags · Day',
  (product) => product.bagCategory === 'day' || product.bagCategory === 'work'
);
registerGenderFamily('women', 'bags', ['travel'], 'Women · Bags · Travel', (product) => product.bagCategory === 'travel');
registerGenderFamily('women', 'bags', ['small'], 'Women · Bags · Small', (product) => product.bagCategory === 'small');
registerGenderFamily('women', 'bags', ['evening'], 'Women · Bags · Evening', (product) => product.bagCategory === 'evening');

registerGenderFamily('women', 'apparel', [], 'Women · Apparel');
registerGenderFamily('women', 'apparel', ['tops'], 'Women · Apparel · Tops', (product) => product.apparelCategory === 'tops');
registerGenderFamily('women', 'apparel', ['bottoms'], 'Women · Apparel · Bottoms', (product) => product.apparelCategory === 'bottoms');
registerGenderFamily('women', 'apparel', ['outer'], 'Women · Apparel · Outer', (product) => product.apparelCategory === 'outer');
registerGenderFamily('women', 'apparel', ['dresses'], 'Women · Apparel · Dresses', (product) => product.apparelCategory === 'dresses');

registerGenderFamily('women', 'shoes', [], 'Women · Shoes');
registerGenderFamily('women', 'shoes', ['sneakers'], 'Women · Shoes · Sneakers', (product) => product.shoesCategory === 'sneakers');
registerGenderFamily('women', 'shoes', ['boots'], 'Women · Shoes · Boots', (product) => product.shoesCategory === 'boots');
registerGenderFamily('women', 'shoes', ['sandals'], 'Women · Shoes · Sandals', (product) => product.shoesCategory === 'sandals');
registerGenderFamily('women', 'shoes', ['heels'], 'Women · Shoes · Heels', (product) => product.shoesCategory === 'heels');

registerGenderFamily('women', 'accessories', [], 'Women · Accessories');
registerGenderFamily('women', 'accessories', ['belts'], 'Women · Accessories · Belts', (product) => product.accessoriesCategory === 'belts');
registerGenderFamily('women', 'accessories', ['scarves'], 'Women · Accessories · Scarves', (product) => product.accessoriesCategory === 'scarves');
registerGenderFamily('women', 'accessories', ['headwear'], 'Women · Accessories · Headwear', (product) => product.accessoriesCategory === 'headwear');
registerGenderFamily('women', 'accessories', ['umbrellas'], 'Women · Accessories · Umbrellas', (product) => product.accessoriesCategory === 'umbrellas');

// Men definitions
registerDefinition({
  slug: ['men'],
  title: 'Men',
  section: 'men',
  allowedFilters: filtersForFamily(),
  rule: (product) => matchesGender(product, 'men')
});

registerGenderFamily('men', 'bags', [], 'Men · Bags');
registerGenderFamily('men', 'bags', ['day'], 'Men · Bags · Day', (product) => product.bagCategory === 'day');
registerGenderFamily('men', 'bags', ['travel'], 'Men · Bags · Travel', (product) => product.bagCategory === 'travel');
registerGenderFamily('men', 'bags', ['small'], 'Men · Bags · Small', (product) => product.bagCategory === 'small');
registerGenderFamily('men', 'bags', ['work'], 'Men · Bags · Work', (product) => product.bagCategory === 'work');

registerGenderFamily('men', 'apparel', [], 'Men · Apparel');
registerGenderFamily('men', 'apparel', ['tops'], 'Men · Apparel · Tops', (product) => product.apparelCategory === 'tops');
registerGenderFamily('men', 'apparel', ['bottoms'], 'Men · Apparel · Bottoms', (product) => product.apparelCategory === 'bottoms');
registerGenderFamily('men', 'apparel', ['outer'], 'Men · Apparel · Outer', (product) => product.apparelCategory === 'outer');
registerGenderFamily('men', 'apparel', ['lounge'], 'Men · Apparel · Lounge', (product) => product.apparelCategory === 'lounge');

registerGenderFamily('men', 'shoes', [], 'Men · Shoes');
registerGenderFamily('men', 'shoes', ['sneakers'], 'Men · Shoes · Sneakers', (product) => product.shoesCategory === 'sneakers');
registerGenderFamily('men', 'shoes', ['boots'], 'Men · Shoes · Boots', (product) => product.shoesCategory === 'boots');
registerGenderFamily('men', 'shoes', ['sandals'], 'Men · Shoes · Sandals', (product) => product.shoesCategory === 'sandals');
registerGenderFamily('men', 'shoes', ['formal'], 'Men · Shoes · Formal', (product) => product.shoesCategory === 'formal');

registerGenderFamily('men', 'accessories', [], 'Men · Accessories');
registerGenderFamily('men', 'accessories', ['belts'], 'Men · Accessories · Belts', (product) => product.accessoriesCategory === 'belts');
registerGenderFamily('men', 'accessories', ['scarves'], 'Men · Accessories · Scarves', (product) => product.accessoriesCategory === 'scarves');
registerGenderFamily('men', 'accessories', ['headwear'], 'Men · Accessories · Headwear', (product) => product.accessoriesCategory === 'headwear');
registerGenderFamily('men', 'accessories', ['umbrellas'], 'Men · Accessories · Umbrellas', (product) => product.accessoriesCategory === 'umbrellas');

// Jewellery
registerDefinition({
  slug: ['jewellery'],
  title: 'Jewellery',
  section: 'jewellery',
  allowedFilters: ['material', 'color', 'price'],
  rule: (product) => product.families.has('jewellery')
});

registerDefinition({
  slug: ['jewellery', 'women'],
  title: 'Jewellery · Women',
  section: 'jewellery',
  allowedFilters: ['material', 'color', 'price'],
  rule: (product) => product.families.has('jewellery') && (product.jewelleryGender === 'women' || product.jewelleryGender === 'unisex')
});

registerDefinition({
  slug: ['jewellery', 'men'],
  title: 'Jewellery · Men',
  section: 'jewellery',
  allowedFilters: ['material', 'color', 'price'],
  rule: (product) => product.families.has('jewellery') && (product.jewelleryGender === 'men' || product.jewelleryGender === 'unisex')
});

// New collections
registerDefinition({
  slug: ['new', 'all'],
  title: 'New · All',
  section: 'new',
  allowedFilters: filtersForFamily(),
  rule: (product) => product.isNew
});

registerDefinition({
  slug: ['new', 'bags'],
  title: 'New · Bags',
  section: 'new',
  allowedFilters: filtersForFamily('bags'),
  rule: (product) => product.isNew && product.families.has('bags')
});

registerDefinition({
  slug: ['new', 'apparel'],
  title: 'New · Apparel',
  section: 'new',
  allowedFilters: filtersForFamily('apparel'),
  rule: (product) => product.isNew && product.families.has('apparel')
});

registerDefinition({
  slug: ['new', 'shoes'],
  title: 'New · Shoes',
  section: 'new',
  allowedFilters: filtersForFamily('shoes'),
  rule: (product) => product.isNew && product.families.has('shoes')
});

// Trending collections
registerDefinition({
  slug: ['trending', 'bestsellers'],
  title: 'Trending · Bestsellers',
  section: 'trending',
  allowedFilters: filtersForFamily(),
  rule: (product) => product.trending.bestsellers
});

registerDefinition({
  slug: ['trending', 'most-wanted'],
  title: 'Trending · Most-Wanted',
  section: 'trending',
  allowedFilters: filtersForFamily(),
  rule: (product) => product.trending.mostWanted
});

registerDefinition({
  slug: ['trending', 'back-in'],
  title: 'Trending · Back-In',
  section: 'trending',
  allowedFilters: filtersForFamily(),
  rule: (product) => product.trending.backIn
});

// Sale
registerDefinition({
  slug: ['sale'],
  title: 'Private Sale',
  section: 'sale',
  allowedFilters: filtersForFamily(),
  rule: (product) => product.isSale
});

export const listCatalogDefinitions = () => [...catalogDefinitions];

export const getCatalogDefinition = (slug: string[]): CatalogDefinition | undefined => {
  const key = slug.join('/');
  return catalogDefinitions.find((definition) => definition.slug.join('/') === key);
};
>>>>>>> origin/main

export const productsForSlug = (
  products: ShopifyProduct[],
  slug: string[]
): { definition: CatalogDefinition; items: NormalizedProduct[] } | null => {
  const definition = getCatalogDefinition(slug);
  if (!definition) {
    return null;
  }
  const normalized = normalizeProducts(products);
<<<<<<< HEAD
  return { definition, items: normalized.filter((product) => definition.rule(product)) };
=======
  const items = normalized.filter((product) => definition.rule(product));
  return { definition, items };
>>>>>>> origin/main
};

export const breadcrumbsForSlug = (slug: string[]) => {
  const crumbs: Array<{ href: string; label: string }> = [{ href: '/', label: 'Home' }];
  const segments: string[] = [];
  slug.forEach((segment) => {
    segments.push(segment);
    const definition = getCatalogDefinition([...segments]);
    if (definition) {
      crumbs.push({ href: `/${segments.join('/')}`, label: definition.title });
    }
  });
  return crumbs;
};

<<<<<<< HEAD
export const allCollectionSlugs = () => CATALOG_DEFINITIONS.map((definition) => definition.slug);
=======
export const allCollectionSlugs = () => catalogDefinitions.map((definition) => definition.slug);
>>>>>>> origin/main

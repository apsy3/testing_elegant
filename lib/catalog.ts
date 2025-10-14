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
  [/cross-body/g, 'crossbody'],
  [/carry on/g, 'carry-on']
];

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

const normaliseText = (value: string) =>
  NORMALISERS.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), value.toLowerCase());

const addAttribute = (attributes: Record<string, string[]>, key: string, value: string) => {
  const bucket = (attributes[key] ??= []);
  if (!bucket.includes(value)) {
    bucket.push(value);
  }
};

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

const inferGender = (tags: Set<string>): 'women' | 'men' | 'unisex' => {
  if (tags.has('gender:women')) return 'women';
  if (tags.has('gender:men')) return 'men';
  if (tags.has('gender:unisex')) return 'unisex';
  return 'unisex';
};

const inferFamilies = (tags: Set<string>): Set<Family> => {
  const families = new Set<Family>();
  tags.forEach((tag) => {
    if (tag.startsWith('department:')) {
      const [, value] = tag.split(':');
      if (value && value in FAMILY_LABELS) {
        families.add(value as Family);
      }
    }
  });
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

export const normalizeProducts = (products: ShopifyProduct[]): NormalizedProduct[] => {
  const now = Date.now();
  return products.map((product) => {
    const normalizedTitle = normaliseText(product.title);
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

    const jewelleryGender = families.has('jewellery')
      ? tagSet.has('gender:women')
        ? 'women'
        : tagSet.has('gender:men')
          ? 'men'
          : 'unisex'
      : undefined;

    const isNew = tagSet.has('new') || now - createdAtDate.getTime() <= THIRTY_DAYS;
    const trending = {
      bestsellers: tagSet.has('bestseller'),
      mostWanted: tagSet.has('most-wanted') || tagSet.has('mostwanted'),
      backIn: tagSet.has('back-in') || now - createdAtDate.getTime() <= FOURTEEN_DAYS
    } as const;

    const normalizedProduct: NormalizedProduct = {
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
      isSale: tagSet.has('sale')
    };

    ensureFamilyPresence(normalizedProduct);

    return normalizedProduct;
  });
};

const matchesGender = (gender: 'women' | 'men') => (product: NormalizedProduct) =>
  gender === 'women'
    ? product.gender === 'women' || product.gender === 'unisex'
    : product.gender === 'men' || product.gender === 'unisex';

const belongsToFamily = (family: Exclude<Family, 'jewellery'>) => (product: NormalizedProduct) =>
  product.families.has(family);

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
      rule
    });
  });

  return definitions;
};

const CATALOG_DEFINITIONS = buildCatalogDefinitions();

export const listCatalogDefinitions = () => [...CATALOG_DEFINITIONS];

export const getCatalogDefinition = (slug: string[]): CatalogDefinition | undefined =>
  CATALOG_DEFINITIONS.find((definition) => definition.slug.join('/') === slug.join('/'));

export const productsForSlug = (
  products: ShopifyProduct[],
  slug: string[]
): { definition: CatalogDefinition; items: NormalizedProduct[] } | null => {
  const definition = getCatalogDefinition(slug);
  if (!definition) {
    return null;
  }
  const normalized = normalizeProducts(products);
  return { definition, items: normalized.filter((product) => definition.rule(product)) };
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

export const allCollectionSlugs = () => CATALOG_DEFINITIONS.map((definition) => definition.slug);

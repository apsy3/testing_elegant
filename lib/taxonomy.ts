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
  normalizedText: string;
  attributes: Record<string, string[]>;
  gender: 'women' | 'men' | 'unisex';
  families: Set<Family>;
  occasions: Set<Occasion>;
  bagCategory?: 'day' | 'travel' | 'small' | 'evening' | 'work';
  apparelCategory?: 'tops' | 'bottoms' | 'outer' | 'dresses' | 'lounge';
  shoesCategory?: 'sneakers' | 'boots' | 'sandals' | 'heels' | 'formal';
  accessoriesCategory?: 'belts' | 'scarves' | 'headwear' | 'umbrellas';
  jewelleryGender?: 'women' | 'men' | 'unisex';
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
  subtitle?: string;
  family?: Family;
  allowedFilters: FilterKey[];
  rule: (product: NormalizedProduct) => boolean;
}

export interface CatalogCollection extends CatalogDefinition {
  products: NormalizedProduct[];
}

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

const TEXT_NORMALIZATIONS: Array<[RegExp, string]> = [
  [/cross-body/g, 'crossbody'],
  [/carry on/g, 'carry-on']
];

const CORE_FILTERS: FilterKey[] = ['material', 'color', 'size', 'price', 'occasion'];
const BAG_FILTERS: FilterKey[] = ['capacity', 'device-fit', 'waterproof', 'wheels'];
const SHOES_FILTERS: FilterKey[] = ['width', 'closure', 'heel-height'];
const APPAREL_FILTERS: FilterKey[] = ['fit', 'length', 'fabric', 'season'];

const filterSet = (family?: Family) => {
  if (!family) return CORE_FILTERS;
  switch (family) {
    case 'bags':
      return [...CORE_FILTERS, ...BAG_FILTERS];
    case 'shoes':
      return [...CORE_FILTERS, ...SHOES_FILTERS];
    case 'apparel':
      return [...CORE_FILTERS, ...APPAREL_FILTERS];
    case 'accessories':
      return [...CORE_FILTERS];
    case 'jewellery':
      return ['material', 'color', 'price'];
    default:
      return CORE_FILTERS;
  }
};

const normalizeText = (value: string) => {
  let output = value.toLowerCase();
  TEXT_NORMALIZATIONS.forEach(([pattern, replacement]) => {
    output = output.replace(pattern, replacement);
  });
  return output;
};

const keywordMatch = (text: string, keywords: readonly string[]) =>
  keywords.some((keyword) => text.includes(keyword));

const pushAttribute = (attributes: Record<string, string[]>, key: string, value: string) => {
  if (!attributes[key]) {
    attributes[key] = [];
  }
  if (!attributes[key].includes(value)) {
    attributes[key].push(value);
  }
};

const parseAttributesFromTags = (tags: string[]) => {
  const attributes: Record<string, string[]> = {};
  tags.forEach((tag) => {
    const [rawKey, rawValue] = tag.split(':');
    if (rawValue) {
      const key = rawKey.toLowerCase();
      const value = rawValue.toLowerCase();
      pushAttribute(attributes, key, value);
    }
  });
  return attributes;
};

const determineGender = (attributes: Record<string, string[]>, text: string): 'women' | 'men' | 'unisex' => {
  if (attributes.gender?.includes('unisex')) {
    return 'unisex';
  }
  if (attributes.gender?.includes('men') || /men\b|his\b/.test(text)) {
    return 'men';
  }
  if (attributes.gender?.includes('women') || /women\b|her\b/.test(text)) {
    return 'women';
  }
  return 'women';
};

const hasDepartment = (attributes: Record<string, string[]>, department: Family) =>
  attributes.department?.includes(department) ?? false;

const determineBagCategory = (
  product: ShopifyProduct,
  text: string,
  attributes: Record<string, string[]>
) => {
  if (!hasDepartment(attributes, 'bags')) return undefined;
  if (attributes.occasion?.includes('travel') || keywordMatch(text, BAG_KEYWORDS.travel)) {
    return 'travel';
  }
  if (attributes.gender?.includes('men') && keywordMatch(text, BAG_KEYWORDS.work)) {
    return 'work';
  }
  if (attributes.occasion?.includes('evening') || keywordMatch(text, BAG_KEYWORDS.evening)) {
    return 'evening';
  }
  if (product.tags.includes('small') || keywordMatch(text, BAG_KEYWORDS.small)) {
    return 'small';
  }
  if (attributes.occasion?.includes('work') || keywordMatch(text, BAG_KEYWORDS.work)) {
    return 'work';
  }
  return 'day';
};

const determineApparelCategory = (
  product: ShopifyProduct,
  text: string,
  attributes: Record<string, string[]>
) => {
  if (!hasDepartment(attributes, 'apparel')) return undefined;
  if (attributes.apparel?.includes('outer') || keywordMatch(text, APPAREL_KEYWORDS.outer)) {
    return 'outer';
  }
  if (attributes.apparel?.includes('dresses') || keywordMatch(text, APPAREL_KEYWORDS.dresses)) {
    return 'dresses';
  }
  if (attributes.apparel?.includes('lounge') || keywordMatch(text, APPAREL_KEYWORDS.lounge)) {
    return 'lounge';
  }
  if (keywordMatch(text, APPAREL_KEYWORDS.bottoms)) {
    return 'bottoms';
  }
  if (keywordMatch(text, APPAREL_KEYWORDS.tops)) {
    return 'tops';
  }
  if (attributes.apparel?.includes('bottoms')) {
    return 'bottoms';
  }
  if (attributes.apparel?.includes('tops')) {
    return 'tops';
  }
  return 'tops';
};

const determineShoesCategory = (
  product: ShopifyProduct,
  text: string,
  attributes: Record<string, string[]>
) => {
  if (!hasDepartment(attributes, 'shoes')) return undefined;
  if (attributes.shoes?.includes('heels') || keywordMatch(text, SHOES_KEYWORDS.heels)) {
    return 'heels';
  }
  if (keywordMatch(text, SHOES_KEYWORDS.sneakers)) {
    return 'sneakers';
  }
  if (keywordMatch(text, SHOES_KEYWORDS.boots)) {
    return 'boots';
  }
  if (keywordMatch(text, SHOES_KEYWORDS.sandals)) {
    return 'sandals';
  }
  if (keywordMatch(text, SHOES_KEYWORDS.formal)) {
    return 'formal';
  }
  if (attributes.shoes?.includes('formal')) {
    return 'formal';
  }
  return 'sneakers';
};

const determineAccessoriesCategory = (
  product: ShopifyProduct,
  text: string,
  attributes: Record<string, string[]>
) => {
  if (!hasDepartment(attributes, 'accessories')) return undefined;
  if (attributes.accessories?.includes('belts') || keywordMatch(text, ACCESSORY_KEYWORDS.belts)) {
    return 'belts';
  }
  if (attributes.accessories?.includes('scarves') || keywordMatch(text, ACCESSORY_KEYWORDS.scarves)) {
    return 'scarves';
  }
  if (attributes.accessories?.includes('headwear') || keywordMatch(text, ACCESSORY_KEYWORDS.headwear)) {
    return 'headwear';
  }
  if (attributes.accessories?.includes('umbrellas') || keywordMatch(text, ACCESSORY_KEYWORDS.umbrellas)) {
    return 'umbrellas';
  }
  return 'scarves';
};

const determineJewelleryGender = (attributes: Record<string, string[]>, gender: 'women' | 'men' | 'unisex') => {
  if (gender === 'unisex') return 'unisex';
  if (attributes.gender?.includes('men')) return 'men';
  if (attributes.gender?.includes('women')) return 'women';
  return gender;
};

const inferOccasions = (attributes: Record<string, string[]>, bagCategory?: NormalizedProduct['bagCategory']) => {
  const occasions: Set<Occasion> = new Set();
  attributes.occasion?.forEach((value) => {
    if (['day', 'work', 'evening', 'travel'].includes(value)) {
      occasions.add(value as Occasion);
    }
  });
  if (bagCategory) {
    if (bagCategory === 'travel') occasions.add('travel');
    if (bagCategory === 'work') occasions.add('work');
    if (bagCategory === 'evening') occasions.add('evening');
    if (bagCategory === 'day' || bagCategory === 'small') occasions.add('day');
  }
  return occasions;
};

const inferFamilies = (attributes: Record<string, string[]>) => {
  const families: Set<Family> = new Set();
  (attributes.department ?? []).forEach((value) => {
    if (value === 'bags' || value === 'apparel' || value === 'shoes' || value === 'accessories' || value === 'jewellery') {
      families.add(value);
    }
  });
  return families;
};

export const normalizeProducts = (products: ShopifyProduct[]): NormalizedProduct[] => {
  return products.map((product) => {
    const tags = product.tags ?? [];
    const normalizedText = normalizeText(`${product.title} ${product.description} ${tags.join(' ')}`);
    const attributes = parseAttributesFromTags(tags);
    const gender = determineGender(attributes, normalizedText);
    const bagCategory = determineBagCategory(product, normalizedText, attributes);
    const apparelCategory = determineApparelCategory(product, normalizedText, attributes);
    const shoesCategory = determineShoesCategory(product, normalizedText, attributes);
    const accessoriesCategory = determineAccessoriesCategory(product, normalizedText, attributes);
    const jewelleryGender = determineJewelleryGender(attributes, gender);
    const occasions = inferOccasions(attributes, bagCategory);
    const families = inferFamilies(attributes);

    const createdAt = new Date(product.createdAt);
    const now = new Date();
    const daysSinceCreated = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const isNew = daysSinceCreated <= 30 || tags.includes('new');
    const trending = {
      bestsellers: tags.includes('bestseller'),
      mostWanted: tags.includes('most-wanted'),
      backIn: tags.includes('back-in')
    };
    const isSale = tags.includes('sale');

    return {
      ...product,
      normalizedText,
      attributes,
      gender,
      bagCategory,
      apparelCategory,
      shoesCategory,
      accessoriesCategory,
      jewelleryGender,
      occasions,
      families,
      isNew,
      trending,
      isSale
    };
  });
};

const matchGender = (product: NormalizedProduct, gender: 'women' | 'men') =>
  product.gender === gender || product.gender === 'unisex';

const isFamily = (product: NormalizedProduct, family: Family) => product.families.has(family);

const catalogDefinitions: CatalogDefinition[] = [];

const registerDefinition = (definition: CatalogDefinition) => {
  catalogDefinitions.push(definition);
};

const createDepartmentCollections = (department: 'women' | 'men') => {
  const bagKeys = department === 'women' ? ['day', 'travel', 'small', 'evening'] : ['day', 'travel', 'small', 'work'];
  const apparelKeys = department === 'women' ? ['tops', 'bottoms', 'outer', 'dresses'] : ['tops', 'bottoms', 'outer', 'lounge'];
  const shoeKeys = department === 'women' ? ['sneakers', 'boots', 'sandals', 'heels'] : ['sneakers', 'boots', 'sandals', 'formal'];
  const accessoryKeys = ['belts', 'scarves', 'headwear', 'umbrellas'];

  registerDefinition({
    slug: [department],
    title: department === 'women' ? 'Women' : 'Men',
    section: department,
    allowedFilters: filterSet(),
    rule: (product) => matchGender(product, department)
  });

  registerDefinition({
    slug: [department, 'bags'],
    title: 'Bags',
    section: department,
    family: 'bags',
    allowedFilters: filterSet('bags'),
    rule: (product) => matchGender(product, department) && isFamily(product, 'bags')
  });

  bagKeys.forEach((key) => {
    registerDefinition({
      slug: [department, 'bags', key],
      title: key === 'small' ? 'Small Bags' : key.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      section: department,
      family: 'bags',
      allowedFilters: filterSet('bags'),
      rule: (product) =>
        matchGender(product, department) &&
        isFamily(product, 'bags') &&
        product.bagCategory === (key as NormalizedProduct['bagCategory'])
    });
  });

  registerDefinition({
    slug: [department, 'apparel'],
    title: 'Apparel',
    section: department,
    family: 'apparel',
    allowedFilters: filterSet('apparel'),
    rule: (product) => matchGender(product, department) && isFamily(product, 'apparel')
  });

  apparelKeys.forEach((key) => {
    registerDefinition({
      slug: [department, 'apparel', key],
      title: key.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      section: department,
      family: 'apparel',
      allowedFilters: filterSet('apparel'),
      rule: (product) => matchGender(product, department) && product.apparelCategory === key
    });
  });

  registerDefinition({
    slug: [department, 'shoes'],
    title: 'Shoes',
    section: department,
    family: 'shoes',
    allowedFilters: filterSet('shoes'),
    rule: (product) => matchGender(product, department) && isFamily(product, 'shoes')
  });

  shoeKeys.forEach((key) => {
    registerDefinition({
      slug: [department, 'shoes', key],
      title: key.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      section: department,
      family: 'shoes',
      allowedFilters: filterSet('shoes'),
      rule: (product) => matchGender(product, department) && product.shoesCategory === key
    });
  });

  registerDefinition({
    slug: [department, 'accessories'],
    title: 'Accessories',
    section: department,
    family: 'accessories',
    allowedFilters: filterSet('accessories'),
    rule: (product) => matchGender(product, department) && isFamily(product, 'accessories')
  });

  accessoryKeys.forEach((key) => {
    registerDefinition({
      slug: [department, 'accessories', key],
      title: key.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      section: department,
      family: 'accessories',
      allowedFilters: filterSet('accessories'),
      rule: (product) => matchGender(product, department) && product.accessoriesCategory === key
    });
  });
};

createDepartmentCollections('women');
createDepartmentCollections('men');

registerDefinition({
  slug: ['jewellery'],
  title: 'Jewellery',
  section: 'jewellery',
  family: 'jewellery',
  allowedFilters: filterSet('jewellery'),
  rule: (product) => product.families.has('jewellery')
});

registerDefinition({
  slug: ['jewellery', 'women'],
  title: 'Women',
  section: 'jewellery',
  family: 'jewellery',
  allowedFilters: filterSet('jewellery'),
  rule: (product) => product.families.has('jewellery') && product.jewelleryGender !== 'men'
});

registerDefinition({
  slug: ['jewellery', 'men'],
  title: 'Men',
  section: 'jewellery',
  family: 'jewellery',
  allowedFilters: filterSet('jewellery'),
  rule: (product) => product.families.has('jewellery') && product.jewelleryGender !== 'women'
});

registerDefinition({
  slug: ['new', 'all'],
  title: 'New Arrivals',
  section: 'new',
  allowedFilters: filterSet(),
  rule: (product) => product.isNew
});

registerDefinition({
  slug: ['new', 'bags'],
  title: 'New Bags',
  section: 'new',
  family: 'bags',
  allowedFilters: filterSet('bags'),
  rule: (product) => product.isNew && product.families.has('bags')
});

registerDefinition({
  slug: ['new', 'apparel'],
  title: 'New Apparel',
  section: 'new',
  family: 'apparel',
  allowedFilters: filterSet('apparel'),
  rule: (product) => product.isNew && product.families.has('apparel')
});

registerDefinition({
  slug: ['new', 'shoes'],
  title: 'New Shoes',
  section: 'new',
  family: 'shoes',
  allowedFilters: filterSet('shoes'),
  rule: (product) => product.isNew && product.families.has('shoes')
});

registerDefinition({
  slug: ['trending', 'bestsellers'],
  title: 'Bestsellers',
  section: 'trending',
  allowedFilters: filterSet(),
  rule: (product) => product.trending.bestsellers
});

registerDefinition({
  slug: ['trending', 'most-wanted'],
  title: 'Most-Wanted',
  section: 'trending',
  allowedFilters: filterSet(),
  rule: (product) => product.trending.mostWanted
});

registerDefinition({
  slug: ['trending', 'back-in'],
  title: 'Back-In',
  section: 'trending',
  allowedFilters: filterSet(),
  rule: (product) => product.trending.backIn
});

registerDefinition({
  slug: ['sale'],
  title: 'Sale',
  section: 'sale',
  allowedFilters: filterSet(),
  rule: (product) => product.isSale
});

export const getCatalogDefinition = (slug: string[]): CatalogDefinition | undefined => {
  const key = slug.join('/');
  return catalogDefinitions.find((definition) => definition.slug.join('/') === key);
};

export const listCatalogDefinitions = () => [...catalogDefinitions];

export const buildCatalogCollections = (products: ShopifyProduct[]): CatalogCollection[] => {
  const normalized = normalizeProducts(products);
  return catalogDefinitions.map((definition) => ({
    ...definition,
    products: normalized.filter((product) => definition.rule(product))
  }));
};

export const productsForSlug = (
  products: ShopifyProduct[],
  slug: string[]
): { definition: CatalogDefinition; items: NormalizedProduct[] } | null => {
  const definition = getCatalogDefinition(slug);
  if (!definition) {
    return null;
  }
  const normalized = normalizeProducts(products);
  const items = normalized.filter((product) => definition.rule(product));
  return { definition, items };
};

export const breadcrumbsForSlug = (slug: string[]): Array<{ href: string; label: string }> => {
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

export const allCollectionSlugs = () => catalogDefinitions.map((definition) => definition.slug);

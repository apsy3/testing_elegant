export type SortKey = 'relevance' | 'new' | 'price';
export type SortDir = 'asc' | 'desc';
export interface SortSpec {
  key: SortKey;
  dir: SortDir;
}
export type Filters = Record<string, string[]>;

export interface BasicItem {
  id?: string | number;
  title?: string;
  price?: number;
  createdAt?: string | Date;
  tags?: string[];
}

export function parseQuery(searchParams: URLSearchParams): string {
  return (searchParams.get('q') || '').trim();
}

export function parseSort(searchParams: URLSearchParams): SortSpec {
  const raw = (searchParams.get('sort') || 'relevance').toLowerCase();
  const key: SortKey = raw.startsWith('price')
    ? 'price'
    : raw.startsWith('new')
      ? 'new'
      : 'relevance';
  const dir: SortDir = raw.endsWith('_desc') ? 'desc' : 'asc';
  return { key, dir };
}

export function parseFiltersFromSearchParams(searchParams: URLSearchParams): Filters {
  const out: Filters = {};
  for (const [k, v] of searchParams.entries()) {
    if (!k.startsWith('f.')) continue;
    const key = k.slice(2);
    const values = v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (values.length) {
      out[key] = values;
    }
  }
  return out;
}

export function applyFilters<T extends BasicItem>(
  items: T[],
  opts: { query?: string; filters?: Filters; sort?: SortSpec }
): T[] {
  const q = (opts.query || '').toLowerCase();
  const filters = opts.filters || {};
  const sort = opts.sort || { key: 'relevance', dir: 'asc' };

  const filtered = items.filter((item) => {
    const hay = `${item.title || ''}`.toLowerCase();
    if (q && !hay.includes(q)) {
      return false;
    }

    for (const [fk, fvals] of Object.entries(filters)) {
      if (!fvals.length) continue;
      const tags = item.tags || [];
      const ok = fvals.some((val) => {
        const expect = `${fk}:${val}`.toLowerCase();
        return tags.some((t) => {
          const tt = t.toLowerCase();
          return tt === expect || tt === val.toLowerCase();
        });
      });
      if (!ok) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort.key === 'price') {
      const pa = a.price ?? 0;
      const pb = b.price ?? 0;
      return sort.dir === 'asc' ? pa - pb : pb - pa;
    }
    if (sort.key === 'new') {
      const da = +new Date(a.createdAt || 0);
      const db = +new Date(b.createdAt || 0);
      return sort.dir === 'asc' ? da - db : db - da;
    }
    return 0;
  });

  return sorted;
}

export function buildFilterGroups<T extends { tags?: string[] }>(
  items: T[]
): { key: string; options: { value: string; count: number }[] }[] {
  const tally: Record<string, Record<string, number>> = {};
  for (const it of items) {
    for (const tag of it.tags || []) {
      const [key, value] = tag.split(':');
      if (!value) continue;
      tally[key] ??= {};
      tally[key][value] = (tally[key][value] || 0) + 1;
    }
  }
  return Object.entries(tally).map(([key, map]) => ({
    key,
    options: Object.entries(map)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value))
  }));
}

'use client';

<<<<<<< HEAD
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FunnelIcon } from '@heroicons/react/24/outline';
import type { Filters, SortSpec } from '@/lib/search';

export interface FilterGroupOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterGroupOption[];
}

interface CatalogFiltersProps {
  groups: FilterGroup[];
  initialQuery?: string;
  initialSort?: SortSpec;
  activeFilters: Filters;
}

const SORT_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'new_desc', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'new_asc', label: 'Oldest' },
  { value: 'relevance', label: 'Recommended' }
];

const encodeSort = (spec?: SortSpec): string => {
  if (!spec) return 'new_desc';
  if (spec.key === 'price' && spec.dir === 'asc') return 'price_asc';
  if (spec.key === 'price' && spec.dir === 'desc') return 'price_desc';
  if (spec.key === 'new' && spec.dir === 'asc') return 'new_asc';
  if (spec.key === 'new' && spec.dir === 'desc') return 'new_desc';
  return 'relevance';
};

export default function CatalogFilters({
  groups,
  initialQuery = '',
  initialSort,
  activeFilters
}: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [sortValue, setSortValue] = useState<string>(encodeSort(initialSort));
  const [selectedFilters, setSelectedFilters] = useState<Filters>(activeFilters);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();
  const lastSync = useRef({
    query: initialQuery,
    sortValue: encodeSort(initialSort),
    filters: activeFilters
  });

  useEffect(() => {
    setQuery(initialQuery);
    setSortValue(encodeSort(initialSort));
    setSelectedFilters(activeFilters);
    lastSync.current = {
      query: initialQuery,
      sortValue: encodeSort(initialSort),
      filters: activeFilters
    };
  }, [initialQuery, initialSort, activeFilters]);

  const toggleFilter = (key: string, value: string) => {
    setSelectedFilters((current) => {
      const values = new Set(current[key] ?? []);
      if (values.has(value)) {
        values.delete(value);
      } else {
        values.add(value);
      }
      return {
        ...current,
        [key]: Array.from(values)
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const buildSearchParams = () => {
    const params = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values && values.length) {
        params.set(`f.${key}`, values.join(','));
      }
    });
    if (query.trim()) {
      params.set('q', query.trim());
    }
    if (sortValue && sortValue !== 'new_desc') {
      params.set('sort', sortValue);
    }
    return params;
  };

  useEffect(() => {
    const { query: lastQuery, sortValue: lastSort, filters: lastFilters } = lastSync.current;
    const sameQuery = lastQuery === query;
    const sameSort = lastSort === sortValue;
    const sameFilters = JSON.stringify(lastFilters) === JSON.stringify(selectedFilters);
    if (sameQuery && sameSort && sameFilters) {
      return;
    }

    const handler = setTimeout(() => {
      lastSync.current = { query, sortValue, filters: selectedFilters };
      const params = buildSearchParams();
      const queryString = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`);
      });
    }, 200);

    return () => clearTimeout(handler);
  }, [query, sortValue, selectedFilters, pathname, router]);

  const isFiltering = useMemo(
    () => Object.values(selectedFilters).some((values) => values && values.length > 0),
    [selectedFilters]
  );

  return (
    <aside className="space-y-6 rounded-3xl border border-charcoal/10 bg-white/80 p-6 shadow-soft">
=======
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

interface CatalogFiltersProps {
  tags: string[];
}

export default function CatalogFilters({ tags }: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const applyParams = (next: URLSearchParams) => {
    const queryString = next.toString();
    startTransition(() => {
      router.push(`/catalog${queryString ? `?${queryString}` : ''}`);
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString());
      if (query) {
        next.set('q', query);
      } else {
        next.delete('q');
      }
      if (next.toString() !== searchParams.toString()) {
        applyParams(next);
      }
    }, 250);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const activeTag = searchParams.get('tag') ?? '';
  const activeSort = searchParams.get('sort') ?? 'newest';

  const sortedTags = useMemo(() => [...tags].sort((a, b) => a.localeCompare(b)), [tags]);

  const handleTagClick = (tag: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (activeTag === tag) {
      next.delete('tag');
    } else {
      next.set('tag', tag);
    }
    applyParams(next);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(searchParams.toString());
    if (event.target.value === 'newest') {
      next.delete('sort');
    } else {
      next.set('sort', event.target.value);
    }
    applyParams(next);
  };

  return (
    <div className="space-y-6 rounded-3xl border border-charcoal/10 bg-white/80 p-6 shadow-soft">
>>>>>>> origin/main
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-1 items-center gap-3 rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm shadow-sm focus-within:border-gold focus-within:ring-1 focus-within:ring-gold">
          <span className="text-charcoal/40">Search</span>
          <input
            className="flex-1 bg-transparent text-charcoal placeholder:text-charcoal/40 focus:outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
<<<<<<< HEAD
            placeholder="Leather tote, kundan choker…"
            aria-label="Search within collection"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-charcoal/70">
          <span>Sort</span>
          <select
            className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none"
            onChange={(event) => setSortValue(event.target.value)}
            value={sortValue}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
=======
            placeholder="Embroidery, sari, jewellery…"
            aria-label="Search catalog"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-charcoal/70">
          <span>Sort by</span>
          <select
            className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none"
            onChange={handleSortChange}
            value={activeSort}
            aria-label="Sort products"
          >
            {sortOptions.map((option) => (
>>>>>>> origin/main
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
<<<<<<< HEAD

      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-charcoal/50">
        <div className="inline-flex items-center gap-2">
          <FunnelIcon className="h-4 w-4" aria-hidden /> Filters
        </div>
        <button
          type="button"
          className="text-charcoal/60 transition hover:text-gold"
          onClick={clearFilters}
          disabled={!isFiltering}
        >
          Clear
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => {
          const expanded = expandedGroups[group.key] ?? true;
          const selected = selectedFilters[group.key] ?? [];
          return (
            <div key={group.key} className="rounded-2xl border border-charcoal/10 bg-white/90 p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-sm font-medium text-charcoal"
                onClick={() =>
                  setExpandedGroups((current) => ({
                    ...current,
                    [group.key]: !expanded
                  }))
                }
                aria-expanded={expanded}
              >
                <span>{group.label}</span>
                <span className="text-xs uppercase tracking-widest text-charcoal/40">
                  {selected.length ? `${selected.length} selected` : 'All'}
                </span>
              </button>
              {expanded && (
                <ul className="mt-3 space-y-2 text-sm text-charcoal/80">
                  {group.options.map((option) => {
                    const isChecked = selected.includes(option.value);
                    return (
                      <li key={option.value}>
                        <label className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-charcoal/20 text-gold focus:ring-gold"
                              checked={isChecked}
                              onChange={() => toggleFilter(group.key, option.value)}
                              aria-label={`${group.label} ${option.label}`}
                            />
                            <span>{option.label}</span>
                          </span>
                          <span className="text-xs text-charcoal/40">{option.count}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {isPending && (
        <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Updating…</p>
      )}
    </aside>
=======
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleTagClick('')}
          className={cn(
            'rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-colors',
            activeTag === ''
              ? 'border-gold bg-gold text-white'
              : 'border-charcoal/10 bg-white text-charcoal hover:border-gold hover:text-gold'
          )}
        >
          All
        </button>
        {sortedTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className={cn(
              'rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-colors',
              activeTag === tag
                ? 'border-gold bg-gold text-white'
                : 'border-charcoal/10 bg-white text-charcoal hover:border-gold hover:text-gold'
            )}
          >
            {tag}
          </button>
        ))}
      </div>
      {isPending && <p className="text-xs uppercase tracking-widest text-charcoal/40">Updating…</p>}
    </div>
>>>>>>> origin/main
  );
}

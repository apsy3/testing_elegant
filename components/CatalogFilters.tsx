'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FunnelIcon } from '@heroicons/react/24/outline';
import type { FilterGroup, ActiveFilters, SortOption } from '@/lib/search';
import { serializeFilters } from '@/lib/search';

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

interface CatalogFiltersProps {
  groups: FilterGroup[];
  initialQuery?: string;
  initialSort?: SortOption;
  activeFilters: ActiveFilters;
}

export default function CatalogFilters({
  groups,
  initialQuery = '',
  initialSort = 'newest',
  activeFilters
}: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [selectedFilters, setSelectedFilters] = useState<ActiveFilters>(activeFilters);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();
  const lastSync = useRef({ query: initialQuery, sort: initialSort, filters: activeFilters });

  useEffect(() => {
    setQuery(initialQuery);
    setSort(initialSort);
    setSelectedFilters(activeFilters);
    lastSync.current = { query: initialQuery, sort: initialSort, filters: activeFilters };
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
    const params = serializeFilters(selectedFilters);
    if (query.trim()) {
      params.set('q', query.trim());
    }
    if (sort !== 'newest') {
      params.set('sort', sort);
    }
    return params;
  };

  useEffect(() => {
    const { query: lastQuery, sort: lastSort, filters: lastFilters } = lastSync.current;
    const sameQuery = lastQuery === query;
    const sameSort = lastSort === sort;
    const sameFilters = JSON.stringify(lastFilters) === JSON.stringify(selectedFilters);
    if (sameQuery && sameSort && sameFilters) {
      return;
    }
    const handler = setTimeout(() => {
      lastSync.current = { query, sort, filters: selectedFilters };
      const params = buildSearchParams();
      const queryString = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`);
      });
    }, 200);

    return () => clearTimeout(handler);
  }, [query, sort, selectedFilters, pathname, router]);

  const isFiltering = useMemo(
    () => Object.values(selectedFilters).some((values) => values && values.length > 0),
    [selectedFilters]
  );

  return (
    <aside className="space-y-6 rounded-3xl border border-charcoal/10 bg-white/80 p-6 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-1 items-center gap-3 rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm shadow-sm focus-within:border-gold focus-within:ring-1 focus-within:ring-gold">
          <span className="text-charcoal/40">Search</span>
          <input
            className="flex-1 bg-transparent text-charcoal placeholder:text-charcoal/40 focus:outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Leather tote, kundan choker…"
            aria-label="Search within collection"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-charcoal/70">
          <span>Sort</span>
          <select
            className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none"
            onChange={(event) => setSort(event.target.value as SortOption)}
            value={sort}
            aria-label="Sort products"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

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
  );
}

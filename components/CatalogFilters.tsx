'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

interface CatalogFiltersProps {
  tags: string[];
  initialQuery?: string;
  initialTag?: string;
  initialSort?: 'newest' | 'price-asc' | 'price-desc';
}

export default function CatalogFilters({
  tags,
  initialQuery = '',
  initialTag = '',
  initialSort = 'newest'
}: CatalogFiltersProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc'>(initialSort);
  const [isPending, startTransition] = useTransition();
  const lastSyncedParams = useRef({ query: initialQuery, tag: initialTag, sort: initialSort });

  useEffect(() => {
    setQuery(initialQuery);
    setSelectedTag(initialTag);
    setSort(initialSort);
    lastSyncedParams.current = { query: initialQuery, tag: initialTag, sort: initialSort };
  }, [initialQuery, initialTag, initialSort]);

  const applyParams = (nextQuery: string, nextTag: string, nextSort: 'newest' | 'price-asc' | 'price-desc') => {
    const params = new URLSearchParams();
    if (nextQuery) {
      params.set('q', nextQuery);
    }
    if (nextTag) {
      params.set('tag', nextTag);
    }
    if (nextSort !== 'newest') {
      params.set('sort', nextSort);
    }

    const queryString = params.toString();
    startTransition(() => {
      router.push(`/catalog${queryString ? `?${queryString}` : ''}`);
    });
  };

  useEffect(() => {
    if (
      query === lastSyncedParams.current.query &&
      selectedTag === lastSyncedParams.current.tag &&
      sort === lastSyncedParams.current.sort
    ) {
      return;
    }

    const handler = setTimeout(() => {
      lastSyncedParams.current = { query, tag: selectedTag, sort };
      applyParams(query, selectedTag, sort);
    }, 250);

    return () => clearTimeout(handler);
  }, [query, selectedTag, sort]);

  const sortedTags = useMemo(() => [...tags].sort((a, b) => a.localeCompare(b)), [tags]);

  const handleTagClick = (tag: string) => {
    setSelectedTag((current) => (current === tag ? '' : tag));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSort = event.target.value as 'newest' | 'price-asc' | 'price-desc';
    setSort(nextSort);
  };

  return (
    <div className="space-y-6 rounded-3xl border border-charcoal/10 bg-white/80 p-6 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-1 items-center gap-3 rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm shadow-sm focus-within:border-gold focus-within:ring-1 focus-within:ring-gold">
          <span className="text-charcoal/40">Search</span>
          <input
            className="flex-1 bg-transparent text-charcoal placeholder:text-charcoal/40 focus:outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Embroidery, sari, jewellery…"
            aria-label="Search catalog"
          />
        </label>
          <label className="flex items-center gap-3 text-sm text-charcoal/70">
            <span>Sort by</span>
            <select
              className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none"
              onChange={handleSortChange}
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
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleTagClick('')}
          className={cn(
            'rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-colors',
            selectedTag === ''
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
              selectedTag === tag
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
  );
}

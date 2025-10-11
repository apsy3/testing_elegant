'use client';

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
            value={activeSort}
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
  );
}

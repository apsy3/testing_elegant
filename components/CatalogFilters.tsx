'use client';

<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
=======
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
>>>>>>> e3974fd (fix: unblock static builds)
=======
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

interface CatalogFiltersProps {
  tags: string[];
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
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
<<<<<<< HEAD
>>>>>>> e3974fd (fix: unblock static builds)
=======
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
    startTransition(() => {
      router.push(`/catalog${queryString ? `?${queryString}` : ''}`);
    });
  };

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
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
<<<<<<< HEAD
>>>>>>> e3974fd (fix: unblock static builds)
=======
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)

  const sortedTags = useMemo(() => [...tags].sort((a, b) => a.localeCompare(b)), [tags]);

  const handleTagClick = (tag: string) => {
<<<<<<< HEAD
<<<<<<< HEAD
    setSelectedTag((current) => (current === tag ? '' : tag));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSort = event.target.value as 'newest' | 'price-asc' | 'price-desc';
    setSort(nextSort);
=======
=======
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
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
<<<<<<< HEAD
>>>>>>> e3974fd (fix: unblock static builds)
=======
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
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
<<<<<<< HEAD
<<<<<<< HEAD
          <label className="flex items-center gap-3 text-sm text-charcoal/70">
            <span>Sort by</span>
            <select
              className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none"
              onChange={handleSortChange}
              value={sort}
              aria-label="Sort products"
            >
=======
=======
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
        <label className="flex items-center gap-3 text-sm text-charcoal/70">
          <span>Sort by</span>
          <select
            className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none"
            onChange={handleSortChange}
            value={activeSort}
            aria-label="Sort products"
          >
<<<<<<< HEAD
>>>>>>> e3974fd (fix: unblock static builds)
=======
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
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
<<<<<<< HEAD
<<<<<<< HEAD
            selectedTag === ''
=======
            activeTag === ''
>>>>>>> e3974fd (fix: unblock static builds)
=======
            activeTag === ''
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
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
<<<<<<< HEAD
<<<<<<< HEAD
              selectedTag === tag
=======
              activeTag === tag
>>>>>>> e3974fd (fix: unblock static builds)
=======
              activeTag === tag
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
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

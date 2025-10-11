# Catalog Collections & Query Rules

The catalog taxonomy is powered by deterministic rules defined in `lib/taxonomy.ts`. Each collection evaluates a normalized product against gender, department, and keyword heuristics so that Shopify data (or the in-memory fallback) routes consistently without manual curation.

| Slug | Display Title | Inclusion Logic |
| --- | --- | --- |
| `women` | Women | Gender tag `women` or `unisex`. |
| `women/bags` | Women · Bags | Gender `women`/`unisex` **and** `department:bags`. |
| `women/bags/day` | Women · Bags · Day | Women/unisex bags not matched by travel/work/evening/small heuristics. |
| `women/bags/travel` | Women · Bags · Travel | Women/unisex bags with `occasion:travel` or travel keywords (`duffel`, `carry-on`, etc.). |
| `women/bags/evening` | Women · Bags · Evening | Women bags with `occasion:evening` or clutch/minaudière keywords. |
| `women/bags/small` | Women · Bags · Small | Women bags tagged `small`/`mini` when no higher-priority occasion matched. |
| `women/apparel/*` | Women · Apparel | Gender `women`/`unisex` and `department:apparel` with sub-categories derived from `apparel:*` tags and keyword lists (tops, bottoms, outer, dresses). |
| `women/shoes/*` | Women · Shoes | Gender `women`/`unisex` and `department:shoes`, classified into sneakers/boots/sandals/heels via keywords. |
| `women/accessories/*` | Women · Accessories | Gender `women`/`unisex`, `department:accessories`, mapped to belts/scarves/headwear/umbrellas keywords. |
| `men` | Men | Gender tag `men` or `unisex`. |
| `men/bags/*` | Men · Bags | Same bag rules as women, with `work` prioritised for men-specific briefcase keywords. |
| `men/apparel/*` | Men · Apparel | Gender `men`/`unisex` with `department:apparel`; lounge detection via `lounge|sleep|pyjama` keywords. |
| `men/shoes/*` | Men · Shoes | Gender `men`/`unisex` with `department:shoes`, detecting `formal` via `oxford|derby|loafer`. |
| `men/accessories/*` | Men · Accessories | Men/unisex accessories mapped to belts/scarves/headwear/umbrellas. |
| `jewellery` | Jewellery | `department:jewellery` regardless of gender. |
| `jewellery/women` | Jewellery · Women | Jewellery where gender resolves to women/unisex. |
| `jewellery/men` | Jewellery · Men | Jewellery where gender resolves to men/unisex. |
| `new/all` | New · All | `createdAt <= 30 days` **or** tag `new`. |
| `new/bags` | New · Bags | `new/all` rule **and** `department:bags`. |
| `new/apparel` | New · Apparel | `new/all` rule **and** `department:apparel`. |
| `new/shoes` | New · Shoes | `new/all` rule **and** `department:shoes`. |
| `trending/bestsellers` | Trending · Bestsellers | Tag `bestseller`. |
| `trending/most-wanted` | Trending · Most-Wanted | Tag `most-wanted`. |
| `trending/back-in` | Trending · Back-In | Tag `back-in`. |
| `sale` | Sale | Tag `sale`. |

Additional helper rules:

- Occasion facets normalise `occasion:*` tags and bag category fallbacks.
- Tag normalisation ensures terms like `carry on` → `carry-on`, `cross-body` → `crossbody` before keyword checks.
- Gender infers from `gender:*` tags with fallback to women; `gender:unisex` routes into both women and men hierarchies.

Refer to `lib/taxonomy.ts` for the full rule definitions and keyword dictionaries.

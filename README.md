# Luxury–Heritage Marketplace Preview

This repository hosts a lightweight preview of the headless Shopify concept site. All data is mock-only and the checkout flow returns a local fallback URL so nothing touches live merchant infrastructure.

## Tooling prerequisites

- Node.js 18.18.x LTS (see `.nvmrc`)
- pnpm 9.x (Corepack recommended) or `npm` with the scripts below

## Useful scripts

- `pnpm dev` – run the Next.js development server
- `pnpm build` – create a production build for static preview
- `pnpm lint` – run ESLint with the Next.js config
- `pnpm typecheck` – run TypeScript in no-emit mode

Automated tests are disabled in preview mode to keep dependencies minimal.

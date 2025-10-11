# Implementation Plan

The master prompt mandates building the platform in structured passes. This document captures the high-level sequence so the team can execute iteratively while maintaining the required guarantees (HMAC verification, RLS, idempotency, rate limiting).

## Pass 0 – Repository Initialization
- [x] Create Turborepo workspace with pnpm.
- [x] Establish required directory layout (`apps`, `packages`, `tools`).
- [x] Add shared configuration packages and linting placeholders.
- [x] Provide `.env.example` and project README.

## Pass 1 – Database Foundation
- Enable Supabase extensions (`pgcrypto`, `uuid-ossp`, `vector`).
- Define Drizzle schema for all tables, indexes, and column encryption helpers.
- Configure RLS policies according to the spec and generate seed scripts.

## Pass 2 – Backend Core
- Scaffold NestJS modules: Common, Shopify, KPI, Artisan, Search, AI, WhatsApp, Payouts.
- Implement raw-body webhook pipeline with HMAC guard + idempotency store.
- Integrate BullMQ queues backed by Upstash Redis.
- Expose KPI, Artisan, Search, AI endpoints with Zod validation.

## Pass 3 – Frontend Applications
- Bootstrap Next.js App Router project for storefront and dashboards.
- Implement Supabase auth guards and role-based routing.
- Build dashboards with Chart.js and SSE live orders feed.

## Pass 4 – AI & Search Enhancements
- Wire up OpenAI embeddings pipeline + RAG concierge service.
- Implement hybrid search ranking combining Postgres text search and pgvector.
- Add rate limits for AI endpoints and tagger tooling.

## Pass 5 – Messaging & Payouts
- Integrate Gupshup WhatsApp notifications via BullMQ.
- Implement payout generation, reconciliation, and RazorpayX CSV exports.
- Ensure audit logs, DLQ monitoring, and replay/backfill scripts.

## Pass 6 – Testing, Security, and Compliance
- Author Vitest unit tests, Playwright E2E suites, and security checks.
- Configure CI/CD pipelines (GitHub Actions) with lint/typecheck/test stages.
- Document runbooks for replay, backfill, restore, and key rotation.

Each pass should conclude with:
1. Updated file tree snapshot.
2. Full contents of modified key files.
3. Commands to run (dev servers, migrations, seeds).
4. Tests executed with results.
5. Smoke-test checklist coverage.

This approach keeps prerequisites satisfied and maintains visibility into progress toward the launch criteria.

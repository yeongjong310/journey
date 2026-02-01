# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog and portfolio website built with Next.js 15, featuring MDX-based blog posts, Three.js/React Three Fiber 3D experiments, and Supabase for view counting.

## Technology Stack

- **Framework**: Next.js 15.1.6 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS 4.0 with PostCSS
- **Database**: Supabase (SSR-compatible client)
- **3D Graphics**: React Three Fiber 9.0.0-beta.1 + Three.js
- **Content**: MDX with next-mdx-remote for blog posts
- **Fonts**: Geist Sans & Geist Mono via geist package
- **Code Highlighting**: sugar-high
- **Analytics**: Vercel Analytics & Speed Insights
- **Node Version**: LTS (see .nvmrc)

## Commands

```bash
# Development
npm run dev       # Start dev server with Turbopack on http://localhost:3000

# Production
npm run build     # Build for production
npm start         # Start production server

# Code Quality
npm run lint      # Run ESLint (next/core-web-vitals + next/typescript)
```

## Architecture

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog-related pages and utilities
│   │   ├── [slug]/        # Dynamic blog post pages
│   │   ├── utils.ts       # MDX parsing, frontmatter extraction
│   │   └── page.tsx       # Blog listing page
│   ├── components/        # React components
│   │   ├── r3f/          # React Three Fiber components
│   │   ├── browser/      # Client-only wrappers
│   │   ├── error/        # Error boundary components
│   │   ├── mdx.tsx       # Custom MDX components
│   │   ├── nav.tsx       # Navigation
│   │   └── themeSwitcher.tsx
│   ├── db/               # Database layer
│   │   ├── client.ts     # Browser Supabase client
│   │   ├── server.ts     # Server Supabase client
│   │   └── queries/      # Database queries
│   │       └── views.ts  # View count tracking
│   ├── r3f/              # React Three Fiber demo page
│   ├── rss/              # RSS feed route
│   ├── og/               # Open Graph image generation
│   └── layout.tsx        # Root layout with error boundary
└── posts/                 # MDX blog posts
    └── R3F/              # Nested R3F-related posts
```

### Key Architectural Patterns

**MDX Blog System**
- Blog posts stored as `.mdx` files in `src/posts/` with YAML frontmatter
- Frontmatter structure: `title`, `publishedAt`, `summary`, `image` (optional)
- `src/app/blog/utils.ts` handles MDX file discovery, parsing, and metadata extraction
- Posts can be nested in subdirectories (e.g., `src/posts/R3F/`)
- Static generation via `generateStaticParams()` for all blog post pages

**Supabase Integration**
- Dual client setup: `db/client.ts` (browser) and `db/server.ts` (server with cookies)
- Server client uses `@supabase/ssr` with Next.js cookies integration
- View counting via RPC function `increment_view_count` (must exist in Supabase)
- Graceful degradation when `NEXT_PUBLIC_SUPABASE_URL` is not set
- Environment variables required:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**React Three Fiber (R3F) Integration**
- R3F Canvas dynamically imported with `ssr: false` to prevent SSR issues
- Custom 3D components in `src/app/components/r3f/`
- TypeScript errors suppressed with `@ts-expect-error` for dynamic imports
- R3F page at `/r3f` route

**Custom MDX Components**
- Auto-generated heading IDs with anchor links (via `slugify`)
- Custom `Image` component (rounded corners, responsive)
- Custom `Link` component (internal vs external handling)
- Syntax highlighting via `sugar-high`
- Supports custom Table component

**Error Handling**
- Root layout wrapped with `ErrorResetBoundary` from `src/app/components/error/ErrorBoundary.tsx`
- Uses `react-error-boundary` package

**Styling**
- Tailwind 4.0 with dark mode support via `dark:` classes
- Dark mode toggle in navigation
- Custom utility: `cx()` function for conditional class joining in layout.tsx
- Max width constrained to `max-w-3xl` in body

## Path Aliases

TypeScript paths configured in `tsconfig.json`:
- `@/*` → `./src/*`

Example: `import { getBlogPosts } from "@/app/blog/utils"`

## Common Development Workflows

**Adding a New Blog Post**
1. Create `.mdx` file in `src/posts/` or subdirectory
2. Add frontmatter with required fields (title, publishedAt, summary)
3. Build will automatically generate static page via `generateStaticParams()`

**Working with Supabase**
- Use `createClient()` from `@/app/db/server` in Server Components/Actions
- Use `createClient()` from `@/app/db/client` in Client Components
- View count queries in `@/app/db/queries/views.ts` are Server Actions

**Adding R3F Components**
- All R3F components must be client components (`"use client"`)
- Import Canvas dynamically with `ssr: false`
- Place in `src/app/components/r3f/`

## Important Notes

- The project uses React 19 and Next.js 15 - check compatibility when adding new dependencies
- R3F is beta version (9.0.0-beta.1) - may have breaking changes
- Always test dark mode when making UI changes
- The codebase uses pnpm (see `pnpm-lock.yaml`)

# AGENTS.md

## Commands

```bash
bun dev              # Watch-mode build all packages (tsup, persistent)
bun build            # Build all packages (dependency-ordered via turbo)
bun types:check      # Type-check all packages (depends on ^build — need deps built first)
bun run lint         # Biome check + per-package lint tasks
bun run lint:fix     # Biome check --write --unsafe + turbo lint --fix
bun run format       # Biome format --write
bun run format:check # Biome check --write
bun clean            # Clean dist/.turbo per package
bun clean:all        # Full wipe: dist, .turbo, node_modules, bun.lock
```

## Architecture

```
packages/core/   → @pelatform/ui       (scope package, re-exports from pelatform-ui)
packages/main/   → pelatform-ui        (source of truth — all components, hooks, styles)
packages/mcp/    → @pelatform/mcp.ui   (MCP server, private, not published)
apps/web/        → @apps/web           (Fumadocs documentation site, Next.js 16)
apps/icons/      → @apps/icons         (Icons showcase app, Next.js 16)
```

**Dependency chain**: `main` has no internal deps. `core` depends on `main` (`workspace:*`). `apps/web` and `apps/icons` depend on `core` (`workspace:*`). Build order enforced by `turbo.json` `"dependsOn": ["^build"]`.

## Entry Points (main & core packages)

Both packages have identical 6 entry points via tsup:

| Import path    | Entry source        | Content                                |
| -------------- | ------------------- | -------------------------------------- |
| `.`            | `src/index.ts`      | `lib/menu` only                        |
| `./animation`  | `src/animation.ts`  | 14 animation components                |
| `./base`       | `src/base.ts`       | ~80 base/headless components (Base UI) |
| `./components` | `src/components.ts` | Icons, Logo, etc.                      |
| `./hooks`      | `src/hooks.ts`      | 18 React hooks                         |
| `./radix`      | `src/radix.ts`      | ~80 styled Radix UI components         |

All main entries get `"use client"` banner. Core also gets `"use client"` on all entries (both packages use same tsup `banner`).

## Critical Build Gotcha

**Core's tsup `onSuccess` hook copies CSS files from `packages/main/css/` into `packages/core/dist/css/`.** This means:

- `main` **must** be built before `core` (enforced by turbo `^build`)
- The CSS copy uses `glob` at build time — if main's `css/` directory is missing, core build fails
- Core also copies `src/style.css` → `dist/style.css` (this is the `./css` export)

## Tooling

| Tool       | Config                                                                          | Notes                                                                        |
| ---------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Biome      | `biome.jsonc` → extends `@pelatform/biome-config/base`                          | No ESLint/Prettier. Single quotes, semicolons, 100 width.                    |
| TypeScript | Per-package `tsconfig.json` → extends `@pelatform/tsconfig/tsconfig.react.json` | No root tsconfig. MCP uses `tsconfig.base.json` instead.                     |
| tsup       | ESM only, target ES2022, dts enabled                                            | All deps from peerDependencies externalized automatically.                   |
| Changesets | `.changeset/config.json`                                                        | Ignores `@pelatform/mcp.ui` and `@apps/*`. `baseBranch: main`.               |
| Turbo      | `turbo.json`                                                                    | `build` and `types:check` depend on `^build`. `dev` is persistent, no cache. |
| Commitlint | `.commitlintrc.cjs` → extends `@commitlint/config-conventional`                 | Types: feat/feature, fix, refactor, docs, build, test, ci, chore             |

## Package Manager & Versioning

- **Package manager**: `bun@1.3.14` (enforced in `package.json`)
- **Engine**: Node >=22, Bun >=1.3.0
- **Workspace protocol**: Internal deps use `workspace:*`. Never manual-version them — Changesets handles it.
- **Catalog**: `typescript: "5.9.3"`, `recharts: "2.15.1"` (in root `package.json`)

## Conventional Commits

Format: `type(scope): description` (enforced by commitlint via Husky).

Types: `feat`, `feature`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, `chore`
Scopes: package names — `ui` (core), `main`, `mcp`

## Apps (docs sites)

- `apps/web`: Fumadocs-based docs site. `types:check` runs `fumadocs-mdx && next typegen && tsc --noEmit`.
- `apps/icons`: Icons browser. Uses `@pelatform/icons`, `nuqs`, `use-debounce`.
- Both use Tailwind CSS v4 with `@tailwindcss/postcss`, Next.js 16 with Turbopack.

## No Unit Tests

There are no component-level unit tests. Type-checking (`bun types:check`) is the primary validation. The MCP package has a `bun test` script that tests the MCP server binary.

## Key Conventions

- **Export pattern**: `export * from "./ui/[category]/[component]"` — no barrel re-exports within component dirs
- **Import organization**: Biome auto-organizes in order: node/bun → react/next → external → `@pelatform/**` → aliases/relative
- **`biome-ignore-all assist/source/organizeImports`**: Entry files disable auto-import-sorting (order matters for export resolution)
- **CSS location**: `packages/main/css/theme.css` (source); core re-exports copied to `packages/core/dist/`
- **Peer deps**: Main declares extensive peerDependencies (react, radix-ui, motion, tanstack, dnd-kit, etc.). Core mirrors them all plus `pelatform-ui` itself.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Pelatform UI**, a monorepo containing React UI library packages. The project uses Bun as the package manager, Turborepo for monorepo orchestration, Biome for linting/formatting, and Changesets for version management.

**Current Structure**: Simplified 3-package architecture with scope package pattern.

## Essential Commands

### Development

```bash
bun dev                    # Run all packages in watch mode
bun build                  # Build all packages
bun types:check            # Type-check all packages
```

### Code Quality

```bash
bun run lint               # Run Biome check and package lint tasks
bun run lint:fix           # Fix lint issues (Biome + turbo fix)
bun run format             # Format with Biome
bun run format:check       # Format check (Biome)
```

### Cleanup

```bash
bun clean                  # Clean build artifacts
bun clean:all              # Full cleanup including node_modules, .turbo, bun.lock
```

### Package Management & Publishing

```bash
npx changeset              # Create a changeset for version management
bun run version            # Update package versions based on changesets
bun run release            # Build and publish packages to npm (maintainers only)
```

## Architecture

### Monorepo Structure

```
ui/
├── packages/
│   ├── core/             # @pelatform/ui - Scope package (re-exports from pelatform-ui)
│   ├── main/             # pelatform-ui - Main package with all components and hooks
│   └── mcp/              # @pelatform/mcp.ui - MCP server (private)
├── apps/                 # Reserved for example applications
└── scripts/              # Build and release scripts
```

**Workspace Convention**: All packages in `packages/` directory are part of the workspace. Internal dependencies use the `workspace:*` protocol in package.json files.

### Package System

**@pelatform/ui** (`packages/core/`)

- **Scope package** that re-exports everything from `pelatform-ui`
- Multi-entry package with organized exports:
  - `.` - Main entry (re-exports from pelatform-ui)
  - `./animation` - Animation components (14 components)
  - `./base` - Base headless components (77 components)
  - `./components` - Custom Pelatform components
  - `./hooks` - React hooks (18 hooks)
  - `./radix` - Radix styled components (77 components)
- CSS exports: `./css`, `./color/*`, `./styles/*` (pointed to main package)
- Version 2.0.0 - Published as scoped package

**pelatform-ui** (`packages/main/`)

- **Main package** containing all UI components, hooks, and styles
- Multi-entry build with 6 entry points:
  - `index.ts` - Core utilities, types, icons
  - `animation.ts` - 14 animation components
  - `base.ts` - 77 base headless components (built on Base UI)
  - `components.ts` - Custom Pelatform components (icons, logo)
  - `hooks.ts` - 18 React hooks
  - `radix.ts` - 77 radix styled components
- Source structure:
  - `src/ui/animation/` - Animation components
  - `src/ui/base/` - Base headless components
  - `src/ui/radix/` - Radix styled components
  - `src/components/` - Custom components
  - `src/hooks/` - React hooks
- CSS files located at `css/theme.css` with components in `css/color/` and `css/styles/`
- Version 1.2.9 - Published as main package

**@pelatform/mcp.ui** (`packages/mcp/`)

- Model Context Protocol (MCP) server for Pelatform UI documentation and code assistance
- Private package (not published to npm)
- Binary: `pelatform-mcp-ui`
- Built with TypeScript, no bundler (direct tsc compilation)
- Dependencies: @modelcontextprotocol/sdk, glob, zod

### Component Categories

**Animation** (14 components): Text effects (ShimmeringText, TextReveal, TypingText, VideoText, WordRotate, SvgText), number animations (CountingNumber, SlidingNumber), layout effects (Marquee, GitHubButton, AvatarGroup), and backgrounds (GradientBackground, GridBackground, HoverBackground)

**Base** (77 components): Headless components built on Base UI - forms (Input, Textarea, Select, Checkbox, Radio, Switch, Slider), selection (Combobox, Listbox, Autocomplete), layout (Accordion, Tabs, Dialog, Popover, Tooltip), data (Table, Pagination, Avatar, Badge), and more

**Radix** (77 components): Styled Radix UI components - Accordion, Alert, AlertDialog, AspectRatio, Autocomplete, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, ContextMenu, DataGrid (with filtering/pagination/dnd), DateSelector, Dialog, Direction, DropdownMenu, Form, HoverCard, Input, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip

**Custom Components**: Icons, Logo, and other Pelatform-specific components

**Hooks** (18 hooks): useAnalytics, useBodyClass, useCopyToClipboard, useFileUpload, useHydrated, useIntersectionObserver, useIsMac, useIsMobile, useMediaQuery, useMenu, useMounted, useMutationObserver, useRecaptchaV2, useRemoveGAParams, useScrollPosition, useSliderInput, useViewport

### Build System

- **Bundler**: tsup (ESM only, targets ES2022)
- **TypeScript**: Module resolution is "bundler", strict mode enabled; extends external `@pelatform/tsconfig`
- **Format**: All packages export ESM format with TypeScript declarations
- **External Dependencies**: React and React DOM are externalized in builds
- **CSS Handling**: Main package contains CSS files in `css/` directory
- **Peer Dependencies**: Component packages use peerDependencies to avoid bundling shared libraries
- **Multi-Entry Builds**: Both core and main packages use multiple tsup entry points

**Build Configurations**

Core package (`@pelatform/ui`):

```typescript
// Multi-entry build - re-exports from pelatform-ui
entry: [
  "./src/index.ts", // Main entry
  "./src/animation.ts", // Animation re-exports
  "./src/base.ts", // Base re-exports
  "./src/components.ts", // Components re-exports
  "./src/hooks.ts", // Hooks re-exports
  "./src/radix.ts", // Radix re-exports
];
// No "use client" banner - sub-components add it
external: ["react", "react-dom"];
```

Main package (`pelatform-ui`):

```typescript
// Multi-entry build for organized exports
entry: [
  "./src/index.ts", // Core utilities, types, icons
  "./src/animation.ts", // Animation components
  "./src/base.ts", // Base headless components
  "./src/components.ts", // Custom components
  "./src/hooks.ts", // React hooks
  "./src/radix.ts", // Radix styled components
];
// "use client" banner added for component entries
external: ["react", "react-dom"];
```

MCP package (`@pelatform/mcp.ui`):

- Uses direct TypeScript compilation (`tsc`) instead of tsup
- No external dependencies bundling
- Produces binary executable for MCP server

### Code Style (Biome)

Configuration: `biome.jsonc` - Extends `@pelatform/biome-config/base`

- **Indentation**: 2 spaces
- **Line Width**: 100 characters
- **Quotes**: Single quotes (JavaScript), double quotes acceptable in other contexts
- **Semicolons**: Always required
- **Trailing Commas**: All
- **Arrow Parens**: Always
- **Import Organization**: Automatic with specific group ordering:
  1. Node/Bun/URL imports
  2. React and Next.js
  3. External packages
  4. @pelatform/**, @pelatformutils/** packages
  5. Aliases and relative paths

### Conventional Commits

Follow the conventional commit format (enforced via commitlint):

```
type(scope): description

Types: feat, fix, docs, refactor, test, chore, build, ci
Scopes: Package names (ui, main, mcp)
```

Examples:

- `feat(hooks): add useHydrated hook for SSR-safe hydration`
- `feat(ui): add new text reveal component`
- `fix(ui): resolve button component accessibility issue`
- `docs(main): update data grid documentation`
- `refactor(ui): simplify import paths`
- `chore(main): update dependencies`

Configuration: `.commitlintrc.cjs` - Extends `@commitlint/config-conventional` with custom types

**Commitlint Configuration**:

- Allows both "feat" and "feature" as type aliases
- Enforces header max length rules
- Plugins: commitlint-plugin-function-rules for custom validation

## Package Development

### Working on Individual Packages

```bash
cd packages/core  # or packages/main
bun dev              # Watch mode with tsup
bun build            # Build package
bun types:check      # Type-check only
```

### Choosing Between Base and Radix Components

- **Use `pelatform-ui/base`** (via `@pelatform/ui/base`) when:
  - Building a custom design system with specific styling requirements
  - Need complete control over component appearance
  - Want to minimize bundle size by only importing necessary styles
  - Creating components that must match existing brand guidelines
  - Base components are headless and built on Base UI

- **Use `pelatform-ui/radix`** (via `@pelatform/ui/radix`) when:
  - Need pre-styled components that work out of the box
  - Building prototypes or MVPs quickly
  - Want consistent styling across the application
  - Don't have strict design requirements
  - Radix components are styled with Tailwind CSS and include animations

- **Use both together** - You can import from both categories in the same application

### Export Patterns

**Core package** (`@pelatform/ui`) - Re-exports from pelatform-ui:

```typescript
// Each entry point re-exports from pelatform-ui
export type * from "pelatform-ui/animation";
export * from "pelatform-ui/animation";
```

**Main package** (`pelatform-ui`) - Exports local components:

```typescript
// Type exports first (for tree-shaking)
export type * from "./ui/base/...";

// Value exports
export * from "./ui/base/...";
```

## Workspace Protocol

This monorepo uses workspace protocol for internal dependencies. In package.json:

```json
"devDependencies": {
  "@pelatform/tsconfig": "workspace:*"
}
```

**Workspace Dependency Management**:

- Internal packages use `workspace:*` protocol (e.g., `pelatform-ui: workspace:*`)
- Changesets automatically updates workspace dependencies with patch versions during release
- Run `bun update` after `bun run version` to sync workspace references
- Never manually version workspace dependencies - let Changesets handle it

**Peer Dependencies Best Practices**:

- Component packages use peerDependencies for shared libraries (React, Radix UI, motion, etc.)
- This prevents bundling duplicate copies of common libraries
- Consumers must install peer dependencies themselves
- Use version ranges like `>=18.0.0 || >=19.0.0-rc.0` for React compatibility

## Publishing Workflow (Changesets)

1. Make changes to packages
2. Run `npx changeset` and select affected packages
3. Commit the changeset file along with your changes
4. On merge to main, changesets will create a version PR
5. When version PR is merged, packages are automatically published

Configuration: `.changeset/config.json` - Uses main branch, public access, patches internal dependencies

**Publishing Process** (`scripts/publish.sh`):

- Finds all `package.json` files in `packages/` directory
- Skips private packages (those with `"private": true`)
- Runs `bun publish` for each public package
- Creates Git tags using `changeset tag`
- Non-blocking: continues even if individual package publish fails

**Version Management**:

- Run `bun run version` to update package versions based on changesets
- This runs `changeset version` and updates workspace dependencies with `bun update`

## Important Notes

- **Package Manager**: Must use Bun 1.3.10+ (defined in packageManager field as `bun@1.3.10`)
- **Node Version**: Requires Node.js 22+ (defined in engines.field)
- **Biome**: Used exclusively for linting and formatting (no ESLint/Prettier); extends `@pelatform/biome-config/base`
- **Turbo**: Caches builds, runs tasks in dependency order, configured in `turbo.json`
- **React Version**: Uses React 19.2.4; peer dependencies support React >=18.0.0 || >=19.0.0-rc.0
- **TypeScript**: Version 5.9.3, strict mode enforced; extends external `@pelatform/tsconfig`
- **Git Hooks**: Husky is configured (`bun prepare` installs hooks automatically)
- **Lint-Staged**: Configured at both root and package level for pre-commit checks
  - JS/TS files: `biome check --write --no-errors-on-unmatched`
  - MD/YML/YAML files: `prettier --write`
  - JSON/JSONC/HTML files: `biome format --write --no-errors-on-unmatched`
- **Commitlint**: Enforces conventional commit format via `.commitlintrc.cjs`
- **Testing**: This project does not currently have automated tests; type-checking (`bun types:check`) serves as the primary validation

**Turbo Task Configuration** (`turbo.json`):

- `build`: Depends on `^build`, outputs to `dist/` directories
- `dev`: No caching, persistent mode for watch processes
- `types:check`: Depends on `^build`, no outputs
- `lint`: Runs in all packages
- `clean`/`clean:all`: No caching, non-persistent

**CSS Location**:

- Main package CSS files are located in the source tree at `css/theme.css` with color variants in `css/color/` and theme styles in `css/styles/`
- Core package has `src/style.css` that imports `pelatform-ui/css` and is copied to `dist/style.css` during build
- Color variants and theme styles are copied from main package to core package dist directory during build
- Exports: `./css` → `dist/style.css`, `./color/*` → `dist/css/color/*.css`, `./styles/*` → `dist/css/styles/*.css`

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Pelatform UI**, a monorepo containing React UI library packages. The project uses Bun as the package manager, Turborepo for monorepo orchestration, Biome for linting/formatting, and Changesets for version management.

**Current Structure**: This is V2 of Pelatform UI with a simplified 4-package architecture (components, hook, main, mcp).

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
│   ├── components/       # @pelatform/ui.components - All UI components (animation, base, radix)
│   ├── hook/             # @pelatform/ui.hook - React hooks (18 hooks)
│   ├── main/             # pelatform-ui - Main entry point with custom components
│   └── mcp/              # @pelatform/mcp.ui - MCP server (private)
├── apps/                 # Reserved for example applications
└── scripts/              # Build and release scripts
```

**Workspace Convention**: All packages in `packages/` directory are part of the workspace. Internal dependencies use the `workspace:*` protocol in package.json files.

### Package System

**@pelatform/ui.components** (`packages/components/`)

- Multi-entry package containing all UI components organized into three categories:
- **Entry points**: `.` (main), `./animation`, `./base`, `./radix`
- **Animation** (18 components): Text effects (ShimmeringText, TextReveal, TypingText, VideoText, WordRotate), number animations (CountingNumber, SlidingNumber), layout effects (Marquee, GitHubButton), and backgrounds (GradientBackground, GridBackground, HoverBackground)
- **Base** (77 components): Headless components built on Base UI - forms (Input, Textarea, Select, Checkbox, Radio, Switch, Slider), selection (Combobox, Listbox, Autocomplete), layout (Accordion, Tabs, Dialog, Popover, Tooltip), data (Table, Pagination, Avatar, Badge), and more
- **Radix** (77 components): Styled Radix UI components - Accordion, Alert, AlertDialog, AspectRatio, Autocomplete, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, ContextMenu, DataGrid (with filtering/pagination/dnd), DateSelector, Dialog, Direction, DropdownMenu, Form, HoverCard, Input, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip
- Exports CSS via `./css` entry point (from src/style.css)
- Built with "use client" banner for Next.js compatibility

**@pelatform/ui.hook** (`packages/hook/`)

- 18 React hooks collection:
  - Analytics: useAnalytics
  - DOM interactions: useBodyClass, useCopyToClipboard, useFileUpload, useScrollPosition, useSliderInput
  - Detection: useHydrated (SSR-safe), useIntersectionObserver, useIsMac, useIsMobile, useMediaQuery, useMounted, useMutationObserver, useViewport
  - Features: useMenu, useRecaptchaV2, useRemoveGaParams
- Core utility hooks for common patterns

**@pelatform/mcp.ui** (`packages/mcp/`)

- Model Context Protocol (MCP) server for Pelatform UI documentation and code assistance
- Private package (not published to npm)
- Binary: `pelatform-mcp-ui`
- Built with TypeScript, no bundler (direct tsc compilation)
- Dependencies: @modelcontextprotocol/sdk, glob, zod

**pelatform-ui** (`packages/main/`)

- Main entry point that re-exports from components and hook packages
- **Organized import paths**:
  - `pelatform-ui` - Core utilities (cn, colors), types, icons
  - `pelatform-ui/animation` - Animation components (re-exported from @pelatform/ui.components/animation)
  - `pelatform-ui/base` - Base headless components (re-exported from @pelatform/ui.components/base)
  - `pelatform-ui/radix` - Radix styled components (re-exported from @pelatform/ui.components/radix)
  - `pelatform-ui/hooks` - React hooks (re-exported from @pelatform/ui.hook + custom useMetaColor)
  - `pelatform-ui/components` - Custom Pelatform components
- **Custom components categories**:
  - Feedback: Alert, Dialog, ScreenLoader
  - Layout: Auth, Blank, Body, ComingSoon, Error, Grid, Section, SiteFooter, SiteHeader, Wrapper
  - MDX: CodeDisplay, Download, Link, Video, Wrapper, YouTube
  - Navigation: BackLink, CommandMenu, MainNav, MobileNav
  - Providers: QueryProvider, ThemeProvider
  - UI: Announcement, BackgroundPaths, Book, DotsPattern, GridBackground, HexagonBadge, ImageInput, LanguageSwitcher, Logo, ModeSwitcher, MovingBorder, Toolbar, UserAvatar
  - Utils: Fonts, Shared
- CSS files located at `css/theme.css` with components in `css/styles/`
- Includes `llms.txt` for AI assistant integration

### Build System

- **Bundler**: tsup (ESM only, targets ES2022)
- **TypeScript**: Module resolution is "bundler", strict mode enabled; extends external `@pelatform/tsconfig`
- **Format**: All packages export ESM format with TypeScript declarations
- **External Dependencies**: React and React DOM are externalized in builds
- **CSS Handling**: Components package copies `src/style.css` to `dist/style.css` after tsup build
- **Peer Dependencies**: Component packages use peerDependencies to avoid bundling shared libraries
- **"use client" Banner**: Components package adds `"use client";` via tsup banner for Next.js compatibility
- **Multi-Entry Builds**: Both components and main packages use multiple tsup entry points

**Build Configurations**

Components package (`@pelatform/ui.components`):

```typescript
// Multi-entry build with "use client" banner
entry: [
  "./src/index.ts",     // Main entry
  "./src/animation.ts", // Animation components
  "./src/base.ts",      // Base headless components
  "./src/radix.ts",     // Radix styled components
];
banner: { js: '"use client";' };
external: ["react", "react-dom"];
// Build script: "tsup && cp src/style.css dist/style.css"
```

Hook package (`@pelatform/ui.hook`):

```typescript
// Standard tsup config - single entry point
entry: ["./src/index.ts"];
external: ["react"];
```

Main package (`pelatform-ui`):

```typescript
// Multi-entry build for organized exports
entry: [
  "./src/index.ts",      // Core utilities, types, icons
  "./src/animation.ts",  // Animation re-exports
  "./src/base.ts",       // Base re-exports
  "./src/radix.ts",      // Radix re-exports
  "./src/hooks.ts",      // Hooks re-exports
  "./src/components.ts", // Custom components
];
// No "use client" banner - sub-components add it
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
Scopes: Package names (ui.components, ui.hook, main, mcp)
```

Examples:

- `feat(hook): add useHydrated hook for SSR-safe hydration`
- `feat(components): add new text reveal component`
- `fix(components): resolve button component accessibility issue`
- `docs(main): update data grid documentation`
- `refactor(components): simplify import paths`
- `chore(main): update dependencies`

Configuration: `.commitlintrc.cjs` - Extends `@commitlint/config-conventional` with custom types

**Commitlint Configuration**:

- Allows both "feat" and "feature" as type aliases
- Enforces header max length rules
- Plugins: commitlint-plugin-function-rules for custom validation

## Package Development

### Adding a New Package

1. Create directory in `packages/` (components, hook, main, or mcp)
2. Set up with standard structure:
   - `src/index.ts` - Main exports
   - `package.json` - Package metadata with workspace references
   - `tsconfig.json` - Extends `@pelatform/tsconfig/tsconfig.react.json`
   - `tsup.config.ts` - Build configuration (see existing packages for standard config)
   - `README.md` - Package documentation
   - `CHANGELOG.md` - Version history
3. Package naming: Use `@pelatform/ui.*` for public packages (e.g., @pelatform/ui.components, @pelatform/ui.hook)
4. For component packages with CSS:
   - Add `src/style.css` file
   - Configure `./css` export in package.json exports field
   - Update build script to copy CSS: `"build": "tsup && cp src/style.css dist/style.css"`
5. For component packages that need Next.js client directive:
   - Add `banner: { js: '"use client";' }` to tsup.config.ts
   - This is required for packages that export React components
6. Configure peer dependencies for shared libraries to avoid bundling duplication
7. Add package scripts to `package.json`:
   ```json
   "scripts": {
     "clean": "rimraf dist",
     "clean:all": "rimraf .turbo dist node_modules",
     "dev": "tsup --watch",
     "build": "tsup",
     "types:check": "tsc --noEmit"
   }
   ```

**Package Categories**

- **Components package** (`packages/components/`): All UI components with multi-entry build (animation, base, radix)
- **Hook package** (`packages/hook/`): React hooks (single entry, no "use client" banner)
- **Main package** (`packages/main/`): Aggregate entry point with custom components (multi-entry build)
- **MCP package** (`packages/mcp/`): Special-purpose packages (use tsc directly, no tsup)

### Working on Individual Packages

```bash
cd packages/components  # or packages/hook, packages/main
bun dev              # Watch mode with tsup
bun build            # Build package
bun types:check      # Type-check only
```

### Choosing Between Base and Radix Components

- **Use `pelatform-ui/base`** when:
  - Building a custom design system with specific styling requirements
  - Need complete control over component appearance
  - Want to minimize bundle size by only importing necessary styles
  - Creating components that must match existing brand guidelines
  - Base components are headless and built on Base UI

- **Use `pelatform-ui/radix`** when:
  - Need pre-styled components that work out of the box
  - Building prototypes or MVPs quickly
  - Want consistent styling across the application
  - Don't have strict design requirements
  - Radix components are styled with Tailwind CSS and include animations

- **Use both together** - You can import from both categories in the same application

### Export Patterns

Each package's `src/index.ts` should clearly organize exports:

**Hook package (no "use client" banner):**

```typescript
// Type exports first (for tree-shaking)
export type * from "./hooks/...";

// Value exports
export * from "./hooks/...";
```

**Components package (multi-entry with "use client" banner):**

```typescript
// Type exports first (for tree-shaking)
export type * from "./ui/...";

// Value exports
export * from "./ui/...";
```

**Main package re-exports:**

```typescript
// Re-export types first (preserves type-only exports)
export type * from "@pelatform/ui.components/animation";
export * from "@pelatform/ui.components/animation";
```

**Entry point files (animation.ts, base.ts, radix.ts, hooks.ts):**

These simply re-export from their respective workspace packages for the multi-entry build:

## Workspace Protocol

This monorepo uses workspace protocol for internal dependencies. In package.json:

```json
"devDependencies": {
  "@pelatform/tsconfig": "workspace:*"
}
```

**Workspace Dependency Management**:

- Internal packages use `workspace:*` protocol (e.g., `@pelatform/ui.components: workspace:*`, `@pelatform/ui.hook: workspace:*`)
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

**CSS Location**: Main package CSS files are located in the source tree at `css/theme.css` with components in `css/styles/`. These are included in the published package (not in `dist/`) and exported via the `./css` and `./css/*` export paths.

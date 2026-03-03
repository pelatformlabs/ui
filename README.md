# Pelatform UI

**A comprehensive React UI library for TypeScript.**

Pelatform UI provides 170+ accessible components, 18 React hooks, and a complete styling system—all with full TypeScript support. Built for modern web applications with React 19, Tailwind CSS, Base UI, Radix UI, and TanStack.

## Why Pelatform UI?

Building UI in the React ecosystem often requires cobbling together multiple libraries and writing custom code for common patterns. Pelatform UI solves this by providing:

- **Complete Component Library**: 170+ production-ready components across animation, forms, data display, and more
- **Accessibility First**: WCAG 2.1 compliant components with keyboard navigation and screen reader support
- **Flexible Architecture**: Choose between headless base components or pre-styled Radix components
- **Production Ready**: Built with TypeScript, tested patterns, and optimized for performance
- **Developer Experience**: Tree-shakeable imports, organized paths, and comprehensive documentation

## Installation

```bash
bun add pelatform-ui

# Peer dependencies (if not already installed)
bun add react react-dom
```

## Quick Start

```typescript
import "pelatform-ui/css";
import { Button, Card, Input } from "pelatform-ui/radix";

function App() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Packages

This monorepo contains packages organized into a simplified V2 architecture:

### Components Package

- **[@pelatform/ui.components](./packages/components)** - All UI components in one package
  - **Animation** (18 components): Text effects, number animations, layout effects, backgrounds
  - **Base** (77 components): Headless components built on Base UI for full styling control
  - **Radix** (77 components): Pre-styled Radix UI components ready to use

### Hooks Package

- **[@pelatform/ui.hook](./packages/hook)** - 18 React hooks
  - `useHydrated`, `useIsMobile`, `useMediaQuery`, `useAnalytics`
  - `useCopyToClipboard`, `useFileUpload`, `useScrollPosition`
  - `useMutationObserver`, `useRecaptchaV2`, and more

### Main Package

- **[pelatform-ui](./packages/main)** - Main entry point
  - Re-exports all components and hooks from workspace packages
  - Custom components (layouts, navigation, MDX, providers, UI utilities)
  - Complete styling via `pelatform-ui/css`

### MCP Package

- **[@pelatform/mcp.ui](./packages/mcp)** - MCP server (private)
  - Model Context Protocol server for Pelatform UI documentation
  - Not published to npm

## Import Paths

```typescript
// Core utilities, types, icons
import { cn, cva } from "pelatform-ui";

// React hooks
import { useHydrated, useMobile, useMediaQuery } from "pelatform-ui/hooks";

// Animation components
import { ShimmeringText, CountingNumber, Marquee } from "pelatform-ui/animation";

// Base headless components (full styling control)
import { Button, Input, Select } from "pelatform-ui/base";

// Radix styled components (pre-styled)
import { Card, DataGrid, Calendar } from "pelatform-ui/radix";

// Custom Pelatform components
import { SiteHeader, SiteFooter, CommandMenu } from "pelatform-ui/components";

// Complete theme stylesheet
import "pelatform-ui/css";

// Individual component styles
import "pelatform-ui/css/button.css";
```

## Component Categories

### Animation Components (18)

- **Text Effects**: ShimmeringText, TextReveal, TypingText, VideoText, WordRotate
- **Number Animations**: CountingNumber, SlidingNumber
- **Layout Effects**: Marquee, GitHubButton
- **Backgrounds**: GradientBackground, GridBackground, HoverBackground

### Base Components (77)

Headless components built on Base UI for complete styling control:

- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Slider
- **Selection**: Combobox, Listbox, Autocomplete
- **Layout**: Accordion, Tabs, Dialog, Popover, Tooltip
- **Data**: Table, Pagination, Avatar, Badge

### Radix Components (77)

Pre-styled Radix UI components ready to use:

- **Layout**: Accordion, AspectRatio, Card, Collapsible, Resizable, Separator
- **Navigation**: Breadcrumb, Command, ContextMenu, DropdownMenu, Menubar, NavigationMenu
- **Forms**: Checkbox, Combobox, Input, Label, RadioGroup, Select, Slider, Switch, Textarea
- **Overlays**: Alert, AlertDialog, Dialog, Drawer, HoverCard, Popover, Sheet, Toast
- **Feedback**: Progress, Skeleton, Sonner (toasts)
- **Data Display**: Avatar, Badge, Calendar, Carousel, Chart, DataGrid, Table, Tree
- **Advanced**: DataGrid with filtering, sorting, pagination, drag-and-drop

### Custom Components

Layout, navigation, and utility components for complete applications:

- **Layout**: Auth, Blank, Body, ComingSoon, Error, Grid, Section, SiteHeader, SiteFooter, Wrapper
- **Navigation**: BackLink, CommandMenu, MainNav, MobileNav
- **Feedback**: Alert, Dialog, ScreenLoader
- **Providers**: QueryProvider, ThemeProvider
- **MDX**: CodeDisplay, Download, Link, Video, Wrapper, YouTube
- **UI**: Announcement, BackgroundPaths, Book, DotsPattern, GridBackground, HexagonBadge, ImageInput, LanguageSwitcher, Logo, ModeSwitcher, MovingBorder, Toolbar, UserAvatar
- **Utils**: Fonts, Shared

## Choosing Between Base and Radix

- **Use `pelatform-ui/base`** when:
  - Building a custom design system with specific styling requirements
  - Need complete control over component appearance
  - Want to minimize bundle size by only importing necessary styles
  - Creating components that must match existing brand guidelines

- **Use `pelatform-ui/radix`** when:
  - Need pre-styled components that work out of the box
  - Building prototypes or MVPs quickly
  - Want consistent styling across the application
  - Don't have strict design requirements

- **Use both together** - You can import from both categories in the same application

## Features

- 170+ total components across all packages
- 18 React hooks for common use cases
- Full dark mode support
- Responsive design
- Accessibility (WCAG 2.1)
- SSR-safe implementations
- Tree-shakeable exports
- TanStack Query integration
- Next.js optimized
- Tailwind CSS styling

## Contributing

We welcome contributions! This project is community-driven and your help makes it better.

**Getting Started:**

- Read the [Contributing Guide](./CONTRIBUTING.md) for development setup and guidelines
- Check the [Code of Conduct](./CODE_OF_CONDUCT.md)
- Browse [open issues](https://github.com/pelatformlabs/ui/issues) or start a [discussion](https://github.com/pelatformlabs/ui/discussions)

**Development:**

```bash
bun install          # Install dependencies
bun dev              # Run in development mode
bun build            # Build all packages
bun types:check      # Type-check
bun run lint         # Lint (Biome + turbo lint)
bun run format       # Format (Biome)
```

## Security

If you discover a security vulnerability, please send an email to **pelatformdev@gmail.com**. All security vulnerabilities will be promptly addressed.

Do not report security issues through public GitHub issues.

## Links

- [GitHub Repository](https://github.com/pelatformlabs/ui)
- [NPM Organization](https://www.npmjs.com/org/pelatform)
- [Issues](https://github.com/pelatformlabs/ui/issues)
- [Discussions](https://github.com/pelatformlabs/ui/discussions)

## License

MIT License - see [LICENSE](./LICENSE) for details.

By contributing to Pelatform UI, you agree that your contributions will be licensed under the MIT License.

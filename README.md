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
# Install the scoped package (recommended)
bun add @pelatform/ui

# Or install the main package directly
bun add pelatform-ui

# Peer dependencies (if not already installed)
bun add react react-dom
```

## Quick Start

```typescript
import { Button, Card, Input } from "@pelatform/ui/radix";
import "@pelatform/ui/css";

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

This monorepo contains packages organized into a simplified 3-package architecture:

### @pelatform/ui (Scope Package)

- **[@pelatform/ui](./packages/core)** - Scope package that re-exports from pelatform-ui
  - Multi-entry package with organized imports
  - Entry points: ., ./animation, ./base, ./components, ./hooks, ./radix
  - Published as scoped package for better organization

### pelatform-ui (Main Package)

- **[pelatform-ui](./packages/main)** - Main package with all components and hooks
  - **Animation** (14 components): Text effects, number animations, layout effects, backgrounds
  - **Base** (77 components): Headless components built on Base UI for full styling control
  - **Radix** (77 components): Pre-styled Radix UI components ready to use
  - **Custom** (2+ components): Icons, Logo, and other Pelatform-specific components
  - **Hooks** (18 hooks): React hooks for common use cases

### @pelatform/mcp.ui (MCP Server)

- **[@pelatform/mcp.ui](./packages/mcp)** - MCP server (private)
  - Model Context Protocol server for Pelatform UI documentation
  - Not published to npm

## Import Paths

You can use either the scoped package (`@pelatform/ui`) or the main package (`pelatform-ui`):

```typescript
// Using scoped package (recommended)
import { useHydrated, useMobile } from "@pelatform/ui/hooks";
import { ShimmeringText } from "@pelatform/ui/animation";
import { Button } from "@pelatform/ui/base";
import { Card } from "@pelatform/ui/radix";
import { Icons, Logo } from "@pelatform/ui/components";
import "@pelatform/ui/css";

// Or using main package directly
import { useHydrated } from "pelatform-ui/hooks";
import { ShimmeringText } from "pelatform-ui/animation";
import { Button } from "pelatform-ui/base";
import { Card } from "pelatform-ui/radix";
import "@pelatform/ui/css";
```

**Note**: Both packages provide the same imports. The scoped package (`@pelatform/ui`) is recommended for better organization and to follow npm best practices.

## Component Categories

### Animation Components (14)

- **Text Effects**: ShimmeringText, TextReveal, TypingText, VideoText, WordRotate, SvgText
- **Number Animations**: CountingNumber, SlidingNumber
- **Layout Effects**: Marquee, GitHubButton, AvatarGroup
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
- **Forms**: Checkbox, Combobox, Form, Input, Label, RadioGroup, Select, Slider, Switch, Textarea
- **Overlays**: AlertDialog, Dialog, Drawer, DropdownMenu, HoverCard, Popover, Sheet, Toast
- **Feedback**: Alert, Progress, Skeleton, Sonner
- **Data Display**: Avatar, Badge, Calendar, Carousel, Chart, DataGrid, Table, Tree
- **Advanced**: DataGrid with filtering, sorting, pagination, drag-and-drop

### Custom Components

Pelatform-specific components:

- **Icons**: Icon components and utilities
- **Logo**: Pelatform logo component
- **And more**: Additional custom components for specific use cases

### Hooks (18)

- **Analytics**: useAnalytics
- **DOM Interactions**: useBodyClass, useCopyToClipboard, useFileUpload, useScrollPosition, useSliderInput
- **Detection**: useHydrated (SSR-safe), useIntersectionObserver, useIsMac, useIsMobile, useMediaQuery, useMounted, useMutationObserver, useViewport
- **Features**: useMenu, useRecaptchaV2, useRemoveGAParams

## Choosing Between Base and Radix

- **Use `@pelatform/ui/base`** when:
  - Building a custom design system with specific styling requirements
  - Need complete control over component appearance
  - Want to minimize bundle size by only importing necessary styles
  - Creating components that must match existing brand guidelines

- **Use `@pelatform/ui/radix`** when:
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

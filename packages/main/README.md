# pelatform-ui

[![Version](https://img.shields.io/npm/v/pelatform-ui.svg)](https://www.npmjs.com/package/pelatform-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A Modern and Minimal React UI Library built with TailwindCSS.**

The main package that provides all Pelatform UI components, hooks, utilities, and styles.

## Installation

```bash
# Install the main package directly
bun add pelatform-ui

# Or install the scoped package (recommended)
bun add @pelatform/ui
```

### Peer Dependencies

Make sure you have these installed:

```bash
bun add react react-dom
```

## Package Overview

`pelatform-ui` is the main package containing all UI components, hooks, and styles for the Pelatform UI library.

## Import Paths

```typescript
// React hooks
import { useHydrated, useMobile, useMediaQuery } from "pelatform-ui/hooks";

// Animation components
import {
  ShimmeringText,
  CountingNumber,
  Marquee,
} from "pelatform-ui/animation";

// Base headless components (full styling control)
import { Button, Input, Select } from "pelatform-ui/base";

// Radix styled components (pre-styled)
import { Card, DataGrid, Calendar } from "pelatform-ui/radix";

// Custom Pelatform components
import { Icons, Logo } from "pelatform-ui/components";

// Styles
import "@pelatform/ui/css";
```

## Entry Points

This package provides 6 organized entry points:

### Animation (`./animation`)

14 animation components for text effects, number animations, layout effects, and backgrounds:

```typescript
import {
  ShimmeringText,
  TextReveal,
  TypingText,
  VideoText,
  WordRotate,
  SvgText,
  CountingNumber,
  SlidingNumber,
  Marquee,
  GitHubButton,
  AvatarGroup,
  GradientBackground,
  GridBackground,
  HoverBackground,
} from "pelatform-ui/animation";
```

### Base (`./base`)

77 headless components built on Base UI for complete styling control:

```typescript
import {
  // Forms
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Slider,

  // Selection
  Combobox,
  Listbox,
  Autocomplete,

  // Layout
  Accordion,
  Tabs,
  Dialog,
  Popover,
  Tooltip,

  // Data
  Table,
  Pagination,
  Avatar,
  Badge,
} from "pelatform-ui/base";
```

### Components (`./components`)

Custom Pelatform components:

```typescript
import { Icons, Logo } from "pelatform-ui/components";
```

### Hooks (`./hooks`)

18 React hooks for common use cases:

```typescript
import {
  // Analytics
  useAnalytics,

  // DOM Interactions
  useBodyClass,
  useCopyToClipboard,
  useFileUpload,
  useScrollPosition,
  useSliderInput,

  // Detection
  useHydrated,
  useIntersectionObserver,
  useIsMac,
  useIsMobile,
  useMediaQuery,
  useMounted,
  useMutationObserver,
  useViewport,

  // Features
  useMenu,
  useRecaptchaV2,
  useRemoveGAParams,
} from "pelatform-ui/hooks";
```

### Radix (`./radix`)

77 pre-styled Radix UI components:

```typescript
import {
  // Layout & Structure
  Accordion,
  Card,
  Resizable,
  Separator,

  // Navigation
  Breadcrumb,
  Command,
  ContextMenu,
  DropdownMenu,
  Menubar,
  NavigationMenu,
  Tabs,

  // Forms
  Checkbox,
  Combobox,
  Form,
  Input,
  Label,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Textarea,

  // Overlays
  AlertDialog,
  Dialog,
  Drawer,
  HoverCard,
  Popover,
  Sheet,
  Toast,

  // Feedback
  Alert,
  Progress,
  Skeleton,
  Sonner,

  // Data Display
  Avatar,
  Badge,
  Calendar,
  Carousel,
  Chart,
  DataGrid,
  Table,
  Tree,
} from "pelatform-ui/radix";
```

## Quick Start

```typescript
import { Card, Button, Input } from "pelatform-ui/radix";
import { useHydrated } from "pelatform-ui/hooks";
import "@pelatform/ui/css";

function App() {
  const hydrated = useHydrated();

  if (!hydrated) return null;

  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Styling

Import the CSS in your app:

```typescript
import "@pelatform/ui/css";
```

CSS includes:

- Theme variables
- Component styles
- Animation utilities
- Pattern backgrounds
- Custom transitions

You can also import individual CSS files:

```typescript
// Main theme (includes animations)
import "@pelatform/ui/css";

// Color variants
import "@pelatform/ui/color/slate";
import "@pelatform/ui/color/gray";
import "@pelatform/ui/color/neutral";
import "@pelatform/ui/color/stone";
import "@pelatform/ui/color/zinc";

// Theme styles
import "@pelatform/ui/styles/style-vega";
import "@pelatform/ui/styles/style-nova";
import "@pelatform/ui/styles/style-mira";
import "@pelatform/ui/styles/style-maia";
import "@pelatform/ui/styles/style-lyra";
```

## Hooks

18 production-ready hooks for common use cases:

### Analytics & Tracking

- **useAnalytics** - CRUD operation tracking

### Responsive Design

- **useMediaQuery** - Media query tracking
- **useIsMobile** - Mobile detection
- **useViewport** - Viewport dimensions
- **useIntersectionObserver** - Intersection observation

### Form & Input Management

- **useFileUpload** - File upload with drag & drop
- **useSliderInput** - Slider input management
- **useCopyToClipboard** - Clipboard operations

### Navigation & Scrolling

- **useMenu** - Menu navigation state
- **useScrollPosition** - Scroll tracking

### DOM Management

- **useBodyClass** - Body class management
- **useMutationObserver** - DOM mutation observation

### Platform Detection

- **useIsMac** - macOS detection

### Security

- **useRecaptchaV2** - reCAPTCHA integration

### Utilities

- **useMounted** - Mount state detection
- **useHydrated** - SSR-safe hydration detection
- **useRemoveGAParams** - GA parameter cleanup

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all components and hooks:

```typescript
import type { ButtonProps } from "pelatform-ui/base";
import type { DataGridProps } from "pelatform-ui/radix";
```

## Features

- 170+ production-ready components
- 18 React hooks for common use cases
- Full dark mode support
- Responsive design
- Accessibility (WCAG 2.1)
- SSR-safe implementations
- Tree-shakeable exports
- Next.js optimized
- Tailwind CSS styling

## Dependencies

### Production Dependencies

- `class-variance-authority` - Component variants
- `recharts` - Chart components
- `tw-animate-css` - Animation utilities

### Peer Dependencies

- `react`
- `react-dom`
- `@base-ui/react`
- `@dnd-kit/core`
- `@dnd-kit/modifiers`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`
- `@headless-tree/core`
- `@pelatform/utils`
- `@tanstack/react-table`
- `cmdk`
- `date-fns`
- `embla-carousel-react`
- `input-otp`
- `lucide-react`
- `motion`
- `next-themes`
- `radix-ui`
- `react-day-picker`
- `react-phone-number-input`
- `react-resizable-panels`
- `sonner`
- `vaul`

## Related Packages

- **[@pelatform/ui](https://www.npmjs.com/package/@pelatform/ui)** - Scope package with organized imports
- **[@pelatform/mcp.ui](https://github.com/pelatformlabs/ui/tree/main/packages/mcp)** - MCP server for documentation

## Choosing Between Base and Radix

- **Use Base components** when:
  - Building a custom design system
  - Need complete styling control
  - Want minimal bundle size
  - Creating brand-specific components

- **Use Radix components** when:
  - Need pre-styled components
  - Building prototypes quickly
  - Want consistent styling
  - Don't have strict design requirements

- **Use both** - Import from both categories in the same application

## Links

- [npm Package](https://www.npmjs.com/package/pelatform-ui)
- [GitHub Repository](https://github.com/pelatformlabs/ui)
- [Contributing Guide](../../CONTRIBUTING.md)
- [Code of Conduct](../../CODE_OF_CONDUCT.md)
- [License](../../LICENSE)

## License

MIT © [Pelatform Inc.](../../LICENSE)

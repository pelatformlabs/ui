# @pelatform/ui

[![Version](https://img.shields.io/npm/v/@pelatform/ui.svg)](https://www.npmjs.com/package/@pelatform/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A Modern and Minimal React UI Library built with TailwindCSS.**

This is the **scope package** for Pelatform UI that provides organized, multi-entry imports to all components, hooks, and utilities from the main `pelatform-ui` package.

## Installation

```bash
bun add @pelatform/ui
```

### Peer Dependencies

Make sure you have these installed:

```bash
bun add react react-dom
```

## Package Overview

`@pelatform/ui` is a scope package that re-exports everything from `pelatform-ui` with organized entry points for better tree-shaking and clearer imports.

## Import Paths

```typescript
// React hooks
import { useHydrated, useMobile, useMediaQuery } from "@pelatform/ui/hooks";

// Animation components
import {
  ShimmeringText,
  CountingNumber,
  Marquee,
} from "@pelatform/ui/animation";

// Base headless components (full styling control)
import { Button, Input, Select } from "@pelatform/ui/base";

// Radix styled components (pre-styled)
import { Card, DataGrid, Calendar } from "@pelatform/ui/radix";

// Custom Pelatform components
import { Icons, Logo } from "@pelatform/ui/components";

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
} from "@pelatform/ui/animation";
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
} from "@pelatform/ui/base";
```

### Components (`./components`)

Custom Pelatform components:

```typescript
import { Icons, Logo } from "@pelatform/ui/components";
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
} from "@pelatform/ui/hooks";
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
} from "@pelatform/ui/radix";
```

## Quick Start

```typescript
import { Card, Button, Input } from "@pelatform/ui/radix";
import { useHydrated } from "@pelatform/ui/hooks";
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

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all components and hooks:

```typescript
import type { ButtonProps } from "@pelatform/ui/base";
import type { DataGridProps } from "@pelatform/ui/radix";
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

### Peer Dependencies

This package requires these peer dependencies to be installed:

```json
{
  "@base-ui/react": ">=1.2.0",
  "@dnd-kit/core": ">=6.3.0",
  "@dnd-kit/modifiers": ">=9.0.0",
  "@dnd-kit/sortable": ">=10.0.0",
  "@dnd-kit/utilities": ">=3.2.0",
  "@headless-tree/core": ">=1.6.0",
  "@pelatform/utils": ">=1.0.15",
  "@tanstack/react-table": ">=8.20.0",
  "cmdk": ">=1.1.0",
  "date-fns": ">=4.1.0",
  "embla-carousel-react": ">=8.6.0",
  "input-otp": ">=1.4.0",
  "lucide-react": ">=0.577.0",
  "motion": ">=12.35.0",
  "next-themes": ">=0.4.5",
  "pelatform-ui": ">=1.2.0",
  "radix-ui": ">=1.4.0",
  "react": ">=18.0.0 || >=19.0.0-rc.0",
  "react-day-picker": ">=9.14.0",
  "react-dom": ">=18.0.0 || >=19.0.0-rc.0",
  "react-phone-number-input": ">=3.4.0",
  "react-resizable-panels": ">=4.7.0",
  "sonner": ">=2.0.5",
  "tsup": ">=8.5.0",
  "typescript": ">=5.9.0",
  "vaul": ">=1.1.0"
}
```

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

## Related Packages

- **[pelatform-ui](https://www.npmjs.com/package/pelatform-ui)** - Main package with all components and hooks
- **[@pelatform/mcp.ui](https://github.com/pelatformlabs/ui/tree/main/packages/mcp)** - MCP server for documentation

## Links

- [npm Package](https://www.npmjs.com/package/@pelatform/ui)
- [GitHub Repository](https://github.com/pelatformlabs/ui)
- [Contributing Guide](../../CONTRIBUTING.md)
- [Code of Conduct](../../CODE_OF_CONDUCT.md)
- [License](../../LICENSE)

## License

MIT © [Pelatform Inc.](../../LICENSE)

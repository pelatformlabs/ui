# pelatform-ui

[![Version](https://img.shields.io/npm/v/pelatform-ui.svg)](https://www.npmjs.com/package/pelatform-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Modern and Minimal React UI Library built with TailwindCSS. The main package that provides access to all Pelatform UI components, hooks, and utilities through a unified interface.

## Installation

```bash
bun add pelatform-ui
```

### Peer Dependencies

Make sure you have these installed:

```bash
bun add react react-dom @tanstack/react-query lucide-react motion next-themes sonner
```

### Import Styles

```typescript
import "pelatform-ui/css";
```

## Package Structure

pelatform-ui is the main entry point that consolidates all Pelatform UI packages:

- **@pelatform/ui.components** - All UI components (172 components)
  - Animation (18 components)
  - Base (77 headless components)
  - Radix (77 styled components)
- **@pelatform/ui.hook** - React hooks (18 hooks)
- **Custom components** - Ready-to-use layouts, navigation, providers, and utilities

## Import Paths

```typescript
// Main exports (utilities, types, icons)
import { cn, cva } from "pelatform-ui";

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
import { SiteHeader, SiteFooter, CommandMenu } from "pelatform-ui/components";

// Styles
import "pelatform-ui/css";
```

## Quick Start

```typescript
import { Card, Button, Input } from "pelatform-ui/radix";
import { useHydrated } from "pelatform-ui/hooks";
import "pelatform-ui/css";

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

## Custom Components

### Layout Components

- **Auth** - Authentication page layout
- **Blank** - Minimal blank layout
- **Body** - Main content body
- **ComingSoon** - Coming soon page
- **Error** - Error page layout
- **Grid** - Grid-based layout
- **Section** - Content section
- **SiteHeader** - Sticky header with blur
- **SiteFooter** - Site footer
- **Wrapper** - Container wrapper

### Navigation Components

- **BackLink** - Back navigation link
- **CommandMenu** - Command palette
- **MainNav** - Main navigation menu
- **MobileNav** - Mobile navigation

### Feedback Components

- **Alert** - Alert notifications
- **Dialog** - Modal dialog
- **ScreenLoader** - Loading screen

### UI Components

- **Announcement** - Announcement banner with tags
- **BackgroundPaths** - Decorative backgrounds
- **Book** - Book/document display
- **DotsPattern** - Dot pattern background
- **GridBackground** - Grid pattern background
- **HexagonBadge** - Hexagon-shaped badge
- **ImageInput** - Image upload input
- **LanguageSwitcher** - Language selector
- **Logo** - Brand logo
- **ModeSwitcher** - Theme mode toggle
- **MovingBorder** - Animated border effect
- **Toolbar** - Toolbar component
- **UserAvatar** - User avatar display

### Provider Components

- **QueryProvider** - TanStack Query provider
- **ThemeProvider** - Theme management (next-themes)

### MDX Components

- **CodeDisplay** - Code snippet display
- **Download** - Download link
- **Link** - Custom link
- **Video** - Video embed
- **Wrapper** - MDX content wrapper
- **YouTube** - YouTube embed

### Utility Components

- **Fonts** - Font configuration
- **Shared** - Shared utilities

## Theme Management

```typescript
import { ThemeProvider } from "pelatform-ui/components";

function App({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
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

## Styling

The package uses Tailwind CSS with custom theme configuration. Import the CSS in your app:

```typescript
import "pelatform-ui/css";
```

CSS includes:

- Theme variables
- Component styles
- Animation utilities
- Pattern backgrounds
- Custom transitions

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all components and hooks.

## Features

- 172+ total components across all packages
- 18 React hooks for common use cases
- Full dark mode support
- Responsive design
- Accessibility (WCAG 2.1)
- SSR-safe implementations
- Tree-shakeable exports
- TanStack Query integration
- Next.js optimized
- Tailwind CSS styling

## Dependencies

### Production Dependencies

- `class-variance-authority` - Component variants
- `clsx` - Conditional className
- `tailwind-merge` - Tailwind class merging
- `tw-animate-css` - Animation utilities

### Peer Dependencies

- `react`
- `react-dom`
- `@tanstack/react-query`
- `lucide-react`
- `motion`
- `next-themes`
- `sonner`

## Links

- [npm Package](https://www.npmjs.com/package/pelatform-ui)
- [Contributing Guide](../../../CONTRIBUTING.md)
- [Code of Conduct](../../../CODE_OF_CONDUCT.md)
- [License](../../../LICENSE)

## License

MIT © [Pelatform Inc.](../../../LICENSE)

# @pelatform/ui.components

[![Version](https://img.shields.io/npm/v/@pelatform/ui.components.svg)](https://www.npmjs.com/package/@pelatform/ui.components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

All UI components for the Pelatform UI Library. This package provides 170+ production-ready components organized into three categories: Animation (18), Base (77), and Radix (77).

## Installation

```bash
# Using bun
bun add @pelatform/ui.components

# Using npm
npm install @pelatform/ui.components
```

## Import Styles

```typescript
import "@pelatform/ui.components/css";
```

## Package Structure

This package uses a multi-entry build system with three organized entry points:

- **Main entry** (`@pelatform/ui.components`) - All components
- **Animation** (`@pelatform/ui.components/animation`) - 18 animation components
- **Base** (`@pelatform/ui.components/base`) - 77 headless components
- **Radix** (`@pelatform/ui.components/radix`) - 77 styled components

## Import Paths

```typescript
// Animation components
import {
  ShimmeringText,
  TextReveal,
  TypingText,
  CountingNumber,
  Marquee,
} from "@pelatform/ui.components/animation";

// Base headless components (full styling control)
import {
  Button,
  Input,
  Select,
  Dialog,
  Tooltip,
} from "@pelatform/ui.components/base";

// Radix styled components (pre-styled)
import {
  Accordion,
  Card,
  DataGrid,
  Calendar,
  Command,
} from "@pelatform/ui.components/radix";

// All components (not recommended - use specific imports)
import { Button, Card } from "@pelatform/ui.components";

// Styles
import "@pelatform/ui.components/css";
```

## Components

### Animation (18 Components)

Text effects, number animations, layout effects, and backgrounds.

#### Text Effects

- **ShimmeringText** - Shimmering gradient text effect
- **TextReveal** - Text reveal animation
- **TypingText** - Typewriter text effect
- **VideoText** - Video-masked text effect
- **WordRotate** - Word rotation animation

#### Number Animations

- **CountingNumber** - Animated counter with counting effect
- **SlidingNumber** - Sliding number animation

#### Layout Effects

- **Marquee** - Infinite scrolling marquee
- **GitHubButton** - GitHub-style social button with hover effect

#### Backgrounds

- **GradientBackground** - Animated gradient background
- **GridBackground** - Grid pattern background
- **HoverBackground** - Interactive hover background
- **HexagonBadge** - Hexagon-shaped badge component

### Base (77 Components)

Headless components built on Base UI for complete styling control.

#### Forms

- **Input** - Accessible input field
- **Textarea** - Multi-line text input
- **Select** - Dropdown select component
- **Checkbox** - Checkbox input
- **Radio** - Radio button group
- **Switch** - Toggle switch
- **Slider** - Range slider input

#### Selection

- **Combobox** - ComboBox with search/filter
- **Listbox** - Listbox for single selection
- **Autocomplete** - Autocomplete input

#### Layout

- **Accordion** - Collapsible accordion
- **Tabs** - Tab navigation
- **Dialog** - Modal dialog
- **Popover** - Popover overlay
- **Tooltip** - Tooltip component
- **Collapsible** - Collapsible section

#### Data Display

- **Table** - Accessible data table
- **Pagination** - Pagination component
- **Avatar** - User avatar
- **Badge** - Status badge

#### Navigation

- **Breadcrumb** - Breadcrumb navigation
- **Menubar** - Menu bar component

#### Overlays

- **Alert** - Alert notifications
- **AlertDialog** - Alert dialog
- **Dialog** - Modal dialog
- **Popover** - Popover overlay
- **Tooltip** - Tooltip component

### Radix (77 Components)

Pre-styled Radix UI components ready to use.

#### Layout & Structure

- **Accordion** - Collapsible accordion
- **AspectRatio** - Aspect ratio container
- **Card** - Card component
- **Collapsible** - Collapsible section
- **Resizable** - Resizable panels
- **Separator** - Visual separator

#### Navigation

- **Breadcrumb** - Breadcrumb navigation
- **Command** - Command palette
- **ContextMenu** - Context menu
- **DropdownMenu** - Dropdown menu
- **Menubar** - Menu bar
- **NavigationMenu** - Navigation menu
- **Tabs** - Tab navigation

#### Forms

- **Checkbox** - Checkbox input
- **Combobox** - Combobox with search
- **Form** - Form component with validation
- **Input** - Input field
- **Label** - Form label
- **RadioGroup** - Radio button group
- **Select** - Dropdown select
- **Slider** - Range slider
- **Switch** - Toggle switch
- **Textarea** - Multi-line text input

#### Overlays

- **AlertDialog** - Alert dialog
- **Dialog** - Modal dialog
- **Drawer** - Side drawer
- **DropdownMenu** - Dropdown menu
- **HoverCard** - Hover card
- **Popover** - Popover overlay
- **Sheet** - Sheet component
- **Tooltip** - Tooltip component
- **Toast** - Toast notifications (Sonner)

#### Feedback

- **Alert** - Alert notifications
- **Progress** - Progress indicator
- **Skeleton** - Loading skeleton
- **Sonner** - Toast notifications

#### Data Display

- **Avatar** - User avatar
- **Badge** - Status badge
- **Calendar** - Calendar component
- **Carousel** - Image/content carousel
- **Chart** - Chart components (Recharts)
- **DataGrid** - Advanced data table with filtering/sorting/pagination/dnd
- **Table** - Data table
- **Tree** - Tree view component

#### Advanced Components

- **DataGrid** - Full-featured data grid with:
  - Column filtering
  - Column header with visibility toggle
  - Pagination
  - Drag-and-drop rows
  - Sorting capabilities

## Quick Start

### Using Animation Components

```typescript
import { ShimmeringText, CountingNumber, Marquee } from "@pelatform/ui.components/animation";
import "@pelatform/ui.components/css";

function App() {
  return (
    <div>
      <ShimmeringText text="Hello World" />
      <CountingNumber end={1000} duration={2000} />
      <Marquee>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Marquee>
    </div>
  );
}
```

### Using Base Components

```typescript
import { Button, Input, Dialog } from "@pelatform/ui.components/base";
import "@pelatform/ui.components/css";

function App() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
```

### Using Radix Components

```typescript
import { Card, Button, DataGrid } from "@pelatform/ui.components/radix";
import "@pelatform/ui.components/css";

function App() {
  const data = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
  ];

  return (
    <Card>
      <DataGrid data={data} />
      <Button>Click me</Button>
    </Card>
  );
}
```

## Styling

This package uses Tailwind CSS with custom theme configuration. Import the CSS in your app:

```typescript
import "@pelatform/ui.components/css";
```

CSS includes:

- Theme variables
- Component styles
- Animation utilities
- Pattern backgrounds
- Custom transitions

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all components:

```typescript
import type { ButtonProps } from "@pelatform/ui.components/base";
import type { DataGridProps } from "@pelatform/ui.components/radix";
```

## Features

- 170+ production-ready components
- Full dark mode support
- Responsive design
- Accessibility (WCAG 2.1)
- SSR-safe implementations
- Tree-shakeable exports
- Next.js optimized with "use client" directive
- Tailwind CSS styling

## Dependencies

### Production Dependencies

- `class-variance-authority` - Component variants
- `clsx` - Conditional className
- `tailwind-merge` - Tailwind class merging
- `tw-animate-css` - Animation utilities

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
  "@tanstack/react-table": ">=8.21.0",
  "class-variance-authority": ">=0.7.0",
  "clsx": ">=2.1.0",
  "cmdk": ">=1.1.0",
  "date-fns": ">=4.1.0",
  "embla-carousel-react": ">=8.6.0",
  "input-otp": ">=1.4.0",
  "lucide-react": ">=0.575.0",
  "motion": ">=12.30.0",
  "next-themes": ">=0.4.6",
  "radix-ui": ">=1.4.0",
  "react": ">=18.0.0 || >=19.0.0-rc.0",
  "react-dom": ">=18.0.0 || >=19.0.0-rc.0",
  "react-day-picker": ">=9.13.0",
  "react-phone-number-input": ">=3.4.0",
  "react-resizable-panels": ">=4.6.0",
  "recharts": "2.15.1",
  "sonner": ">=2.0.0",
  "tailwind-merge": ">=3.5.0",
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

## Links

- [npm Package](https://www.npmjs.com/package/@pelatform/ui.components)
- [Contributing Guide](../../../CONTRIBUTING.md)
- [Code of Conduct](../../../CODE_OF_CONDUCT.md)
- [License](../../../LICENSE)

## License

MIT © [Pelatform Inc.](../../../LICENSE)

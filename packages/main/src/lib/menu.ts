import type { ComponentProps, ComponentType, SVGProps } from "react";

import type { Badge } from "../ui/radix/badge";

/**
 * Menu item interface
 */
export interface MenuItem {
  /** Heading text */
  heading?: string;
  /** Menu item title */
  title?: string;
  /** Navigation path */
  path?: string;
  /** Menu item icon component */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Whether to show separator */
  separator?: boolean;

  /** Root path for active state matching */
  rootPath?: string;
  /** Child menu items */
  children?: MenuConfig;
  /** Children index for nested items */
  childrenIndex?: number;

  /** Whether the item is external */
  external?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Disable text */
  disabledText?: string;

  /** Badge text */
  badge?: string;
  /** Badge variant */
  badgeVariant?: ComponentProps<typeof Badge>["variant"];

  /** Collapse configuration */
  collapse?: boolean;
  /** Title when collapsed */
  collapseTitle?: string;
  /** Title when expanded */
  expandTitle?: string;
}

/**
 * Type aliases for backward compatibility
 */
export type MenuConfig = MenuItem[];

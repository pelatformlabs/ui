"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";

import { cn } from "../../lib/cn";
import { ScrollArea } from "./scroll-area";

const inputVariants = cva(
  "flex w-full style-lyra:rounded-none style-maia:rounded-4xl style-mira:rounded-md style-nova:rounded-lg style-vega:rounded-md border border-input style-lyra:bg-transparent style-maia:bg-input/30 style-mira:bg-input/20 style-nova:bg-transparent style-vega:bg-transparent style-lyra:text-xs style-maia:text-sm style-mira:text-xs/relaxed style-nova:text-sm style-vega:text-sm text-foreground style-vega:shadow-xs outline-none style-lyra:transition-colors style-maia:transition-colors style-mira:transition-colors style-nova:transition-colors style-vega:transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring style-lyra:focus-visible:ring-1 style-lyra:focus-visible:ring-ring/50 style-maia:focus-visible:ring-[3px] style-maia:focus-visible:ring-ring/50 style-mira:focus-visible:ring-2 style-mira:focus-visible:ring-ring/30 style-nova:focus-visible:ring-3 style-nova:focus-visible:ring-ring/50 style-vega:focus-visible:ring-3 style-vega:focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 style-lyra:aria-invalid:ring-1 style-maia:aria-invalid:ring-[3px] style-mira:aria-invalid:ring-2 style-nova:aria-invalid:ring-3 style-vega:aria-invalid:ring-3 style-lyra:dark:bg-input/30 style-mira:dark:bg-input/30 style-nova:dark:bg-input/30 style-vega:dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [[readonly]]:cursor-not-allowed [[readonly]]:bg-muted/80",
  {
    variants: {
      size: {
        sm: "style-lyra:h-7 style-maia:h-8 style-mira:h-6 style-nova:h-7 style-vega:h-8 style-lyra:px-2 style-maia:px-3 style-mira:px-2 style-nova:px-2 style-vega:px-2.5 style-lyra:[&~[data-slot=autocomplete-clear]]:end-1.5 style-maia:[&~[data-slot=autocomplete-clear]]:end-2.5 style-mira:[&~[data-slot=autocomplete-clear]]:end-1.25 style-nova:[&~[data-slot=autocomplete-clear]]:end-1.5 style-vega:[&~[data-slot=autocomplete-clear]]:end-1.75 style-lyra:[&~[data-slot=autocomplete-trigger]]:end-1.5 style-maia:[&~[data-slot=autocomplete-trigger]]:end-2.5 style-mira:[&~[data-slot=autocomplete-trigger]]:end-1.25 style-nova:[&~[data-slot=autocomplete-trigger]]:end-1.5 style-vega:[&~[data-slot=autocomplete-trigger]]:end-1.75",
        default:
          "style-lyra:h-8 style-maia:h-9 style-mira:h-7 style-nova:h-8 style-vega:h-9 style-lyra:px-2.5 style-maia:px-3 style-mira:px-2 style-nova:px-2.5 style-vega:px-3 style-lyra:[&~[data-slot=autocomplete-clear]]:end-1.75 style-maia:[&~[data-slot=autocomplete-clear]]:end-2.5 style-mira:[&~[data-slot=autocomplete-clear]]:end-1.5 style-nova:[&~[data-slot=autocomplete-clear]]:end-1.75 style-vega:[&~[data-slot=autocomplete-clear]]:end-2 style-lyra:[&~[data-slot=autocomplete-trigger]]:end-1.75 style-maia:[&~[data-slot=autocomplete-trigger]]:end-2.5 style-mira:[&~[data-slot=autocomplete-trigger]]:end-1.5 style-nova:[&~[data-slot=autocomplete-trigger]]:end-1.75 style-vega:[&~[data-slot=autocomplete-trigger]]:end-2",
        lg: "style-lyra:h-9 style-maia:h-10 style-mira:h-8 style-nova:h-9 style-vega:h-10 style-lyra:px-2.5 style-maia:px-4 style-mira:px-2.5 style-nova:px-2.5 style-vega:px-3.5 style-lyra:[&~[data-slot=autocomplete-clear]]:end-2 style-maia:[&~[data-slot=autocomplete-clear]]:end-3 style-mira:[&~[data-slot=autocomplete-clear]]:end-1.75 style-nova:[&~[data-slot=autocomplete-clear]]:end-2 style-vega:[&~[data-slot=autocomplete-clear]]:end-2.5 style-lyra:[&~[data-slot=autocomplete-trigger]]:end-2 style-maia:[&~[data-slot=autocomplete-trigger]]:end-3 style-mira:[&~[data-slot=autocomplete-trigger]]:end-1.75 style-nova:[&~[data-slot=autocomplete-trigger]]:end-2 style-vega:[&~[data-slot=autocomplete-trigger]]:end-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const Autocomplete = AutocompletePrimitive.Root;

function AutocompleteValue({ ...props }: AutocompletePrimitive.Value.Props) {
  return <AutocompletePrimitive.Value data-slot="autocomplete-value" {...props} />;
}

function AutocompleteInput({
  className,
  size = "default",
  showClear = false,
  showTrigger = false,
  ...props
}: Omit<AutocompletePrimitive.Input.Props, "size"> &
  VariantProps<typeof inputVariants> & {
    showClear?: boolean;
    showTrigger?: boolean;
  }) {
  return (
    <div className="relative w-full">
      <AutocompletePrimitive.Input
        data-slot="autocomplete-input"
        data-size={size}
        className={cn(inputVariants({ size }), className)}
        {...props}
      />
      {showTrigger && <AutocompleteTrigger />}
      {showClear && <AutocompleteClear />}
    </div>
  );
}

function AutocompleteStatus({ className, ...props }: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status
      data-slot="autocomplete-status"
      className={cn(
        "style-lyra:px-2 style-maia:px-3 style-mira:px-2 style-nova:px-2 style-vega:px-2 style-lyra:py-1.5 style-maia:py-2 style-mira:py-1 style-nova:py-1.5 style-vega:py-1.5 style-lyra:text-xs style-maia:text-sm style-mira:text-xs/relaxed style-nova:text-sm style-vega:text-sm text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function AutocompletePortal({ ...props }: AutocompletePrimitive.Portal.Props) {
  return <AutocompletePrimitive.Portal data-slot="autocomplete-portal" {...props} />;
}

function AutocompleteBackdrop({ ...props }: AutocompletePrimitive.Backdrop.Props) {
  return <AutocompletePrimitive.Backdrop data-slot="autocomplete-backdrop" {...props} />;
}

function AutocompletePositioner({ className, ...props }: AutocompletePrimitive.Positioner.Props) {
  return (
    <AutocompletePrimitive.Positioner
      data-slot="autocomplete-positioner"
      className={cn("z-50 outline-none", className)}
      {...props}
    />
  );
}

function AutocompleteList({
  className,
  scrollAreaClassName,
  ...props
}: AutocompletePrimitive.List.Props & {
  scrollAreaClassName?: string;
  scrollFade?: boolean;
  scrollbarGutter?: boolean;
}) {
  return (
    <ScrollArea
      className={cn(
        "size-full min-h-0 **:data-[slot=scroll-area-viewport]:h-full **:data-[slot=scroll-area-viewport]:overscroll-contain",
        scrollAreaClassName,
      )}
    >
      <AutocompletePrimitive.List
        data-slot="autocomplete-list"
        className={cn(
          "in-data-has-overflow-y:me-3 not-empty:scroll-py-1 style-maia:not-empty:px-1 style-mira:not-empty:px-1 style-nova:not-empty:px-1 style-vega:not-empty:px-1 style-maia:not-empty:py-1 style-mira:not-empty:py-1 style-nova:not-empty:py-1 style-vega:not-empty:py-1",
          className,
        )}
        {...props}
      />
    </ScrollArea>
  );
}

function AutocompleteCollection({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Collection>) {
  return <AutocompletePrimitive.Collection data-slot="autocomplete-collection" {...props} />;
}

function AutocompleteRow({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Row>) {
  return (
    <AutocompletePrimitive.Row
      data-slot="autocomplete-row"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function AutocompleteItem({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Item>) {
  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-item"
      className={cn(
        "relative flex cursor-default select-none items-center style-lyra:gap-2 style-maia:gap-2.5 style-mira:gap-2 style-nova:gap-1.5 style-vega:gap-2 style-lyra:rounded-none style-maia:rounded-xl style-mira:rounded-md style-nova:rounded-md style-vega:rounded-sm style-lyra:px-2 style-maia:px-3 style-mira:px-2 style-nova:px-1.5 style-vega:px-2 style-lyra:py-2 style-maia:py-2 style-mira:py-1 style-nova:py-1 style-vega:py-1.5 style-lyra:text-xs style-maia:text-sm style-mira:text-xs/relaxed style-nova:text-sm style-vega:text-sm text-foreground outline-hidden transition-colors data-disabled:pointer-events-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-foreground data-disabled:opacity-50 data-highlighted:before:absolute data-highlighted:before:inset-x-0 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] style-lyra:data-highlighted:before:rounded-none style-maia:data-highlighted:before:rounded-lg style-mira:data-highlighted:before:rounded-sm style-nova:data-highlighted:before:rounded-sm style-vega:data-highlighted:before:rounded-sm data-highlighted:before:bg-accent style-lyra:[&_svg:not([class*='size-'])]:size-4 style-maia:[&_svg:not([class*='size-'])]:size-4 style-mira:[&_svg:not([class*='size-'])]:size-3.5 style-nova:[&_svg:not([class*='size-'])]:size-4 style-vega:[&_svg:not([class*='size-'])]:size-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export interface AutocompleteContentProps
  extends React.ComponentProps<typeof AutocompletePrimitive.Popup> {
  align?: AutocompletePrimitive.Positioner.Props["align"];
  sideOffset?: AutocompletePrimitive.Positioner.Props["sideOffset"];
  alignOffset?: AutocompletePrimitive.Positioner.Props["alignOffset"];
  side?: AutocompletePrimitive.Positioner.Props["side"];
  anchor?: AutocompletePrimitive.Positioner.Props["anchor"];
  showBackdrop?: boolean;
}

function AutocompleteContent({
  className,
  children,
  showBackdrop = false,
  align = "start",
  sideOffset = 4,
  alignOffset = 0,
  side = "bottom",
  anchor,
  ...props
}: AutocompleteContentProps) {
  return (
    <AutocompletePortal>
      {showBackdrop && <AutocompleteBackdrop />}
      <AutocompletePositioner
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        side={side}
        anchor={anchor}
      >
        <div className="relative flex max-h-full">
          <AutocompletePrimitive.Popup
            data-slot="autocomplete-popup"
            className={cn(
              "flex max-h-[min(var(--available-height),24rem)] w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) scroll-pt-2 scroll-pb-2 flex-col overscroll-contain style-lyra:rounded-none style-maia:rounded-2xl style-mira:rounded-lg style-nova:rounded-lg style-vega:rounded-md bg-popover py-0.5 text-popover-foreground style-lyra:shadow-md style-maia:shadow-2xl style-mira:shadow-md style-nova:shadow-md style-vega:shadow-black/5 style-vega:shadow-md ring-1 style-lyra:ring-foreground/10 style-maia:ring-foreground/5 style-mira:ring-foreground/10 style-nova:ring-foreground/10 style-vega:ring-foreground/10 transition-[scale,opacity] has-data-[side=none]:scale-100 has-data-starting-style:scale-98 has-data-starting-style:opacity-0 has-data-[side=none]:transition-none",
              className,
            )}
            {...props}
          >
            {children}
          </AutocompletePrimitive.Popup>
        </div>
      </AutocompletePositioner>
    </AutocompletePortal>
  );
}

function AutocompleteGroup({ ...props }: React.ComponentProps<typeof AutocompletePrimitive.Group>) {
  return <AutocompletePrimitive.Group data-slot="autocomplete-group" {...props} />;
}

function AutocompleteGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.GroupLabel>) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-group-label"
      className={cn(
        "style-lyra:px-2 style-maia:px-3 style-mira:px-2 style-nova:px-1.5 style-vega:px-2 style-lyra:py-2 style-maia:py-2.5 style-mira:py-1.5 style-nova:py-1 style-vega:py-1.5 font-medium text-muted-foreground text-xs",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteEmpty({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Empty>) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={cn(
        "style-lyra:px-2 style-maia:px-3 style-mira:px-2 style-nova:px-2 style-vega:px-2 style-lyra:py-1.5 style-maia:py-2 style-mira:py-1 style-nova:py-1.5 style-vega:py-1.5 text-center style-lyra:text-xs style-maia:text-sm style-mira:text-xs/relaxed style-nova:text-sm style-vega:text-sm text-muted-foreground empty:m-0 empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function AutocompleteClear({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Clear>) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="autocomplete-clear"
      className={cn(
        "absolute top-1/2 -translate-y-1/2 cursor-pointer opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      <XIcon className="style-lyra:size-4 style-maia:size-4 style-mira:size-3.5 style-nova:size-4 style-vega:size-4" />
    </AutocompletePrimitive.Clear>
  );
}

function AutocompleteTrigger({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Trigger>) {
  return (
    <AutocompletePrimitive.Trigger
      data-slot="autocomplete-trigger"
      className={cn(
        "absolute top-1/2 -translate-y-1/2 cursor-pointer ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none has-[+[data-slot=autocomplete-clear]]:hidden data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      <ChevronsUpDownIcon className="style-lyra:size-4 style-maia:size-4 style-mira:size-3.5 style-nova:size-4 style-vega:size-4 opacity-70" />
    </AutocompletePrimitive.Trigger>
  );
}

function AutocompleteArrow({ ...props }: React.ComponentProps<typeof AutocompletePrimitive.Arrow>) {
  return <AutocompletePrimitive.Arrow data-slot="autocomplete-arrow" {...props} />;
}

function AutocompleteSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Separator>) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="autocomplete-separator"
      className={cn(
        "style-lyra:my-1 style-maia:my-1.5 style-mira:my-1 style-nova:my-1.5 style-vega:my-1.5 h-px style-lyra:bg-border style-maia:bg-border/50 style-mira:bg-border/50 style-nova:bg-border style-vega:bg-border",
        className,
      )}
      {...props}
    />
  );
}

export {
  Autocomplete,
  AutocompleteValue,
  AutocompleteTrigger,
  AutocompleteInput,
  AutocompleteStatus,
  AutocompletePortal,
  AutocompleteBackdrop,
  AutocompletePositioner,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteCollection,
  AutocompleteRow,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  AutocompleteClear,
  AutocompleteArrow,
  AutocompleteSeparator,
};

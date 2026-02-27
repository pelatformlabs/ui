"use client";

import type * as React from "react";

import { cn } from "../../lib/cn";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "cn-kbd pointer-events-none inline-flex select-none items-center justify-center",
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("cn-kbd-group inline-flex items-center", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };

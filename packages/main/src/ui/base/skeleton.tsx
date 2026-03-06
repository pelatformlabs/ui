"use client";

import type * as React from "react";

import { cn } from "@pelatform/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="skeleton" className={cn("cn-skeleton animate-pulse", className)} {...props} />
  );
}

export { Skeleton };

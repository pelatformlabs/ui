"use client";

import type * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cn } from "@pelatform/utils";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "cn-label flex select-none items-center peer-disabled:cursor-not-allowed group-data-[disabled=true]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

export { Label };

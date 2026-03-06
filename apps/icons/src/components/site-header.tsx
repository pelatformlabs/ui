"use client";

import { Logo } from "@pelatform/ui/components";
import { ModeSwitcher } from "./mode-switcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo className="size-7" />
          <span className="font-semibold text-lg text-mono">Pelatform Icons</span>
        </div>
        <ModeSwitcher />
      </div>
    </header>
  );
}

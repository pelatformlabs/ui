"use client";

import { Logo, ModeSwitcher, SiteHeader } from "@pelatform/ui/components";

export function Header() {
  return (
    <SiteHeader>
      <div className="flex items-center gap-2">
        <Logo className="size-7" />
        <span className="font-semibold text-lg text-mono">Pelatform Icons</span>
      </div>
      <ModeSwitcher />
    </SiteHeader>
  );
}

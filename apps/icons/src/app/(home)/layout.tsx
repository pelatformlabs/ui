"use client";

import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-vaul-drawer-wrapper="true"
      className="relative flex min-h-screen grow flex-col border-border/40 bg-background dark:border-border"
    >
      <SiteHeader />
      <main className="flex flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

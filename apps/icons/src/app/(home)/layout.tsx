"use client";

import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-vaul-drawer-wrapper="true"
      className="relative flex min-h-screen grow flex-col border-border/40 dark:border-border"
    >
      <Header />
      <main className="flex flex-1 bg-muted">{children}</main>
      <Footer />
    </div>
  );
}

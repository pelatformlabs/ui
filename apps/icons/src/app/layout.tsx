import { type ReactNode, Suspense } from "react";
import type { Metadata } from "next/types";

import { ThemeProvider } from "@pelatform/ui/components";
import { Toaster as Sonner } from "@pelatform/ui/radix";
import { cn } from "@pelatform/utils";
import { fontVariables } from "@/lib/fonts";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Beautiful Icons Collection",
  description:
    "Explore and download our curated library of beautiful, customizable SVG icons for your projects.",
  keywords: [
    "pelatform icons",
    "svg icons",
    "png icons",
    "vector icons",
    "scalable icons",
    "web icons",
    "UI icons",
    "icon library",
    "custom icons",
    "responsive icons",
    "free svg icons",
    "icon design",
    "react icon",
    "react svg",
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("h-full", fontVariables)} suppressHydrationWarning>
      <body className="style-vega flex h-full flex-col bg-muted font-sans text-base text-foreground antialiased">
        <ThemeProvider defaultTheme="light">
          <Suspense>
            {children}
            <Sonner position="top-center" />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

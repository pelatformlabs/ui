"use client";

import Link from "next/link";

import { Button } from "@pelatform/ui/radix";

export function SiteFooter() {
  return (
    <footer className="border-border border-t py-5 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-2 py-0 md:h-16 md:flex-row">
        <div className="text-balance text-center text-muted-foreground text-sm leading-loose md:text-left">
          © {new Date().getFullYear()} Pelatform. All rights reserved.
        </div>
        <div className="flex items-center gap-2.5 text-balance text-sm leading-loose">
          <div className="inline-flex items-center gap-1">
            <span className="text-muted-foreground">A project by</span>
            <Button variant="link" className="px-0">
              <Link
                href="https://pelatform.com"
                target="_blank"
                className="font-medium text-foreground"
              >
                Pelatform
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

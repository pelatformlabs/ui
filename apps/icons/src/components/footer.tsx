"use client";

import Link from "next/link";

import { SiteFooter } from "@pelatform/ui/components";
import { Button } from "@pelatform/ui/radix";

export function Footer() {
  return (
    <SiteFooter className="*:gap-2! *:py-0!">
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
    </SiteFooter>
  );
}

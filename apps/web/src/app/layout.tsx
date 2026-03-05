import { cn } from "pelatform-ui/utils";
import { fontVariables } from "@/lib/fonts";
import { baseUrl, createMetadata } from "@/lib/metadata";

import "@/styles/globals.css";

export const metadata = createMetadata({
  title: {
    template: "%s | Pelatform UI",
    default: "Pelatform UI",
  },
  description: "Documentation for Pelatform UI.",
  metadataBase: baseUrl,
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(fontVariables, "overscroll-none")} suppressHydrationWarning>
      <body className="style-vega flex h-full flex-col bg-background font-sans text-base text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

import { cp } from "node:fs/promises";
import { join } from "node:path";

import { defineConfig } from "tsup";

import pkg from "./package.json";

export default defineConfig(() => {
  return {
    clean: true,
    dts: true,
    external: [...Object.keys(pkg.peerDependencies || {})],
    entry: [
      "./src/index.ts",
      "./src/animation.ts",
      "./src/base.ts",
      "./src/components.ts",
      "./src/hooks.ts",
      "./src/radix.ts",
    ],
    format: "esm",
    target: "ES2022",
    banner: { js: '"use client";' },
    onSuccess: async () => {
      // Copy CSS files from main package to dist directory
      const cssSourceDir = join(process.cwd(), "..", "main", "css");
      const cssTargetDir = join(process.cwd(), "dist", "css");

      try {
        // Copy color directory
        const { glob } = await import("glob");
        const colorFiles = await glob("*.css", { cwd: join(cssSourceDir, "color") });
        for (const file of colorFiles) {
          await cp(join(cssSourceDir, "color", file), join(cssTargetDir, "color", file));
        }

        // Copy styles directory
        const styleFiles = await glob("*.css", { cwd: join(cssSourceDir, "styles") });
        for (const file of styleFiles) {
          await cp(join(cssSourceDir, "styles", file), join(cssTargetDir, "styles", file));
        }

        console.log("✅ CSS files copied successfully");
      } catch (error) {
        console.error("❌ Error copying CSS files:", error);
        throw error;
      }
    },
  };
});

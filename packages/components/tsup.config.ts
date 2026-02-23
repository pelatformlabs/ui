import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    clean: true,
    dts: true,
    external: ["react"],
    entry: ["./src/index.ts", "./src/animation.ts", "./src/base.ts", "./src/radix.ts"],
    format: "esm",
    target: "ES2022",
    banner: { js: '"use client";' },
  };
});

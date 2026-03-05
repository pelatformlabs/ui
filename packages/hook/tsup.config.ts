import { defineConfig } from "tsup";

import pkg from "./package.json";

export default defineConfig(() => {
  return {
    clean: true,
    dts: true,
    external: [...Object.keys(pkg.peerDependencies || {})],
    entry: ["./src/index.ts"],
    format: "esm",
    target: "ES2022",
    banner: { js: '"use client";' },
  };
});

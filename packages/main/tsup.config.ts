import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    clean: true,
    dts: true,
    external: ["react", "react-dom"],
    entry: [
      "./src/index.ts",
      "./src/animation.ts",
      "./src/base.ts",
      "./src/radix.ts",
      "./src/hooks.ts",
      "./src/components.ts",
    ],
    format: "esm",
    target: "ES2022",
  };
});

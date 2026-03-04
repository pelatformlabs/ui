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
      "./src/components.ts",
      "./src/hooks.ts",
      "./src/radix.ts",
      "./src/utils.ts",
    ],
    format: "esm",
    target: "ES2022",
  };
});

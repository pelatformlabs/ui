import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const animationDir = path.resolve(__dirname, "../src/ui/animation");

async function processFile(filePath) {
  const originalCode = await fs.readFile(filePath, "utf8");
  let code = originalCode;

  // Ensure "use client" directive exists
  const lines = code.split(/\r?\n/);
  const hasUseClient = lines.some((line) => /^['"]use client['"];?$/.test(line.trim()));

  if (!hasUseClient) {
    lines.unshift('"use client"', "");
    code = lines.join("\n");
  }

  // update import cn
  code = code.replace(/@pelatform\/utils/g, "../../lib/cn");

  // update import cva + VariantProps
  code = code.replace(/@pelatform\/ui\.general/g, "class-variance-authority");

  if (code !== originalCode) {
    await fs.writeFile(filePath, code, "utf8");
    console.log(`Updated: ${path.relative(animationDir, filePath)}`);
  } else {
    console.log(`No changes: ${path.relative(animationDir, filePath)}`);
  }
}

async function run() {
  try {
    const entries = await fs.readdir(animationDir, { withFileTypes: true });
    const tsxFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
      .map((entry) => path.join(animationDir, entry.name));

    await Promise.all(tsxFiles.map((file) => processFile(file)));
  } catch (error) {
    console.error("Error running animation script:", error);
    process.exitCode = 1;
  }
}

run();

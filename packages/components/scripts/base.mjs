import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, "../src/ui/base");

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

  // Replace cn import path
  code = code.replace(
    /import\s+{([^}]*\bcn\b[^}]*)}\s+from\s+["']@\/registry\/bases\/base\/lib\/utils["'];?/g,
    'import {$1} from "../../lib/cn"',
  );

  // Replace component imports from registry alias to relative imports
  code = code.replace(
    /from\s+["']@\/registry\/bases\/base\/ui\/([^"']+)["'];?/g,
    (match, componentPath) => {
      return `from "./${componentPath}"`;
    },
  );

  // Normalize lucide-react imports: remove `as FooIcon` aliases and use base icon names
  code = code.replace(
    /import\s+{([^}]+)}\s+from\s+["']lucide-react["'];?/g,
    (match, importsBlock) => {
      const specifiers = importsBlock
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const baseNames = [];

      const normalized = specifiers.map((spec) => {
        const m = spec.match(/^(\w+)\s+as\s+(\w+)$/);
        if (m && m[2] === `${m[1]}Icon`) {
          baseNames.push(m[1]);
          return m[1];
        }

        return spec;
      });

      for (const name of baseNames) {
        const openTag = new RegExp(`<${name}Icon(?=\\s|/|>)`, "g");
        const closeTag = new RegExp(`</${name}Icon>`, "g");
        code = code.replace(openTag, `<${name}`);
        code = code.replace(closeTag, `</${name}`);
      }

      return `import { ${normalized.join(", ")} } from "lucide-react"`;
    },
  );

  if (code !== originalCode) {
    await fs.writeFile(filePath, code, "utf8");
    console.log(`Updated: ${path.relative(baseDir, filePath)}`);
  } else {
    console.log(`No changes: ${path.relative(baseDir, filePath)}`);
  }
}

async function run() {
  try {
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    const tsxFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
      .map((entry) => path.join(baseDir, entry.name));

    await Promise.all(tsxFiles.map((file) => processFile(file)));
  } catch (error) {
    console.error("Error running base script:", error);
    process.exitCode = 1;
  }
}

run();

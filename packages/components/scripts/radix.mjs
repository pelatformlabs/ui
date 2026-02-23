import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const radixDir = path.resolve(__dirname, "../src/ui/radix");

function stripIconSuffix(name) {
  return name.endsWith("Icon") ? name.slice(0, -4) : name;
}

function ensureLucideReactImport(code, icons) {
  const iconsSorted = [...icons].sort();
  if (iconsSorted.length === 0) return code;

  const importRegex = /^import\s+{([^}]+)}\s+from\s+["']lucide-react["'];?\s*$/m;
  const match = code.match(importRegex);

  if (match) {
    const existing = match[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const merged = Array.from(new Set([...existing, ...iconsSorted])).sort();
    return code.replace(importRegex, `import { ${merged.join(", ")} } from "lucide-react"`);
  }

  const useClientRegex = /^["']use client["'];?\s*\r?\n/;
  if (useClientRegex.test(code)) {
    return code.replace(
      useClientRegex,
      (m) => `${m}\nimport { ${iconsSorted.join(", ")} } from "lucide-react";\n`,
    );
  }

  return `import { ${iconsSorted.join(", ")} } from "lucide-react";\n${code}`;
}

function normalizeLucideReactImports(code) {
  // Normalize lucide-react imports: remove `as FooIcon` aliases and use base icon names
  return code.replace(
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

      let out = code;
      for (const name of baseNames) {
        const openTag = new RegExp(`<${name}Icon(?=\\s|/|>)`, "g");
        const closeTag = new RegExp(`</${name}Icon>`, "g");
        out = out.replace(openTag, `<${name}`);
        out = out.replace(closeTag, `</${name}`);
      }

      code = out;
      return `import { ${normalized.join(", ")} } from "lucide-react"`;
    },
  );
}

function convertIconPlaceholder(code) {
  const iconsUsed = new Set();

  const placeholderRegex = /<IconPlaceholder\b[\s\S]*?\/>/g;
  let hadAny = false;

  code = code.replace(placeholderRegex, (full) => {
    const lucideMatch = full.match(/lucide\s*=\s*"([^"]+)"/);
    if (!lucideMatch) return full;
    hadAny = true;

    const rawName = lucideMatch[1];
    const iconName = stripIconSuffix(rawName);
    iconsUsed.add(iconName);

    let out = full;
    out = out.replace(/\s+(lucide|tabler|hugeicons|phosphor|remixicon)=(".*?"|\{[\s\S]*?\})/g, "");
    out = out.replace("<IconPlaceholder", `<${iconName}`);
    return out;
  });

  if (!hadAny) return code;

  // Remove IconPlaceholder import if present
  code = code.replace(
    /^\s*import\s+{\s*IconPlaceholder\s*}\s+from\s+["']@\/app\/\(create\)\/components\/icon-placeholder["'];?\s*\r?\n/m,
    "",
  );

  code = ensureLucideReactImport(code, iconsUsed);
  return code;
}

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

  // Replace cn import path (both base + radix aliases)
  code = code.replace(
    /import\s+{([^}]*\bcn\b[^}]*)}\s+from\s+["']@\/registry\/bases\/(base|radix)\/lib\/utils["'];?/g,
    'import {$1} from "../../lib/cn"',
  );

  // Replace component imports from registry alias to relative imports (both base + radix aliases)
  code = code.replace(
    /from\s+["']@\/registry\/bases\/(base|radix)\/ui\/([^"']+)["'];?/g,
    (match, _scope, componentPath) => {
      return `from "./${componentPath}"`;
    },
  );

  // IconPlaceholder -> lucide-react icons
  code = convertIconPlaceholder(code);

  // Normalize lucide-react imports (remove `as FooIcon` if any)
  code = normalizeLucideReactImports(code);

  if (code !== originalCode) {
    await fs.writeFile(filePath, code, "utf8");
    console.log(`Updated: ${path.relative(radixDir, filePath)}`);
  } else {
    console.log(`No changes: ${path.relative(radixDir, filePath)}`);
  }
}

async function run() {
  try {
    const entries = await fs.readdir(radixDir, { withFileTypes: true });
    const tsxFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
      .map((entry) => path.join(radixDir, entry.name));

    await Promise.all(tsxFiles.map((file) => processFile(file)));
  } catch (error) {
    console.error("Error running radix script:", error);
    process.exitCode = 1;
  }
}

run();

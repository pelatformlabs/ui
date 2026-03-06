#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { glob } from "glob";
import { z } from "zod";

// Check for test flag
const isTestMode = process.argv.includes("--test");

if (isTestMode) {
  console.log("✅ MCP server executable test passed");
  process.exit(0);
}

// Get current directory for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Handle both development (src) and built (dist) environments
const PACKAGES_ROOT = resolve(__dirname, "..", ".."); // packages/mcp/src|dist -> packages

// Direct package paths
const CORE_PACKAGE = join(PACKAGES_ROOT, "core");
const MAIN_PACKAGE = join(PACKAGES_ROOT, "main");

// Package information cache
// biome-ignore lint/suspicious/noExplicitAny: <>
const packages = new Map<string, any>();
// biome-ignore lint/suspicious/noExplicitAny: <>
const components = new Map<string, any>();

class PelatformUIMCPServer {
  private async loadPackageInfo(): Promise<void> {
    try {
      // V3: Scan core and main packages
      const packageDirs = [CORE_PACKAGE, MAIN_PACKAGE];

      for (const packageDir of packageDirs) {
        const packageJsonPath = join(packageDir, "package.json");

        try {
          await access(packageJsonPath);
          const packageJsonContent = await readFile(packageJsonPath, "utf-8");
          const packageJson = JSON.parse(packageJsonContent);

          // Skip private packages (like mcp itself) and non-pelatform packages
          if (
            packageJson.private ||
            (!packageJson.name?.startsWith("@pelatform/") && packageJson.name !== "pelatform-ui")
          ) {
            continue;
          }

          const srcDir = join(packageDir, "src");

          try {
            await access(srcDir);

            // Get all TypeScript/TSX files in src directory
            const componentFiles = await glob(join(srcDir, "**/*.{ts,tsx}"), {
              windowsPathsNoEscape: true,
            });

            // Extract exported components/members from package.json exports
            const exports = Object.keys(packageJson.exports || {})
              .filter((key) => key !== "./package.json")
              .map((key) => key.replace("./", ""));

            const packageInfo = {
              name: packageJson.name,
              version: packageJson.version,
              description: packageJson.description,
              main: packageJson.main,
              exports,
              dependencies: packageJson.dependencies || {},
              devDependencies: packageJson.devDependencies || {},
              peerDependencies: packageJson.peerDependencies || {},
              srcDir,
              componentFiles,
              category: this.getPackageCategory(packageJson.name),
            };

            packages.set(packageJson.name, packageInfo);

            // Index components
            for (const componentFile of componentFiles) {
              const componentName = basename(componentFile, extname(componentFile));
              const relativePath = relative(srcDir, componentFile).replace(/\\/g, "/");

              components.set(componentName, {
                name: componentName,
                package: packageJson.name,
                path: relativePath,
                fullPath: componentFile,
              });
            }
          } catch (_error) {
            // No src directory, skip
          }
        } catch (_error) {
          // No package.json, skip
        }
      }
    } catch (error) {
      console.error("Error loading package info:", error);
    }
  }

  private getPackageCategory(packageName: string): string {
    // V3 Architecture categories (simplified)
    if (packageName === "@pelatform/ui") {
      return "core";
    }
    if (packageName === "pelatform-ui") {
      return "main";
    }
    if (packageName === "@pelatform/mcp.ui") {
      return "mcp";
    }
    return "other";
  }

  async listPackages(category: string = "all") {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    let filteredPackages = Array.from(packages.values());

    if (category !== "all") {
      filteredPackages = filteredPackages.filter((pkg) => pkg.category === category);
    }

    return {
      content: [
        {
          type: "text" as "text",
          text: JSON.stringify(
            {
              packages: filteredPackages.map((pkg) => ({
                name: pkg.name,
                version: pkg.version,
                description: pkg.description,
                category: pkg.category,
                exportsCount: pkg.exports.length,
                componentFilesCount: pkg.componentFiles.length,
              })),
              total: filteredPackages.length,
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  async getPackageInfo(packageName: string) {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    const pkg = packages.get(packageName);
    if (!pkg) {
      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                error: `Package ${packageName} not found`,
                availablePackages: Array.from(packages.keys()),
                hint: "Available packages in V3: @pelatform/ui, pelatform-ui",
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as "text",
          text: JSON.stringify(pkg, null, 2),
        },
      ],
    };
  }

  async findComponent(componentName: string, packageFilter?: string) {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    let matchingComponents = Array.from(components.values()).filter((comp) =>
      comp.name.toLowerCase().includes(componentName.toLowerCase()),
    );

    if (packageFilter) {
      matchingComponents = matchingComponents.filter((comp) =>
        comp.package.includes(packageFilter),
      );
    }

    return {
      content: [
        {
          type: "text" as "text",
          text: JSON.stringify(
            {
              components: matchingComponents,
              total: matchingComponents.length,
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  async readComponentCode(packageName: string, componentPath: string) {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    const pkg = packages.get(packageName);
    if (!pkg) {
      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                error: `Package ${packageName} not found`,
                availablePackages: Array.from(packages.keys()),
                hint: "Available packages in V3: @pelatform/ui, pelatform-ui",
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    const fullPath = join(pkg.srcDir, componentPath);

    try {
      await access(fullPath);
      const code = await readFile(fullPath, "utf-8");

      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                package: packageName,
                component: componentPath,
                code,
                fullPath,
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (_error) {
      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                error: `Component file not found: ${componentPath}`,
                package: packageName,
                searchedPath: fullPath,
                availableComponents: Array.from(components.values())
                  .filter((c) => c.package === packageName)
                  .map((c) => c.path),
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }

  async getUsageExample(packageName: string, componentName?: string) {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    const pkg = packages.get(packageName);
    if (!pkg) {
      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                error: `Package ${packageName} not found`,
                availablePackages: Array.from(packages.keys()),
                hint: "Available packages in V3: @pelatform/ui, pelatform-ui",
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    // Try to find README or examples
    const readmePath = join(pkg.srcDir, "..", "README.md");

    try {
      await access(readmePath);
      const readme = await readFile(readmePath, "utf-8");

      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                package: packageName,
                component: componentName,
                readme,
                note: componentName
                  ? `Specific examples for ${componentName} not found. Showing package README.`
                  : "Package README and usage examples",
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (_error) {
      // Generate basic usage example based on package type
      const example = this.generateUsageExample(packageName, componentName);

      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                package: packageName,
                component: componentName,
                example,
                note: "Generated usage example",
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }

  private generateUsageExample(packageName: string, componentName?: string): string {
    // V2 specific usage examples
    if (packageName === "@pelatform/ui") {
      if (componentName) {
        return `// Import from specific entry point
import { ${componentName} } from "@pelatform/ui/${this.getComponentCategory(componentName)}";

// Or import from main entry
import { ${componentName} } from "@pelatform/ui";

// Usage example for ${componentName}
function Example() {
  return (
    <${componentName}
      // Add props as needed
    />
  );
}

export default Example;`;
      }
      return `// Pelatform UI - Scope Package
// Multi-entry package with animation, base, components, hooks, and radix

// Import animation components
import { ShimmeringText, CountingNumber } from "@pelatform/ui/animation";

// Import base headless components (full styling control)
import { Button, Input, Dialog } from "@pelatform/ui/base";

// Import radix styled components (pre-styled)
import { Card, DataGrid, Calendar } from "@pelatform/ui/radix";

// Import custom components
import { Icons, Logo } from "@pelatform/ui/components";

// Import hooks
import { useHydrated, useMobile } from "@pelatform/ui/hooks";

// Import styles
import "@pelatform/ui/css";

function Example() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}

export default Example;`;
    }

    if (packageName === "pelatform-ui") {
      if (componentName) {
        return `import { ${componentName} } from "pelatform-ui/${this.getMainComponentCategory(componentName)}";

// Or import from main entry
import { ${componentName} } from "pelatform-ui";

// Usage example for ${componentName}
function Example() {
  return <${componentName} />;
}

export default Example;`;
      }
      return `// Pelatform UI Main Package
// Aggregates all components and hooks

// Core utilities
import { cn, cva } from "pelatform-ui";

// React hooks
import { useHydrated, useMobile } from "pelatform-ui/hooks";

// Animation components
import { ShimmeringText, CountingNumber } from "pelatform-ui/animation";

// Base headless components
import { Button, Input } from "pelatform-ui/base";

// Radix styled components
import { Card, DataGrid } from "pelatform-ui/radix";

// Custom Pelatform components
import { SiteHeader, SiteFooter } from "pelatform-ui/components";

// Styles
import "pelatform-ui/css";

function Example() {
  return (
    <div>
      <SiteHeader />
      <Card>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </Card>
      <SiteFooter />
    </div>
  );
}

export default Example;`;
    }

    // Default fallback
    const shortName = packageName.replace("@pelatform/", "").replace("pelatform-ui", "ui");

    if (componentName) {
      return `import { ${componentName} } from "${packageName}";

// Usage example for ${componentName}
function Example() {
  return (
    <${componentName}
      // Add props as needed
    />
  );
}

export default Example;`;
    }

    return `// Example usage for ${packageName}
import { ${shortName.charAt(0).toUpperCase() + shortName.slice(1)}Provider } from "${packageName}";

// Configure in your app
function App() {
  return (
    <${shortName.charAt(0).toUpperCase() + shortName.slice(1)}Provider>
      {/* Your app components */}
    </${shortName.charAt(0).toUpperCase() + shortName.slice(1)}Provider>
  );
}
`;
  }

  private getComponentCategory(componentName: string): string {
    // Determine which entry point a component belongs to
    const animationComponents = [
      "ShimmeringText",
      "TextReveal",
      "TypingText",
      "VideoText",
      "WordRotate",
      "CountingNumber",
      "SlidingNumber",
      "Marquee",
      "GitHubButton",
      "GradientBackground",
      "GridBackground",
      "HoverBackground",
      "HexagonBadge",
    ];

    const lowerName = componentName.toLowerCase();
    if (
      animationComponents.some((c) => c.toLowerCase() === lowerName) ||
      lowerName.includes("shimmer") ||
      lowerName.includes("text") ||
      lowerName.includes("typing") ||
      lowerName.includes("counting") ||
      lowerName.includes("sliding") ||
      lowerName.includes("marquee") ||
      lowerName.includes("gradient") ||
      lowerName.includes("background")
    ) {
      return "animation";
    }
    if (lowerName.includes("radix")) {
      return "radix";
    }
    return "base";
  }

  private getMainComponentCategory(componentName: string): string {
    const lowerName = componentName.toLowerCase();

    // Layout components
    if (
      lowerName.includes("auth") ||
      lowerName.includes("blank") ||
      lowerName.includes("body") ||
      lowerName.includes("coming") ||
      lowerName.includes("error") ||
      lowerName.includes("grid") ||
      lowerName.includes("section") ||
      lowerName.includes("header") ||
      lowerName.includes("footer") ||
      lowerName.includes("wrapper")
    ) {
      return "components";
    }

    // Navigation components
    if (
      lowerName.includes("nav") ||
      lowerName.includes("menu") ||
      lowerName.includes("back") ||
      lowerName.includes("command")
    ) {
      return "components";
    }

    // Provider components
    if (lowerName.includes("provider")) {
      return "components";
    }

    // Hooks
    if (lowerName.startsWith("use")) {
      return "hooks";
    }

    return "components";
  }
}

// Create server instance
const server = new McpServer({
  name: "Pelatform UI",
  version: "0.3.0",
});

// Instance of our business logic
const pelatformServer = new PelatformUIMCPServer();

// Register tools using the new API
server.registerTool(
  "list_packages",
  {
    description: "List all available Pelatform UI packages (V3 Architecture)",
    inputSchema: {
      category: z
        .enum(["core", "main", "mcp", "all"])
        .default("all")
        .describe("Filter packages by category (V3: core, main, mcp)"),
    },
  },
  async ({ category }) => {
    const result = await pelatformServer.listPackages(category || "all");
    return result;
  },
);

server.registerTool(
  "get_package_info",
  {
    description: "Get detailed information about a specific package",
    inputSchema: {
      package_name: z
        .string()
        .min(1, "Package name is required")
        .describe("The name of the package (V3: @pelatform/ui, pelatform-ui)"),
    },
  },
  async ({ package_name }) => {
    const result = await pelatformServer.getPackageInfo(package_name);
    return result;
  },
);

server.registerTool(
  "find_component",
  {
    description: "Find a specific component in the packages",
    inputSchema: {
      component_name: z
        .string()
        .min(1, "Component name is required")
        .describe("The name of the component to find"),
      package_filter: z
        .string()
        .optional()
        .describe("Optional package to search in (e.g., components, hooks, main)"),
    },
  },
  async ({ component_name, package_filter }) => {
    const result = await pelatformServer.findComponent(component_name, package_filter);
    return result;
  },
);

server.registerTool(
  "read_component_code",
  {
    description: "Read the source code of a specific component",
    inputSchema: {
      package_name: z
        .string()
        .min(1, "Package name is required")
        .describe("The package containing the component (V3: @pelatform/ui, pelatform-ui)"),
      component_path: z
        .string()
        .min(1, "Component path is required")
        .describe("The relative path to the component from src/"),
    },
  },
  async ({ package_name, component_path }) => {
    const result = await pelatformServer.readComponentCode(package_name, component_path);
    return result;
  },
);

server.registerTool(
  "get_usage_example",
  {
    description: "Get usage examples for a package or specific component",
    inputSchema: {
      package_name: z
        .string()
        .min(1, "Package name is required")
        .describe("The package to get examples for (V3: @pelatform/ui, pelatform-ui)"),
      component_name: z.string().optional().describe("Optional specific component name"),
    },
  },
  async ({ package_name, component_name }) => {
    const result = await pelatformServer.getUsageExample(package_name, component_name);
    return result;
  },
);

/**
 * Main entry point for the Pelatform UI MCP Server
 *
 * V3 Architecture - Supports simplified 2-package structure:
 * - @pelatform/ui (scope package - version 2.0.0)
 *   Multi-entry package that re-exports from pelatform-ui
 *   Entry points: ., ./animation, ./base, ./components, ./hooks, ./radix
 * - pelatform-ui (main package - version 1.2.9)
 *   All UI components (170+), hooks (18), and styles
 *   Animation (18), Base (77), Radix (77), Custom (2+)
 * - @pelatform/mcp.ui (MCP server - private)
 *
 * This script initializes the MCP server using the official MCP SDK and
 * provides tools and resources for exploring the Pelatform UI packages.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Pelatform UI MCP server V3 running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

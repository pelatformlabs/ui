# Pelatform UI - MCP Server

MCP server for exploring Pelatform UI library packages, components, and documentation.

## Overview

This MCP server provides access to:

- **2 packages** in the Pelatform UI library
- **Component discovery** and search
- **Source code reading** for development
- **Usage examples** and documentation

## Available Packages

### V3 Architecture (Simplified)

Pelatform UI V3 uses a simplified 2-package architecture:

- **@pelatform/ui** - Scope package (version 2.0.0)
  - Multi-entry package that re-exports from pelatform-ui
  - Entry points: ., ./animation, ./base, ./components, ./hooks, ./radix
  - Published as scoped package for better organization

- **pelatform-ui** - Main package (version 1.2.9)
  - Contains all UI components, hooks, and styles
  - 170+ components: Animation (14), Base (77), Radix (77)
  - 18 React hooks
  - Complete styling system

## Setup

### Build

```bash
cd packages/mcp
bun run build
```

### Development

```bash
cd packages/mcp
bun run dev
```

### Type Checking

```bash
cd packages/mcp
bun run types:check
```

## Configuration

Add the MCP server to your MCP client configuration:

### Example Configuration

```json
{
  "mcpServers": {
    "Pelatform UI": {
      "command": "node",
      "args": [
        "D:\\PROJECTS\\PELATFORM\\FOUNDATIONS\\LABS\\ui\\packages\\mcp\\dist\\index.js"
      ],
      "cwd": "D:\\PROJECTS\\PELATFORM\\FOUNDATIONS\\LABS\\ui"
    }
  }
}
```

### Configuration Parameters

- **command**: `"node"` - Runtime to execute the server
- **args**: Array containing the path to the built server file
- **cwd**: Current working directory for the server process (default: `process.cwd()`)

### Path Guidelines

- Use absolute paths in the `args` array
- Update paths according to your system:
  - **Windows**: Use backslashes or forward slashes
  - **macOS/Linux**: Use forward slashes
- Ensure the path points to the compiled `dist/index.js` file

## Available Tools

### 1. `list_packages`

Lists all available packages in the Pelatform UI library.

**Parameters:**

- `category` (optional): Filter by "core", "main", "mcp", or "all" (default: "all")

**Example Prompts:**

```
Show me all available packages.
List core packages only.
What's in the main package?
```

### 2. `get_package_info`

Gets detailed information about a specific package.

**Parameters:**

- `package_name` (required): Full package name (e.g., "@pelatform/ui" or "pelatform-ui")

**Example Prompts:**

```
Tell me about the @pelatform/ui package.
What's in the pelatform-ui package?
Show me details for pelatform-ui.
```

### 3. `find_component`

Searches for components across all packages.

**Parameters:**

- `component_name` (required): Name to search for
- `package_filter` (optional): Filter by package name

**Example Prompts:**

```
Find the Button component.
Search for "DataGrid" components.
Look for form components.
Find all animation-related components.
```

### 4. `read_component_code`

Reads the source code of a specific component.

**Parameters:**

- `package_name` (required): Package containing the component
- `component_path` (required): Relative path from src/ directory

**Example Prompts:**

```
Show me the code for Button component.
Read the DataGrid implementation.
Display the source code for useHydrated hook.
```

### 5. `get_usage_example`

Gets usage examples for packages or components.

**Parameters:**

- `package_name` (required): Package name
- `component_name` (optional): Specific component name

**Example Prompts:**

```
Give me usage examples for the main package.
How do I use the base components?
Show me examples for the DataGrid component.
What's the correct way to implement hooks?
```

## Usage Examples

### Exploring Packages

Use the tools to discover and explore available packages:

- List all packages with `list_packages`
- Get detailed information with `get_package_info`
- Find specific components with `find_component`
- Read source code with `read_component_code`
- Get usage examples with `get_usage_example`

## Common Workflows

### 1. Package Discovery

1. Use `list_packages` to see all available packages
2. Filter by category if needed (core/main)
3. Use `get_package_info` for detailed package information

### 2. Component Search and Analysis

1. Use `find_component` to locate relevant components
2. Use `read_component_code` to examine implementation
3. Use `get_usage_example` for usage patterns

### 3. Learning Patterns

1. Find a component type (e.g., forms, modals, tables)
2. Read multiple implementations
3. Analyze common patterns and best practices

## Tips for Best Results

### Be Specific with Names

- Use full package names: `@pelatform/ui` or `pelatform-ui`
- Use exact component names when possible
- Include file extensions in component paths

### Combine Tools

- First `find_component`, then `read_component_code`
- Use `get_package_info` before `get_usage_example`
- Search across packages when unsure of location

### Understand the V3 Structure

- **@pelatform/ui** (core): Scope package with multi-entry imports
- **pelatform-ui** (main): All components, hooks, and styles
- Each package has its own `src/` directory with TypeScript/React files

## Troubleshooting

### Build Issues

1. **Build errors**
   - Run `bun run clean && bun run build`
   - Check TypeScript version
   - Verify all imports resolve correctly

2. **Path resolution**
   - Ensure working directory is correct
   - Check if packages have `src/` directories
   - Verify file paths are accessible

3. **Component access**
   - Use exact file paths from `src/` directory
   - Include file extension (.ts, .tsx, .js, .jsx)
   - Ensure component exists in the specified package

## File Structure Reference

```
packages/
├── mcp/                  # MCP server (current directory)
│   ├── src/              # Source code
│   ├── dist/             # Built output
│   └── README.md         # This file
├── core/                 # @pelatform/ui package
│   └── src/              # Re-exports from pelatform-ui
│       ├── index.ts
│       ├── animation.ts
│       ├── base.ts
│       ├── components.ts
│       ├── hooks.ts
│       └── radix.ts
└── main/                 # pelatform-ui package
    ├── src/
    │   ├── ui/
    │   │   ├── animation/    # 14 animation components
    │   │   ├── base/         # 77 headless components
    │   │   └── radix/        # 77 styled components
    │   ├── components/       # Custom components
    │   ├── hooks/            # 18 React hooks
    │   ├── index.ts
    │   ├── animation.ts
    │   ├── base.ts
    │   ├── components.ts
    │   ├── hooks.ts
    │   └── radix.ts
    └── css/                # Theme stylesheets
```

Each package contains:

- `src/` - Source code directory
- `package.json` - Package metadata
- TypeScript/React components and utilities

## Getting Help

- Check this README.md for basic setup
- Examine existing components for implementation patterns
- Start with simple package exploration before complex searches
- Use the available tools to discover and explore packages

## Notes

- Requires access to the Pelatform UI source code
- Runs directly from source with no npm publishing required
- Designed for development and exploration
- Private package - not published to npm

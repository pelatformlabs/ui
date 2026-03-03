# Pelatform UI - MCP Server

MCP server for exploring Pelatform UI library packages, components, and documentation.

## Overview

This MCP server provides access to:

- **4 packages** in the Pelatform UI library
- **Component discovery** and search
- **Source code reading** for development
- **Usage examples** and documentation

## Available Packages

### V2 Architecture

Pelatform UI V2 uses a simplified 4-package architecture:

- **@pelatform/ui.components** - All UI components (172 components)
  - Animation (18 components)
  - Base (77 headless components)
  - Radix (77 styled components)
- **@pelatform/ui.hook** - React hooks (18 hooks)
- **pelatform-ui** - Main entry point with custom components
- **@pelatform/mcp.ui** - MCP server (private package)

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

- `category` (optional): Filter by "components", "hooks", "main", "mcp", or "all" (default: "all")

**Example Prompts:**

```
Show me all available packages.
List component packages only.
What hooks are available?
```

### 2. `get_package_info`

Gets detailed information about a specific package.

**Parameters:**

- `package_name` (required): Full package name (e.g., "@pelatform/ui.components")

**Example Prompts:**

```
Tell me about the @pelatform/ui.components package.
What's in the hooks package?
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
Look for form components in the components package.
Find all animation-related components.
```

### 4. `read_component_code`

Reads the source code of a specific component.

**Parameters:**

- `package_name` (required): Package containing the component
- `component_path` (required): Relative path from src/ directory

**Example Prompts:**

```
Show me the code for Button component in the components package.
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
Give me usage examples for the components package.
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
2. Filter by category if needed (components/hooks/main)
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

- Use full package names: `@pelatform/ui.components` not just "components"
- Use exact component names when possible
- Include file extensions in component paths

### Combine Tools

- First `find_component`, then `read_component_code`
- Use `get_package_info` before `get_usage_example`
- Search across packages when unsure of location

### Understand the V2 Structure

- **Components Package**: All UI components (animation, base, radix)
- **Hooks Package**: React hooks for common use cases
- **Main Package**: Entry point with custom components
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
├── components/           # All UI components
│   ├── src/
│   │   ├── ui/
│   │   │   ├── animation/    # 18 animation components
│   │   │   ├── base/         # 77 headless components
│   │   │   └── radix/        # 77 styled components
│   │   ├── animation.ts      # Animation entry point
│   │   ├── base.ts           # Base entry point
│   │   └── radix.ts          # Radix entry point
├── hook/                 # React hooks
│   └── src/               # 18 hooks
└── main/                 # Main package
    ├── src/
    │   ├── components/      # Custom components
    │   ├── hooks/           # Custom hooks
    │   └── lib/             # Utilities
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

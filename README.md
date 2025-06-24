# @pixpilot/dev-config

Modern, opinionated The Jest ESLint configuration includes:

- Jest-specific rules and best practices
- Proper Jest globals (describe, test, expect, etc.)
- Rules for test file patterns (_.test._, _.spec._, **tests**/\*_/_)
- Relaxed rules for common testing patterns
- Enhanced rules for Jest expectations and assertions

**How it works:** The main ESLint config applies to all JS/TS files, and the Jest config adds Jest-specific rules to test files. Both configs work together - the Jest config extends/overrides rules specifically for test file patterns.

**Additional peer dependency for Jest support:**nt configurations for TypeScript/JavaScript projects including ESLint, Prettier, and TypeScript configs.

## What's included

- **ESLint**: TypeScript-first configuration with import sorting, type-checking, and Prettier integration
- **Prettier**: Consistent code formatting with sensible defaults
- **TypeScript**: Flexible base configuration optimized for modern development

## Installation

```bash
npm install -D @pixpilot/dev-config
```

**Peer dependencies** (install these in your project):

```bash
npm install -D eslint@^9.0.0 prettier@^3.6.0 typescript@^5.0.0
```

## Usage

### ESLint

Create `eslint.config.js`:

```javascript
import config from '@pixpilot/dev-config/eslint';
export default config;
```

### ESLint for Jest/Testing

For projects with Jest tests, you can add Jest-specific ESLint rules:

```javascript
import config from '@pixpilot/dev-config/eslint';
import jestConfig from '@pixpilot/dev-config/eslint-jest';

export default [...config, ...jestConfig];
```

The Jest ESLint configuration includes:

- Jest-specific rules and best practices
- Proper Jest globals (describe, test, expect, etc.)
- Rules for test file patterns (_.test._, _.spec._, **tests**/\*)
- Relaxed rules for common testing patterns
- Enhanced rules for Jest expectations and assertions

**Additional peer dependency for Jest support:**

```bash
npm install -D jest@^29.0.0
```

### Prettier

Create `prettier.config.js`:

```javascript
import config from '@pixpilot/dev-config/prettier';
export default config;
```

### TypeScript

Create or extend `tsconfig.json`:

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    // Override module settings based on your project needs:
    "module": "ES2022", // For modern ESM projects
    "moduleResolution": "Node", // For Node.js compatibility

    // Or for bundler-based projects (Vite, Webpack):
    // "module": "Preserve",      // Already set in base config
    // "moduleResolution": "Bundler", // Already set in base config

    // Project-specific settings:
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## TypeScript Base Configuration

The TypeScript base configuration provides a solid foundation with:

### Core Features

- **Modern target**: ES2022 with ES2022 lib for latest JavaScript features
- **Strict type checking**: `strict: true` with additional safety checks
- **Enhanced strictness**:
  - `noUncheckedIndexedAccess` for safer array/object access
  - `exactOptionalPropertyTypes` for precise optional types
  - `noImplicitReturns` and `noFallthroughCasesInSwitch` for control flow safety

### Module System

- **Bundler-optimized by default**: `module: "Preserve"` and `moduleResolution: "Bundler"`
- **Flexible**: Override module settings for your specific environment
- **Modern syntax support**: Works with import/export, `import.meta`, and dynamic imports

### Performance & Tooling

- **Incremental compilation**: Faster rebuilds with build info caching
- **Monorepo optimized**: Performance features for large codebases
- **IDE-friendly**: Excellent TypeScript language server support

### Compatibility

- **Multiple project types**: Libraries, Node.js apps, web apps, bundler-based projects
- **Framework agnostic**: Works with React, Vue, Svelte, or vanilla projects
- **File format support**: JS, TS, JSX, TSX, and JSON modules

## ESLint Configuration

Our ESLint config includes:

- **Modern flat config format** (ESLint 9+)
- **TypeScript integration** with type-aware rules
- **Import organization** and sorting
- **Prettier integration** for consistent formatting
- **Comprehensive rule set** covering common pitfalls and best practices

Supported file types: `.js`, `.ts`, `.jsx`, `.tsx`

## Prettier Configuration

Opinionated formatting with:

- 80 character line width
- 2-space indentation
- Double quotes for strings
- Trailing commas where valid
- Semicolons always

## Customization

### Extending ESLint rules

```javascript
import baseConfig from '@pixpilot/dev-config/eslint';

export default [
  ...baseConfig,
  {
    rules: {
      // Your project-specific overrides
      '@typescript-eslint/no-unused-vars': 'warn',
      'prefer-const': 'error',
    },
  },
];
```

### Overriding Prettier settings

```javascript
import baseConfig from '@pixpilot/dev-config/prettier';

export default {
  ...baseConfig,
  printWidth: 100,
  singleQuote: true,
};
```

### TypeScript configuration patterns

#### For Node.js projects:

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "Node16",
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

#### For libraries (npm packages):

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    "module": "ES2022",
    "moduleResolution": "Node",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

#### For bundler-based web apps:

```json
{
  "extends": "@pixpilot/dev-config/typescript",
  "compilerOptions": {
    // Base config already optimized for bundlers
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

## Requirements

- **Node.js**: 18+
- **ESLint**: 9+
- **Prettier**: 3.6+
- **TypeScript**: 5.0+

## Contributing

This package follows semantic versioning. When extending or modifying configurations, ensure backward compatibility and test with various project types.

## License

MIT

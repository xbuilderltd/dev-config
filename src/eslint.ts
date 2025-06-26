import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import type { TSESLint } from '@typescript-eslint/utils';
// This is the new dependency to add
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

// Helper function to safely include .gitignore from the project root
const gitignore = (() => {
  try {
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    return fs.existsSync(gitignorePath) ? includeIgnoreFile(gitignorePath) : {};
  } catch {
    return {};
  }
})();

/**
 * Generic ESLint configuration for TypeScript projects
 *
 * Features:
 * - TypeScript support with type checking
 * - Import ordering and organization
 * - Prettier compatibility (no conflicting rules)
 * - Automatic .gitignore integration
 * - ESM/CommonJS dual package support (.mjs/.cjs)
 * - Smart console logging (allows warn/error, restricts debug logs)
 *
 * Note: Test files are not ignored here to allow for specialized test configurations.
 * Use @pixpilot/dev-config/eslint-jest for Jest-specific linting rules.
 *
 * Environment Variables:
 * - NODE_ENV: Controls console rule severity (production = error, development = warn)
 * - ESLINT_NO_CONSOLE: Set to "off" to completely disable console rule
 *
 * @example
 * ```javascript
 * import config from "@pixpilot/dev-config/eslint";
 * import jestConfig from "@pixpilot/dev-config/eslint-jest";
 * export default [...config, ...jestConfig];
 * ```
 */
const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  // Ignore files from .gitignore at the project's root
  gitignore,
  {
    ignores: [
      'dist/',
      'build/',
      'coverage/',
      'node_modules/',
      '**/node_modules/**',
      'example-*.js',
      '**/*.config.*',
      '**/*.d.ts',
      '**/*.map',
    ],
  },

  // Base configuration for all JS/TS files
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx', '**/*.mjs', '**/*.cjs'],

    plugins: {
      import: importPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      // Add eslint-config-prettier at the end to override other configs
      eslintConfigPrettier,
    ],
    rules: {
      // `"prettier/prettier": "error"` is removed. Run Prettier separately.

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',

      // Import rules
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // General JavaScript rules
      'no-console':
        process.env.ESLINT_NO_CONSOLE === 'off'
          ? 'off'
          : [
              process.env.NODE_ENV === 'production' ? 'error' : 'warn',
              { allow: ['warn', 'error'] },
            ],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-implicit-coercion': 'error',
    },
  },

  // Specific configuration for JavaScript files (disable TypeScript-specific rules)
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Language and linter options
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        // Use `project: true` and `tsconfigRootDir` for robust type-checking
        project: true,
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
);

export default config;

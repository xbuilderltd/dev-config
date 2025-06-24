import type { TSESLint } from '@typescript-eslint/utils';
import jestPlugin from 'eslint-plugin-jest';

const ignores = ['**/__mocks__/**/*.{js,ts,tsx,jsx}'];
/**
 * ESLint configuration for Jest testing files.
 *
 * This is a Jest-only configuration that should be used alongside other ESLint configs.
 *
 * Requirements:
 * - eslint-plugin-jest@27+ (for Flat Config compatibility)
 *
 * This configuration provides comprehensive Jest linting rules including:
 * - Recommended Jest rules for best practices
 * - Style rules for consistent formatting and preferences
 * - Additional custom rules for enhanced testing quality
 * - Environment-specific rule overrides for test files
 * - Relaxed TypeScript rules for test flexibility (any types, magic numbers, etc.)
 *
 * For DOM-based testing (React, Vue, etc.), consider adding:
 * - eslint-plugin-jest-dom for Jest DOM matchers
 * - eslint-plugin-testing-library for Testing Library best practices
 *
 * These can be added as separate configurations alongside this base Jest config.
 */
const config: TSESLint.FlatConfig.ConfigArray = [
  {
    files: [
      '**/*.test.{js,ts,tsx,jsx}',
      '**/*.spec.{js,ts,tsx,jsx}',
      '**/__tests__/**/*.{js,ts,tsx,jsx}',
      '**/tests/**/*.{js,ts,tsx,jsx}',
      '**/test/**/*.{js,ts,tsx,jsx}',
    ],
    // Exclude mock files from having Jest rules applied
    ignores,
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    // Settings for import resolution (if using eslint-plugin-import)
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // Jest recommended rules
      ...jestPlugin.configs.recommended.rules,

      // Jest style rules for consistent formatting and preferences
      ...jestPlugin.configs.style.rules,

      // Additional Jest-specific rules
      'jest/consistent-test-it': ['error', { fn: 'test' }],
      'jest/expect-expect': [
        'error',
        {
          assertFunctionNames: [
            'expect',
            'request.*.expect', // For supertest-style testing
            'assert', // For Node.js assert module
            'should', // For should.js
            'chai.*', // For Chai assertions
            '*.expect', // Generic expect patterns
          ],
        },
      ],
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/no-commented-out-tests': 'warn',
      'jest/prefer-to-have-length': 'warn',
      'jest/prefer-to-be': 'warn',
      'jest/prefer-to-contain': 'warn',
      'jest/prefer-equality-matcher': 'warn',
      'jest/prefer-strict-equal': 'warn',
      'jest/prefer-spy-on': 'warn',
      'jest/prefer-todo': 'warn',
      'jest/prefer-mock-promise-shorthand': 'warn',
      'jest/prefer-snapshot-hint': 'warn',
      'jest/no-large-snapshots': ['warn', { maxSize: 50 }],
      'jest/prefer-each': 'warn', // For parameterized tests
      'jest/valid-describe-callback': 'error',
      'jest/valid-expect': 'error',
      'jest/valid-expect-in-promise': 'error',
      'jest/valid-title': 'error',
      'jest/no-conditional-expect': 'error',
      'jest/no-deprecated-functions': 'error',
      'jest/no-done-callback': 'error',
      'jest/no-duplicate-hooks': 'error',
      'jest/no-export': 'error',
      'jest/no-standalone-expect': 'error',
      'jest/no-test-return-statement': 'error',
      'jest/require-top-level-describe': 'warn',
      'jest/prefer-hooks-on-top': 'error',
      'jest/prefer-lowercase-title': [
        'error',
        {
          ignore: ['describe'],
        },
      ],

      // Environment-specific overrides - more explicit Jest-specific rules
      'jest/no-console': 'off', // More explicit than just "no-console": "off"

      // Disable conflicting ESLint rules in test files
      'no-console': 'off', // Allow console.log in tests for debugging
      '@typescript-eslint/no-explicit-any': 'off', // Sometimes needed for mocking
      '@typescript-eslint/no-non-null-assertion': 'off', // Common in tests
      '@typescript-eslint/unbound-method': 'off', // Jest mocks can trigger this
      'import/no-extraneous-dependencies': 'off', // Test utilities might not be in main deps

      // Additional flexibility for test files
      '@typescript-eslint/no-unsafe-assignment': 'off', // Allow any type assignments in test mocks/fixtures
      '@typescript-eslint/no-unsafe-member-access': 'off', // Allow accessing any type properties in tests
      '@typescript-eslint/no-unsafe-call': 'off', // Allow calling any type functions in tests
      '@typescript-eslint/no-unsafe-return': 'off', // Allow returning any type in test utilities
      '@typescript-eslint/no-unsafe-argument': 'off', // Allow unsafe arguments in test utilities
      '@typescript-eslint/no-magic-numbers': 'off', // Allow magic numbers in test data
      '@typescript-eslint/no-empty-function': 'off', // Allow empty functions in mocks
      'max-len': 'off', // Tests often have descriptive but long names
      '@typescript-eslint/ban-ts-comment': 'off', // Sometimes needed for complex test scenarios
    },
  },
  // Separate config to exclude mock files from Jest rules
  {
    files: ignores,
    rules: {
      // Disable Jest rules for mock files as they don't contain actual tests
      'jest/no-export': 'off',
    },
  },
];

/**
 * Optional extensions for DOM-based testing:
 *
 * For React/DOM testing with Testing Library:
 * ```typescript
 * import testingLibraryPlugin from "eslint-plugin-testing-library";
 * import jestDomPlugin from "eslint-plugin-jest-dom";
 *
 * // Add to your ESLint config alongside the base Jest config:
 * {
 *   files: ["**\/*.test.{js,ts,tsx,jsx}", "**\/__tests__\/**\/*.{js,ts,tsx,jsx}"],
 *   plugins: {
 *     "testing-library": testingLibraryPlugin,
 *     "jest-dom": jestDomPlugin,
 *   },
 *   rules: {
 *     ...testingLibraryPlugin.configs.react.rules,
 *     ...jestDomPlugin.configs.recommended.rules,
 *   },
 * }
 * ```
 */

export default config;

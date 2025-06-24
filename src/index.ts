// Re-export configurations
export { default as eslintConfig } from './eslint.js';
export { default as eslintJestConfig } from './eslint-jest.js';
export { default as prettierConfig } from './prettier.js';
export { default as jestConfig } from './jest.js';

// Export types
export type { TSESLint, PrettierConfig, JestConfig } from './types.d.ts';

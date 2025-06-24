// Re-export official types from their respective packages

// ESLint types from @typescript-eslint/utils
export type { TSESLint } from '@typescript-eslint/utils';

// Prettier types - we'll re-export the Config type
export type { Config as PrettierConfig } from 'prettier';

// Jest types - we'll re-export the Config type
export type { Config as JestConfig } from 'jest';

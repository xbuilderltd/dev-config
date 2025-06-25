// Jest configuration for TypeScript projects
// This file provides a Jest configuration that users can extend
// Requires jest to be installed as an optional peer dependency

import type { Config } from 'jest';

const config: Config = {
  // Test environment
  testEnvironment: 'node',

  // File extensions Jest will look for
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Transform files with TypeScript
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'ES2022',
          target: 'ES2022',
        },
      },
    ],
  },

  // Module name mapping for path aliases (common patterns)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },

  // Test file patterns
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)', '**/*.(test|spec).(ts|tsx|js|jsx)'],

  // Files to ignore
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/coverage/'],

  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.(ts|tsx|js|jsx)',
    '!src/**/*.d.ts',
    '!src/**/*.config.*',
    '!src/**/index.(ts|tsx|js|jsx)', // Often just re-exports
  ],

  // Coverage thresholds (can be customized per project)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Coverage output
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Setup files
  setupFilesAfterEnv: [],

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true,

  // Use verbose output
  verbose: true,

  // ESM support
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Error handling
  errorOnDeprecated: true,

  // Performance
  maxWorkers: '50%',

  // Timeout for tests (30 seconds)
  testTimeout: 30000,
};

export default config;

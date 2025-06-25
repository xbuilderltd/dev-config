import type { PrettierConfig } from './types.d.ts';

const config: PrettierConfig = {
  // Line length and formatting
  printWidth: 90,
  tabWidth: 2,
  useTabs: false,

  // Semicolons and quotes
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  // Trailing commas and spacing
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false, // Arrow functions and line endings
  arrowParens: 'always',
  endOfLine: 'lf',
};
export default config;

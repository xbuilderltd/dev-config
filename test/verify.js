#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function test() {
  try {
    console.log('Testing @pixpilot/dev-config...\n'); // Test ESLint config import
    console.log('✓ Testing ESLint config import...');
    const eslintConfig = await import('../dist/eslint.js');
    if (Array.isArray(eslintConfig.default)) {
      console.log('✓ ESLint config is an array (flat config format)');
      console.log(`  - Contains ${eslintConfig.default.length} configuration objects`);
    } else {
      throw new Error('ESLint config should be an array');
    }

    // Test Jest ESLint config import
    console.log('✓ Testing Jest ESLint config import...');
    const eslintJestConfig = await import('../dist/eslint-jest.js');
    if (Array.isArray(eslintJestConfig.default)) {
      console.log('✓ Jest ESLint config is an array (flat config format)');
      console.log(
        `  - Contains ${eslintJestConfig.default.length} configuration objects`,
      );
    } else {
      throw new Error('Jest ESLint config should be an array');
    }

    // Test Prettier config import
    console.log('✓ Testing Prettier config import...');
    const prettierConfig = await import('../dist/prettier.js');
    if (typeof prettierConfig.default === 'object' && prettierConfig.default !== null) {
      console.log('✓ Prettier config is an object');
      console.log(`  - printWidth: ${prettierConfig.default.printWidth}`);
      console.log(`  - tabWidth: ${prettierConfig.default.tabWidth}`);
      console.log(`  - singleQuote: ${prettierConfig.default.singleQuote}`);
    } else {
      throw new Error('Prettier config should be an object');
    } // Test TypeScript config
    console.log('✓ Testing TypeScript config...');
    const tsConfigRaw = await readFile(
      join(import.meta.dirname, '..', 'dist', 'tsconfig-base.json'),
      'utf-8',
    );

    // Check that the file exists and contains expected properties
    if (
      tsConfigRaw.includes('"strict": true') &&
      tsConfigRaw.includes('"target": "ES2022"') &&
      tsConfigRaw.includes('"module": "Preserve"')
    ) {
      console.log('✓ TypeScript config is valid and contains expected settings');
      console.log('  - Contains strict: true');
      console.log('  - Contains target: ES2022');
      console.log('  - Contains module: Preserve');
    } else {
      throw new Error('TypeScript config is missing expected properties');
    } // Test index exports
    console.log('✓ Testing index exports...');
    const indexExports = await import('../dist/index.js');
    if (
      indexExports.eslintConfig &&
      indexExports.eslintJestConfig &&
      indexExports.prettierConfig
    ) {
      console.log('✓ Index exports eslintConfig, eslintJestConfig, and prettierConfig');
    } else {
      throw new Error('Index should export all configs');
    } // Verify package.json exports
    console.log('✓ Testing package.json exports...');
    const packageJson = JSON.parse(
      await readFile(join(import.meta.dirname, '..', 'package.json'), 'utf-8'),
    );
    if (
      packageJson.exports['./eslint'] &&
      packageJson.exports['./eslint-jest'] &&
      packageJson.exports['./prettier'] &&
      packageJson.exports['./typescript']
    ) {
      console.log(
        '✓ Package.json has correct exports (eslint, eslint-jest, prettier, typescript)',
      );
    } else {
      throw new Error('Package.json exports are incorrect');
    }

    console.log('\n🎉 All tests passed! The package is ready to use.');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

test();

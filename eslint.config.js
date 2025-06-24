import eslintConfig from '@pixpilot/dev-config/eslint';

export default [
  ...eslintConfig,
  {
    ignores: ['test/', ...eslintConfig[0].ignores],
  },
];

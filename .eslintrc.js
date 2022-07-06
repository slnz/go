module.exports = {
  extends: [
    'eslint-config-standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['**/*.spec.tsx', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-empty-function': ['off']
      }
    }
  ]
}

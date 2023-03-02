module.exports = {
  extends: ['@redhat-cloud-services/eslint-config-redhat-cloud-services', 'plugin:storybook/recommended'],
  globals: {
    insights: 'readonly',
    shallow: 'readonly',
    render: 'readonly',
    mount: 'readonly'
  },
  overrides: [{
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }],
  rules: {
    'sort-imports': ['error', {
      ignoreDeclarationSort: true
    }]
  }
};
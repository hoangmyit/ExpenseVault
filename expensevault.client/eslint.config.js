import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactEslint from 'eslint-plugin-react';
import securityPlugin from 'eslint-plugin-security';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config({ ignores: ['dist'] }, prettier, {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react': reactEslint,
    'jsx-a11y': jsxA11Y,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'simple-import-sort': simpleImportSort,
    'security': securityPlugin,
    prettier: eslintPluginPrettier,
    'unused-imports': unusedImports,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...reactEslint.configs.recommended.rules,
    ...jsxA11Y.configs.recommended.rules,
    ...securityPlugin.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // React imports
          ['^react', '^react-dom'],
          // External packages
          ['^@?\\w'],
          // Internal aliases
          ['^@core', '^@shared', '^@features', '^@icons', '^@assets'],
          // Parent imports (../)
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Same directory imports (./)
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off', 
    'react/prop-types': 'off',
    'security/detect-object-injection': 'warn',
    'jsx-a11y/label-has-associated-control': 'off',
  },
});

import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    ignores: ['.angular/**', '.vite/**', 'node_modules/**', 'dist/**', 'libs/ui/**'],
  },
  ...tseslint.config(
    {
      files: ['**/*.ts'],
      plugins: {
        'unused-imports': unusedImports,
      },
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
        ...angular.configs.tsRecommended,
        eslintPluginUnicorn.configs.all,
      ],
      processor: angular.processInlineTemplates,
      rules: {
        '@angular-eslint/component-class-suffix': 'off',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'bt',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/directive-class-suffix': 'off',
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'bt',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/prefer-signals': 'error',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'generic',
            readonly: 'generic',
          },
        ],
        '@typescript-eslint/no-deprecated': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-floating-promises': [
          'error',
          {
            allowForKnownSafeCalls: [
              // Angular router navigate and navigateByUrl are safe to ignore
              {
                from: 'package',
                package: '@angular/router',
                name: ['navigate', 'navigateByUrl'],
              },
            ],
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-case-declarations': 'off',
        'no-restricted-syntax': [
          'error',
          {
            selector: "CallExpression[callee.name='fdescribe']",
            message: "'Do not use focused test suites (fdescribe)",
          },
          {
            selector: "CallExpression[callee.name='fit']",
            message: "'Do not use focused tests (fit)",
          },
        ],
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'rxjs/operators',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.html'],
      extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
      rules: {
        '@angular-eslint/template/click-events-have-key-events': 'off',
        '@angular-eslint/template/eqeqeq': [
          'error',
          {
            allowNullOrUndefined: true,
          },
        ],
        '@angular-eslint/template/prefer-control-flow': 'error',
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
        '@angular-eslint/template/interactive-supports-focus': 'off',
      },
    },
  ),
  eslintPluginPrettierRecommended,
  // set the parse options for typed rules
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
];

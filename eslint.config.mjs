import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = path.dirname(currentFilePath)
const compat = new FlatCompat({
  baseDirectory: currentDirPath,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [...compat.extends(
  'plugin:@typescript-eslint/recommended',
  'plugin:vue/vue3-recommended',
  'eslint:recommended',
  '@vue/typescript',
  'plugin:vue/base',
  './.eslintrc-auto-import.json',
), {
  plugins: {
    '@typescript-eslint': typescriptEslint
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly'
    },

    ecmaVersion: 5,
    sourceType: 'commonjs',

    parserOptions: {
      parser: '@typescript-eslint/parser',

      ecmaFeatures: {
        jsx: false
      }
    }
  },

  settings: {
    'import/resolver': {
      typescript: {}
    }
  },

  rules: {
    'multiline-ternary': ['error', 'always-multiline'],
    'no-multi-spaces': 'error',

    'newline-per-chained-call': ['error', {
      ignoreChainWithDepth: 4
    }],

    'no-whitespace-before-property': 'error',

    indent: ['error', 2, {
      CallExpression: {
        arguments: 'first'
      },

      FunctionExpression: {
        parameters: 'first'
      },

      offsetTernaryExpressions: true,
      SwitchCase: 1,

      FunctionDeclaration: {
        body: 1,
        parameters: 2
      },

      ImportDeclaration: 1,
      ObjectExpression: 1
    }],

    'array-bracket-spacing': ['error', 'never'],

    'comma-spacing': ['error', {
      before: false,
      after: true
    }],

    'lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true
    }],

    'array-callback-return': ['error', {
      allowImplicit: true
    }],

    '@typescript-eslint/no-empty-interface': 'off',

    eqeqeq: [1, 'always', {
      null: 'ignore'
    }],

    'no-else-return': [1, {
      allowElseIf: false
    }],

    quotes: [2, 'single', {
      avoidEscape: true
    }],

    semi: [2, 'never'],

    'keyword-spacing': ['error', {
      before: true
    }],

    'max-params': ['error', 5],
    'max-statements': ['off', 10],
    'comma-dangle': ['error', 'never'],

    'object-curly-spacing': ['error', 'always', {
      arraysInObjects: false
    }],

    'no-multiple-empty-lines': ['error', {
      max: 2,
      maxEOF: 1
    }],

    'no-unneeded-ternary': ['error', {
      defaultAssignment: false
    }],

    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-unused-components': 'warn',
    'vue/multiline-html-element-content-newline': 'warn',
    'no-trailing-spaces': 'warn',
    'vue/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/no-mutating-props': 'off',
    'vue/no-v-html': 'off',
    'no-case-declarations': 'off',
    'vue/multi-word-component-names': 'off',
    camelcase: 'off',
    curly: 0,
    'dot-notation': 0,

    'vue/max-attributes-per-line': ['warn', {
      singleline: {
        max: 2
      },

      multiline: {
        max: 1
      }
    }]
  }
}]

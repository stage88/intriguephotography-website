import { defineConfig } from 'eslint/config'
import vitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  {
    ignores: [
      '**/postcss.config.cjs',
      '**/tailwind.config.cjs',
    ],
  },
  ...vitals,
  ...typescript,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
])

export default eslintConfig
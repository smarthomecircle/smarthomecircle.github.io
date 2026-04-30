// Flat config for ESLint 9.
// eslint-config-next 16 exports its rules as a flat-config array, so we can
// spread it in directly; no `FlatCompat` bridge required.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'public/**',
      'target/**',
      'data/**',
      'scripts/next-remote-watch.js',
    ],
  },
  ...nextCoreWebVitals,
  eslintConfigPrettier,
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'prettier/prettier': 'warn',
      // eslint-plugin-react-hooks v7 (shipped with eslint-config-next 16)
      // introduced a slate of rules that are strict about effect semantics
      // and render-time side effects. The existing codebase predates them;
      // downgrade to warnings so upgrades aren't blocked by a pile of
      // legitimate-but-non-idiomatic patterns.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/globals': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/config': 'warn',
    },
  },
]

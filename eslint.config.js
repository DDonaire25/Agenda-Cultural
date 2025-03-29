import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended'; // Añadido
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', '**/*.config.js'] }, // Ignora archivos de configuración
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactRecommended, // Añade reglas recomendadas de React
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022, // Actualizado a 2022
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Habilita JSX
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-uses-react': 'error', // Evita advertencias de React no usado
      'react/jsx-uses-vars': 'error',
    },
  }
);
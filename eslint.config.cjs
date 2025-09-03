// eslint.config.js
const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: ["**/*.d.ts", "dist/**", "node_modules/**"]
  },

  // Базовые правила JS от ESLint
  js.configs.recommended,

  {
    files: ["src/**/*.{ts,js}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // браузерные глобалы
        window: "readonly",
        document: "readonly",
        console: "readonly",
        HTMLElement: "readonly",
        HTMLButtonElement: "readonly",
        KeyboardEvent: "readonly",
        getComputedStyle: "readonly",
        Node: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off" // можешь убрать, если хочешь запретить any
    }
  }
];
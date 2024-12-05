import js from "@eslint/js";
import markdown from "@eslint/markdown";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import prettier from "eslint-config-prettier";
import { readGitignoreFiles } from "eslint-gitignore";
import perfectionist from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import ts from "typescript-eslint";

const scriptName = process?.env?.npm_lifecycle_event || "";
const strictMode = scriptName.includes("lint") || scriptName.includes("build");

/** @type {import('eslint').Linter.Config[]} */
export const eslintConfigs = [
  { files: ["**/*.{js,svelte,ts,vue}"] },
  { ignores: [...readGitignoreFiles(), "*.min.*"] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig(),
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  perfectionist.configs["recommended-natural"],
  ...markdown.configs.processor,
  {
    rules: {
      "no-console": [strictMode ? "warn" : "off", { allow: ["error"] }],
      "no-debugger": strictMode ? "warn" : "off",
      "vue/component-name-in-template-casing": [
        "error",
        "kebab-case",
        {
          ignores: [],
          registeredComponentsOnly: false,
        },
      ],
      "vue/no-v-html": "off",
    },
  },
];

/** @type {(configs?: import('eslint').Linter.Config[]) => import('eslint').Linter.Config[]} */
export const createEslintConfig = (configs = []) =>
  ts.config(...eslintConfigs, ...configs);

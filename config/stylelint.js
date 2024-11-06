import { properties } from "./stylelint-properties-order.js";

/** @type {(options?: object) => import('stylelint').Config} */
export const createStylelintConfig = ({ useSorting = true } = {}) => {
  const config = {
    extends: ["stylelint-config-standard"],
    overrides: [
      {
        customSyntax: "postcss-scss",
        files: ["**/*.scss"],
        rules: {
          "annotation-no-unknown": [true, { ignoreAnnotations: ["default"] }],
        },
      },
      {
        customSyntax: "postcss-html",
        files: ["**/*.svelte", "**/*.vue"],
        rules: {
          "function-no-unknown": [true, { ignoreFunctions: ["v-bind"] }],
          "selector-pseudo-class-no-unknown": [
            true,
            {
              ignorePseudoClasses: ["global", "deep"],
            },
          ],
        },
      },
    ],
    rules: {
      "alpha-value-notation": "number",
      "at-rule-empty-line-before": null,
      "at-rule-no-unknown": [
        true,
        {
          ignoreAtRules: [
            "content",
            "each",
            "else",
            "forward",
            "if",
            "include",
            "mixin",
            "page",
            "use",
          ],
        },
      ],
      "color-function-notation": "legacy",
      "color-hex-length": "long",
      "custom-property-empty-line-before": null,
      "declaration-block-no-redundant-longhand-properties": [
        true,
        { ignoreShorthands: ["grid-template"] },
      ],
      "font-family-name-quotes": "always-unless-keyword",
      "import-notation": "string",
      "media-feature-range-notation": "prefix",
      "selector-class-pattern": [
        "^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)*(?:[.+])?$",
        {
          message: function expected(selectorValue) {
            return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
          },
          resolveNestedSelectors: true,
        },
      ],
      "value-keyword-case": [
        "lower",
        {
          camelCaseSvgKeywords: true,
        },
      ],
    },
  };

  if (useSorting) {
    config.plugins = [`stylelint-order`];
    config.rules["order/properties-order"] = [{ properties }];
  }

  return config;
};

/** @type {import('stylelint').Config} */
export const stylelintConfig = createStylelintConfig();

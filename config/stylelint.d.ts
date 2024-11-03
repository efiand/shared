import type { Config } from "stylelint";

declare const stylelintConfig: Config;
declare const createStylelintConfig: (options?: {
  useSorting: boolean;
}) => Config;

export { createStylelintConfig, stylelintConfig };

import type { Linter } from "eslint";

declare const eslintConfigs: Linter.Config[];
declare const createEslintConfig: (
  configs?: Linter.Config[],
) => Linter.Config[];

export { createEslintConfig, eslintConfigs };

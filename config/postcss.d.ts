import type { AcceptedPlugin } from "postcss";

declare const postcssConfig: {
  plugins?: readonly AcceptedPlugin[];
};

declare const postcssPlugins: {
  [key: string]: unknown;
};

export { postcssConfig, postcssPlugins };

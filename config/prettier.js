/** @type {import('prettier').Config} */
export const prettierConfig = {
  htmlWhitespaceSensitivity: "ignore",
  overrides: [
    {
      files: "*.vue",
      options: { parser: "vue" },
    },
    {
      files: "*.svelte",
      options: { parser: "svelte" },
    },
    {
      files: "*.{html,twig}",
      options: { parser: "liquid-html" },
    },
    {
      files: ["{.output,.svelte-kit,build,dist,public}/**", "*lock*"],
      options: { insertPragma: true },
    },
  ],
  plugins: ["@destination/prettier-plugin-twig", "prettier-plugin-svelte"],
  printWidth: 80,
  quoteProps: "consistent",
};

export default prettierConfig;

/** @type {import('prettier').Config} */
export const prettierConfig = {
  htmlWhitespaceSensitivity: "ignore",
  overrides: [
    {
      files: "*.vue",
      options: { parser: "vue" },
    },
    {
      files: "*.{html,twig}",
      options: { parser: "liquid-html" },
    },
    {
      files: ["{build,dist,public}/**", "*lock*"],
      options: { insertPragma: true },
    },
  ],
  plugins: ["@destination/prettier-plugin-twig"],
  printWidth: 80,
  quoteProps: "consistent",
};

export default prettierConfig;

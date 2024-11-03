import autoprefixer from "autoprefixer";
import sortMediaQueries from "postcss-sort-media-queries";
import postcssUrl from "postcss-url";

const postcssUrlOptions = {
  filter: "**/icons/*",
  url: "inline",
};

/** @type {{ [key: string]: unknown }}} */
export const postcssPlugins = {
  "autoprefixer": {},
  "postcss-sort-media-queries": {},
  "postcss-url": postcssUrlOptions,
};

/** @type {{ plugins?: readonly import('postcss').AcceptedPlugin[] }}} */
export const postcssConfig = {
  plugins: [autoprefixer, sortMediaQueries(), postcssUrl(postcssUrlOptions)],
};

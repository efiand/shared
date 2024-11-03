import { readFile } from "node:fs/promises";
import path from "node:path";
import * as sass from "sass";

const PATTERN =
  /<([A-z0-9-]+)\s+([^>]*?)inline-src\s*=\s*("|')([^>]*?)("|')([^>]*?)\s*((\/>)|(>\s*<\/\s*\1\s*>))/gi;

export const inlineScssAndJs = async (source, ctx) => {
  const result = [];
  const tokens = source.matchAll(PATTERN);
  let prevPos = 0;
  for (const token of tokens) {
    const [matched, tagName, preAttributes, , filePath, , postAttributes] =
      token;
    const isInlineStyleTag = tagName.toLowerCase() === "style";
    const isInlineScriptTag = tagName.toLowerCase() === "script";
    const isScssFile = path.extname(filePath).toLowerCase() === ".scss";
    const isJsFile = path.extname(filePath).toLowerCase() === ".js";
    if (!(isInlineStyleTag || isInlineScriptTag) || !(isJsFile || isScssFile)) {
      continue;
    }
    const { index } = token;
    let fileContent = ctx.load
      ? // @ts-expect-error don't know these types aren't right
        (await ctx.load({ id: `${filePath}?raw` })).ast?.body?.[0].declaration
          .value
      : (await readFile(`${filePath}`)).toString();
    if (isScssFile) {
      fileContent = sass.compileString(fileContent, {
        loadPaths: [
          "src/assets/scss",
          "node_modules",
          "node_modules/efiand-shared/scss",
        ],
      }).css;
    }
    if (index !== prevPos) {
      result.push(source.slice(prevPos, index));
    }
    result.push(
      `<${tagName} ${preAttributes.replace(/inline-src/g, "")} ${postAttributes.replace(/inline-src/g, "")}>${fileContent}</${tagName}>`,
    );
    prevPos = index + matched.length;
  }
  result.push(source.slice(prevPos));
  return result.join("");
};

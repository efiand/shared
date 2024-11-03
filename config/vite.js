import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createLogger } from "vite";

import { inlineScssAndJs } from "../plugins/inliner.js";
import { renderTwigTemplate } from "../plugins/twig.js";
import { dequerize } from "../utils/url.js";
import { postcssConfig } from "./postcss.js";

const ASSET_TYPES = [
  "avif",
  "gif",
  "ico",
  "jpg",
  "json",
  "mp3",
  "mp4",
  "ogg",
  "pdf",
  "png",
  "svg",
  "txt",
  "webm",
  "webmanifest",
  "webp",
  "woff2",
];
const ASSET_REGEX = new RegExp(`\\.(${ASSET_TYPES.join("|")})(\\?.*)?$`);
const cwd = process.cwd();
const inPlacePublicPath = path.join(cwd, "public");
const sharedPublicPath = path.join(cwd, "node_modules/efiand-shared/public");

export const customizeLogger = ({ patternsToHide = [] } = {}) => {
  const customLogger = createLogger();
  const originalWarnOnce = customLogger.warnOnce;
  const originalInfo = customLogger.info;

  customLogger.warnOnce = (message, options) => {
    for (const warning of patternsToHide) {
      if (message.includes(warning)) {
        return;
      }
    }
    originalWarnOnce(message, options);
  };
  customLogger.info = (message, options) => {
    for (const warning of patternsToHide) {
      if (message.includes(warning)) {
        return;
      }
    }
    originalInfo(message, options);
  };

  return {
    config() {
      return { customLogger };
    },
    name: "custom-logger",
  };
};

export const definePostcss = () => {
  return {
    config() {
      return {
        css: { postcss: postcssConfig },
      };
    },
    name: "define-postcss",
  };
};

export const defineSharedStatic = (prefix = "") => {
  return {
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!ASSET_REGEX.test(req.url)) {
          return next();
        }
        const url = dequerize(req.url.replace(new RegExp(`^${prefix}`), ""));
        const isInPlace = await access(path.join(inPlacePublicPath, url)).then(
          () => true,
          () => false,
        );
        if (isInPlace) {
          return next();
        }
        const filePath = path.join(sharedPublicPath, url);
        const isInShared = await access(filePath).then(
          () => true,
          () => false,
        );
        if (!isInShared) {
          return next();
        }
        createReadStream(filePath).pipe(res);
      });
    },
    name: "define-shared-static",
  };
};

export const defineTwig = (data) => {
  return {
    name: "vite-twig",
    transformIndexHtml: {
      async handler(_html, ctx) {
        const result = await renderTwigTemplate(
          path.join(cwd, ctx.path.replace(/^\//, "")),
          data,
        );
        const resultWithInlineCode = await inlineScssAndJs(result, ctx);
        return resultWithInlineCode;
      },
      order: "pre",
    },
  };
};

export const watchNodeModules = (modules) => {
  return {
    config() {
      return {
        optimizeDeps: {
          exclude: modules,
        },
      };
    },
    configureServer(server) {
      const regexp = `/node_modules\\/(?!${modules.join("|")}).*/`;
      const watcher = server.watcher;
      watcher.options = {
        ...server.watcher.options,
        ignored: ["**/.git/**", "**/test-results/**", new RegExp(regexp)],
      };
      watcher._userIgnored = undefined;
    },
    name: "watch-node-modules",
  };
};

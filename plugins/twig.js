import Twig from "twig";

Twig.cache(false);

export const renderTwigTemplate = (filepath, data) => {
  return new Promise((resolve, reject) => {
    Twig.renderFile(filepath, data, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

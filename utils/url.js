/**
 * Удаляет query string из URL
 * @type {(url: string) => string}
 */
export const dequerize = (url) => {
  return url.replace(/(.*)\?.*$/, "$1");
};

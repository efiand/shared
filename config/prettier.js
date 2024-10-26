/** @type {import('prettier').Config} */
export const prettierConfig = {
	singleQuote: true,
	useTabs: true,
	trailingComma: 'all',
	quoteProps: 'consistent',
	arrowParens: 'always',
	singleAttributePerLine: false,
	htmlWhitespaceSensitivity: 'ignore',
	overrides: [{ files: '*.vue', options: { parser: 'vue' } }],
};

export default prettierConfig;

/** @type {import('prettier').Config} */
export const prettierConfig = {
	arrowParens: 'always',
	htmlWhitespaceSensitivity: 'ignore',
	overrides: [{ files: '*.vue', options: { parser: 'vue' } }],
	quoteProps: 'consistent',
	singleAttributePerLine: false,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
};

export default prettierConfig;

import { properties } from './stylelint-properties-order.js';

/** @type {import('stylelint').Config} */
export const stylelintConfig = {
	extends: ['stylelint-config-standard'],
	plugins: [`stylelint-order`],
	overrides: [
		{
			customSyntax: 'postcss-scss',
			files: ['**/*.scss'],
			rules: {
				'annotation-no-unknown': [true, { ignoreAnnotations: ['default'] }],
			},
		},
		{
			customSyntax: 'postcss-html',
			files: ['**/*.svelte', '**/*.vue'],
			rules: {
				'function-no-unknown': [true, { ignoreFunctions: ['v-bind'] }],
				'selector-pseudo-class-no-unknown': [
					true,
					{
						ignorePseudoClasses: ['global', 'deep'],
					},
				],
			},
		},
	],
	rules: {
		'at-rule-empty-line-before': null,
		'alpha-value-notation': 'number',
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'content',
					'each',
					'else',
					'forward',
					'if',
					'include',
					'mixin',
					'page',
					'use',
				],
			},
		],
		'color-function-notation': 'legacy',
		'color-hex-length': 'long',
		'font-family-name-quotes': 'always-unless-keyword',
		'import-notation': 'string',
		'media-feature-range-notation': 'prefix',
		'order/properties-order': [{ properties }],
		'selector-class-pattern': [
			'^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)*(?:[.+])?$',
			{
				message: function expected(selectorValue) {
					return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
				},
				resolveNestedSelectors: true,
			},
		],
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true,
			},
		],
	},
};

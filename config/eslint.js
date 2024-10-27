import markdown from '@eslint/markdown';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import { readGitignoreFiles } from 'eslint-gitignore';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config['rules']} */
export const eslintSharedCustomRules = {
	'no-console': [
		process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		{ allow: ['error'] },
	],
	'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'vue/component-name-in-template-casing': [
		'error',
		'kebab-case',
		{
			ignores: [],
			registeredComponentsOnly: false,
		},
	],
	'vue/html-indent': ['error', 'tab'],
	'vue/html-self-closing': 'off',
	'vue/max-attributes-per-line': 'off',
	'vue/singleline-html-element-content-newline': 'off',
};

/** @type {import('eslint').Linter.Config[]} */
export const eslintConfigs = [
	{ files: ['**/*.{js,ts,vue}'] },
	{ ignores: [...readGitignoreFiles(), '*.min.*'] },
	...pluginVue.configs['flat/strongly-recommended'],
	...vueTsEslintConfig(),
	perfectionist.configs['recommended-natural'],
	...markdown.configs.processor,
	{
		plugins: {
			vue: pluginVue,
		},
		rules: eslintSharedCustomRules,
	},
];

/** @type {(configs?: import('eslint').Linter.Config[]) => import('eslint').Linter.Config[]} */
export const createEslintConfig = (configs = []) => [
	...eslintConfigs,
	...configs,
];

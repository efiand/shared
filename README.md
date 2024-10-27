# shared [![npm version](https://img.shields.io/npm/v/efiand-shared.svg)](https://www.npmjs.com/package/efiand-shared)

Набор общих модулей (компонентов, конфигураций, утилит) для любого проекта (Vanilla JS, Vue, Nuxt, Svelte).

## Конфмгурации

```js
// eslint.config.js

import {
	createEslintConfig,
	eslintConfigs,
	eslintSharedCustomRules,
} from 'efiand-shared/config/stylelint.js';

let config = eslintConfigs;

// OR
config = createEslintConfig([oneConfig, anotherConfig]);

// OR
config = [...otherConfigs, { rules: eslintSharedCustomRules }];

export default config;
```

```js
// stylelint.config.js

import { stylelintConfig } from 'efiand-shared/config/stylelint.js';

export default stylelintConfig;
```

```js
// .prettier.config.js

import { prettierConfig } from 'efiand-shared/config/prettier.js';

export default prettierConfig;
```

```js
// .postcss.config.js

import { postcssConfig } from 'efiand-shared/config/postcss.js';

export default postcssConfig;
```

```js
// vite.config.ts

import { watchNodeModules } from 'efiand-shared/config/vite';

export default {
	plugins: [watchNodeModules(['efiand-shared'])],
};
```

## Использование SVG-иконок в CSS

```scss
// @/assets/scss/global.scss

@use 'efiand-shared/scss/base/global';

$icons-path: 'src/icons'; // По умолчанию src/assets/icons, меняем при необходимости

html {
	// Добавится --icon-test, содержащая url() с интегрированной base64-иконкой
	@include icons(('test'));
}
```

# shared [![npm version](https://img.shields.io/npm/v/efiand-shared.svg)](https://www.npmjs.com/package/efiand-shared)

Набор общих модулей (компонентов, конфигураций, утилит) для любого проекта (Vanilla JS, Vue, Nuxt, Svelte).

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

## Разработка внутри внешнего приложения в режиме HMR

```js
// vite.config.ts

import { watchNodeModules } from 'efiand-shared/config/vite';

export default {
	plugins: [watchNodeModules(['efiand-shared'])],
};
```

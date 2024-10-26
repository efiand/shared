# shared [![npm version](https://img.shields.io/npm/v/efiand-shared.svg)](https://www.npmjs.com/package/efiand-shared)

Набор общих модулей (компонентов, конфигураций, утилит) для любого проекта (Vanilla JS, Vue, Nuxt, Svelte).

Разработка внутри внешнего приложения в режиме HMR:

```js
// vite.config.ts

import { watchNodeModules } from 'efiand-shared/config/vite';

export default {
	plugins: [watchNodeModules(['efiand-shared'])],
};
```

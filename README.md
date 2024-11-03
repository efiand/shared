# shared [![npm version](https://img.shields.io/npm/v/efiand-shared.svg)](https://www.npmjs.com/package/efiand-shared)

Система shared-модулей для любого проекта (Vanilla JS, Vue, Nuxt):

- Компоненты Vue (наша UI-библиотека).
- Модули SCSS.
- Самописные плагины.
- Утилиты.
- Конфиги и их фрагменты.

## Установка во внешнее приложение

```sh
# Устанавливаем нужные инструменты (зависит от приложения)
npm i -DE vite vue eslint stylelint prettier
# и т. п.

# Устанавливаем этот набор модулей
npm i -DE efiand-shared
```

## Использование во внешнем приложении

### eslint

```js
// eslint.config.js

import {
  createEslintConfig,
  eslintConfigs,
  eslintSharedCustomRules,
} from "efiand-shared/config/stylelint.js";

let config = eslintConfigs;

// OR
config = createEslintConfig([oneConfig, anotherConfig]);

// OR
config = [...otherConfigs, { rules: eslintSharedCustomRules }];

export default config;
```

### stylelint

```js
// stylelint.config.js

import {
  createStylelintConfig,
  stylelintConfig,
} from "efiand-shared/config/stylelint.js";

let config = stylelintConfig;

// OR
config = createStylelintConfig({ useSorting: false });

export default config;
```

### prettier

```js
// prettier.config.js

import { prettierConfig } from "efiand-shared/config/prettier.js";

export default prettierConfig;
```

### postcss

Для vite-приложений:

```js
// vite.config.ts

import { definePostcss } from "efiand-shared/config/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [definePostcss()],
});
```

Для любых приложений:

```js
// postcss.config.js

import { postcssConfig } from "efiand-shared/config/postcss.js";

export default postcssConfig;
```

### Слежение за правкой в node-модулях

Позволяет применять HMR в указанных пакетах внутри `node_modules`. Может быть полезно для отладки данной системы модулей внутри внешнего приложения.

```js
// vite.config.ts

import { watchNodeModules } from "efiand-shared/config/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [watchNodeModules(["efiand-shared"])],
});
```

### Настройка окружения в SCSS

```scss
// @/assets/scss/env.scss

// Подключаем shared-переменные и миксины для использования в приложении
@forward "efiand-shared/scss/env";

// Здесь можно переопределить переменные и добавить свои
@use "efiand-shared/scss/env" as *;

$primary: green;
```

### Использование SVG-иконок в SCSS

Используется интегрированный модуль postcss-url (см. выше про настройки postcss в проекте).
В CSS допустимо вшивать как векторные, так и растровые (для легаси-проектов) форматы.

Рекомендуется подключать в одном месте (на уровне селектора `html` - будет доступно на всей странице) во избежание дублирования CSS-переменных в коде.

```scss
// @/assets/scss/global.scss

@use "env" as *;
@use "efiand-shared/scss/base/global";

$icons-path: "assets/icons"; // По умолчанию src/assets/icons, меняем при необходимости

html {
  // Добавится --icon-test, содержащая url() с интегрированной base64-иконкой
  @include icons(("test"));
}
```

## Настройки по гайдам для VS Code

Находятся в каталоге [.vscode](.vscode).

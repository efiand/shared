<template>
  <div class="sh-select">
    <label
      v-if="$slots.default"
      class="sh-input__label"
      :for="id"
      @click="control?.open"
    >
      <slot />
    </label>
    <multi-select
      v-bind="props"
      ref="control"
      v-model="value"
      class="sh-select__control"
    />
    <div v-if="error" class="sh-select__error">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import MultiSelect from "@vueform/multiselect";
import { nanoid } from "nanoid";
import { computed, type InputHTMLAttributes, ref } from "vue";

interface SelectProps {
  canClear?: MultiSelect["canClear"];
  canDeselect?: MultiSelect["canDeselect"];
  classes?: MultiSelect["classes"];
  error?: string;
  id?: MultiSelect["id"];
  mode?: MultiSelect["mode"];
  modelValue: number | string;

  /** Возможность мультивыбора */
  multi?: boolean;

  /** Имя определяет наличие скрытого инпута */
  name?: InputHTMLAttributes["name"];

  /** Поддержка поля формы по имени */
  nativeSupport?: boolean;

  options: MultiSelect["options"];
}

const props = withDefaults(defineProps<SelectProps>(), {
  canClear: false,
  canDeselect: false,
  classes: () => ({
    caret: "sh-select__caret",
    caretOpen: "sh-select__caret--is-open",
    container: "sh-select__control",
    dropdown: "sh-select__dropdown",
    dropdownHidden: "sh-select__dropdown--hidden",
    dropdownTop: "sh-select__dropdown--top",
    option: "sh-select__option",
    optionPointed: "sh-select__option--pointed",
    options: "sh-select__options",
    optionSelected: "sh-select__option--selected",
    optionSelectedPointed:
      "sh-select__option--pointed sh-select__option--selected",
    singleLabel: "sh-select__label",
    singleLabelText: "sh-select__label-text",
    wrapper: "sh-select__wrapper",
  }),
  error: "",
  id: nanoid(),
  mode: ({ mode, multi }: SelectProps) => (multi ? "tags" : mode || "single"),
  name: undefined,
  nativeSupport: ({ name }: SelectProps) => Boolean(name),
});
const emit = defineEmits(["update:model-value"]);

const control = ref<MultiSelect | null>(null);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:model-value", newValue);
  },
});
</script>

<style lang="scss" scoped>
.sh-select {
  --hspace: var(--sh-select-hspace, 1.5rem);
  --vspace: var(--sh-select-vspace, 0.5rem);
  --option-vspace: var(--sh-select-option-vspace, var(--vspace));
  --caret-size: var(--sh-select-caret-size, 5px);

  display: grid;
  justify-items: start;
  gap: var(--sh-select-gap, 0.5rem);
}

.sh-select__control {
  position: relative;
  width: 100%;
  user-select: none;
}

:deep(.sh-select__wrapper) {
  position: relative;
  min-height: var(--sh-select-height, none);
  background-color: var(--sh-select-color-back, var(--color-back));
  border-radius: var(--sh-select-radius, 0);
  cursor: pointer;
}

:deep(.sh-select__label) {
  position: absolute;
  top: var(--vspace);
  right: 40px;
  left: 16px;
  padding: var(--vspace) var(--hspace);
  padding-right: calc(var(--hspace) * 2 + var(--caret-size));
  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
}

:deep(.sh-select__caret) {
  position: absolute;
  top: 50%;
  right: var(--hspaces);
  width: var(--caret-size);
  height: var(--caret-size);
  transform: translateY(-50%);
  pointer-events: none;

  @include motion {
    transition: var(--transition);
    transition-property: transform;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid;
    border-left: 1px solid;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

:deep(.sh-select__caret--is-open) {
  transform: scaleY(-1);
}

:deep(.sh-select__dropdown) {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  max-height: var(--sh-select-max-height, none);
  background-color: var(--sh-select-color-dropdown, var(--color-white));
  box-shadow: var(--sh-select-shadow, none);

  @include scrollbar;
}

:deep(.sh-select__dropdown--top) {
  top: auto;
  bottom: 100%;
}

:deep(.sh-select__dropdown--hidden) {
  display: none;
}

:deep(.sh-select__options) {
  margin: 0;
  padding: var(--sh-select-options-spaces, 0);
  list-style: none;
}

:deep(.sh-select__option) {
  position: relative;
  padding: var(--option-vspace) var(--hspace);
  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  @include motion {
    transition: var(--transition);
    transition-property: background-color;
  }
}

:deep(.sh-select__option--pointed),
:deep(.sh-select__option--selected) {
  background-color: var(--sh-color-back-pointed, transparent);
}

.sh-select__error {
  font: var(--sh-checkbox-font-error, inherit);
  color: var(--sh-checkbox-color-alerts, var(--color-alerts));
}
</style>

<template>
  <div class="sh-checkbox">
    <input
      class="sh-checkbox__input"
      :class="{ 'sh-checkbox__input--partial': modelValue === null }"
      :id
      :name
      :type
      :value
      :checked="shouldBeChecked"
      :autocomplete
      :disabled
      :required
      @change="onChange"
    />
    <label v-if="$slots.default" :for="id">
      <slot />
    </label>
    <div class="sh-checkbox__error" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from "nanoid";
import { computed, type InputHTMLAttributes } from "vue";

const props = withDefaults(
  defineProps<{
    autocomplete?: InputHTMLAttributes["autocomplete"];
    disabled?: InputHTMLAttributes["disabled"];
    error?: string;
    id?: InputHTMLAttributes["id"];

    /** null - отображение прочерка вместо галочки */
    modelValue?: (number | string)[] | boolean | null;

    name?: InputHTMLAttributes["name"];
    required?: InputHTMLAttributes["required"];
    type?: "checkbox" | "radio";

    /**
     * Значение, которое подставится в массив modelValue,
     * если чекбокс работает в режиме массива
     */
    value?: number | string;
  }>(),
  {
    autocomplete: undefined,
    disabled: false,
    error: "",
    id: nanoid(),
    modelValue: false,
    name: undefined,
    required: false,
    type: "checkbox",
    value: "",
  },
);
const emit = defineEmits(["update:model-value"]);

const shouldBeChecked = computed(() => {
  if (typeof props.modelValue === "boolean") {
    return props.modelValue;
  }
  if (props.modelValue instanceof Array) {
    return props.modelValue.includes(props.value);
  }
  return false;
});

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (props.modelValue === null) {
    // Для чекбокса выход из состоянии null должен всегда быть в false
    target.checked = false;
  }

  if (props.modelValue instanceof Array) {
    const newValues = [...props.modelValue];
    if (target.checked) {
      newValues.push(props.value);
    } else {
      newValues.splice(newValues.indexOf(props.value), 1);
    }
    emit("update:model-value", newValues);
  } else {
    emit("update:model-value", target.checked);
  }
};
</script>

<style lang="scss" scoped>
.sh-checkbox {
  --size: var(--sh-checkbox-size, 1.5rem);
  --control-back-size: var(--sh-checkbox-control-size, var(var(--size)));
  --checked-size: var(--checked-checked-size, 9px);
  --checked-thickness: var(--sh-checkbox-thickness, 2px);
  --control-color-back: var(--sh-checkbox-control-color-back, transparent);
  --control-color-border: var(--sh-checkbox-control-color-border, transparent);

  display: grid;
  gap: var(--sh-checkbox-gap, 0.5rem);
  grid-template-columns: var(--size) 1fr;
  transition: var(--transition);
  place-items: start start;

  &:has(:disabled) {
    color: var(--sh-checkbox-color-disabled, inherit);
  }
}

.sh-checkbox__input {
  width: var(--size);
  height: var(--size);
  font: var(--sh-checkbox-input-font, inherit);
  cursor: pointer;
  appearance: none;

  &::before,
  &::after {
    content: "";
    grid-area: place;
    margin: auto;
    transition: var(--transition);
  }

  &::before {
    width: var(--control-back-size);
    height: var(--control-back-size);
    background-color: var(--control-color-back);
    border: 1px solid var(--control-color-border);
    border-radius: var(--sh-checkbox-control-radius);
    transition-property: background-color, border-color;
  }

  &::after {
    z-index: 1;
    width: var(--checked-size);
    height: calc(var(--checked-size) * 2 / 3);
    border-bottom: var(--checked-thickness) solid
      var(--sh-checkbox-color-checked);
    border-left: var(--checked-thickness) solid var(--sh-checkbox-color-checked);
    opacity: 0;
    transform: rotate(-45deg) translate(1px, -1px);
    transition-property: opacity;
  }

  &:hover::before {
    border-color: var(--color-links);
  }

  &:checked,
  &--partial {
    &::before {
      background-color: var(--color-main);
      border-color: var(--color-main);
    }

    &::after {
      opacity: 1;
    }
  }

  &--partial::after {
    width: var(--sh-checkbox-partial-width, 0.5rem);
    height: var(--sh-checkbox-partial-height, 0.125rem);
    transform: none;
  }

  &:disabled::before {
    background-color: var(--control-color-back);
    border-color: var(
      --sh-input-color-border-disabled,
      var(--control-color-border)
    );
  }
}

.sh-checkbox__error {
  grid-column: 2 / -1;
  font: var(--sh-checkbox-font-error, inherit);
  color: var(--sh-checkbox-color-alerts, var(--color-alerts));
}
</style>

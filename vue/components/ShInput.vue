<template>
  <div class="sh-input">
    <label class="sh-input__label" v-if="$slots.default" :for="id">
      <slot />
    </label>
    <div class="sh-input__control">
      <input
        :class="[
          'sh-input__input',
          `sh-input__input--${size}`,
          { 'sh-input__input--invalid': error },
          { 'sh-input__input--with-sign': $slots.sign },
        ]"
        :id
        :name
        :type
        v-model="maskedValue"
        :placeholder
        :autocomplete
        :disabled
        :required
        v-maska:unmaskedValue.unmasked="mask"
        @update:model-value="onUpdate"
      />
      <span class="sh-input__sign" v-if="$slots.sign">
        <slot name="sign" />
      </span>
    </div>
    <span class="sh-input__error" v-if="error">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { MaskInputOptions } from "maska";

import { vMaska } from "maska/vue";
import { nanoid } from "nanoid";
import { type InputHTMLAttributes, ref } from "vue";

const props = withDefaults(
  defineProps<{
    autocomplete?: InputHTMLAttributes["autocomplete"];
    disabled?: InputHTMLAttributes["disabled"];
    error?: string;
    id?: InputHTMLAttributes["id"];
    mask?: MaskInputOptions;
    modelValue?: number | string;
    name?: InputHTMLAttributes["name"];
    placeholder?: string;
    required?: InputHTMLAttributes["required"];
    size?: "large" | "medium" | "small";
    type?: InputHTMLAttributes["type"];
    value?: number | string;
  }>(),
  {
    autocomplete: undefined,
    disabled: false,
    error: "",
    id: nanoid(),
    mask: () => ({}),
    modelValue: "",
    name: undefined,
    placeholder: undefined,
    required: false,
    size: "medium",
    type: "text",
    value: "",
  },
);
const emit = defineEmits(["update:model-value"]);
const maskedValue = ref(props.modelValue);
const unmaskedValue = ref(props.modelValue);

const onUpdate = () => {
  if (typeof props.modelValue === "number") {
    emit("update:model-value", parseFloat(`${unmaskedValue.value}`) || 0);
  } else {
    emit("update:model-value", unmaskedValue.value);
  }
};

defineExpose({ unmaskedValue });
</script>

<style lang="scss" scoped>
.sh-input {
  --sign-size: var(--sh-input-sign-size, 1.5rem);

  display: grid;
  justify-items: start;
  gap: var(--sh-input-gap, 0.5rem);
  transition: var(--transition);
  transition-property: opacity;
}

.sh-input__control {
  position: relative;
  width: 100%;
}

.sh-input__input {
  width: 100%;
  padding: var(--sh-input-vspace, 0.5rem) var(--sh-input-hspace, 1.5rem);
  background-color: var(--sh-input-color-back, var(--color-back));
  border: 1px solid transparent;
  border-radius: var(--sh-input-radius, 0);
  outline: none;
  transition: var(--transition);
  transition-property: background-color, border-color;

  &--with-sign {
    padding-right: calc(var(--sh-input-hspace, 1.5rem) * 2 + var(--sign-size));
  }

  @include hover {
    border-bottom-color: var(--color-main);
  }

  &:focus-visible {
    border: var(--sh-input-border-focus, 1px solid transparent);
  }

  &--invalid {
    @include plain-hover-focus {
      border: var(--sh-input-border-invalid, 1px solid transparent);
    }
  }

  &::placeholder {
    color: var(--color-grey-text);
    opacity: 1;
  }
}

.sh-input__sign {
  position: absolute;
  top: 50%;
  right: 8px;
  width: 24px;
  text-align: center;
  transform: translateY(-50%);
}

.sh-input__error {
  font: var(--sh-input-font-error, inherit);
  color: var(--sh-input-color-alerts, var(--color-alerts));
}

.sh-input:has(:disabled) {
  .sh-input__label,
  .sh-input__sign {
    opacity: var(--sh-input-opacity-disabled, 0.5);
  }
}
</style>

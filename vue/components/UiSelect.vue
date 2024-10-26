<script lang="ts" setup>
import { computed } from 'vue';
import MultiSelect from '@vueform/multiselect';

interface SelectProps extends MultiSelect {
	/** Имя определяет наличие скрытого инпута */
	name?: string;

	/** Возможность мультивыбора */
	multi?: boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
	name: undefined,
	mode: ({ multi, mode }) => (multi ? 'tags' : mode || 'single'),
	nativeSupport: ({ name }) => Boolean(name),
	classes: () => ({
		container: 'ui-select',
		wrapper: 'ui-select__wrapper',
		singleLabel: 'ui-select__label',
		singleLabelText: 'ui-select__label-text',
		caret: 'ui-select__caret',
		caretOpen: 'ui-select__caret--is-open',
		dropdown: 'ui-select__dropdown',
		dropdownTop: 'ui-select__dropdown--top',
		dropdownHidden: 'ui-select__dropdown--hidden',
		options: 'ui-select__options',
		option: 'ui-select__option',
		optionSelected: 'ui-select__option--selected',
		optionSelectedPointed: 'ui-select__option--selected',
	}),
});
const emit = defineEmits(['update:model-value']);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(newValue) {
		emit('update:model-value', newValue);
	},
});
</script>

<template>
	<multi-select class="ui-select" v-bind="props" v-model="value" />
</template>

<style lang="scss" scoped>
.ui-select {
	position: relative;
	user-select: none;
}

:deep(.ui-select__wrapper) {
	position: relative;
	min-height: var(--ui-select-height);
	background: var(--ui-select-back, 'none');
	border: var(--ui-select-border, 'none');
	border-radius: var(--ui-select-roundness, 0);
	cursor: pointer;
}

:deep(.ui-select__label) {
	position: absolute;
	top: var(--ui-select-vspace);
	right: calc(var(--ui-select-hspace) * 2 + var(--ui-select-caret-size));
	left: var(--ui-select-hspace);
	overflow: clip;
	white-space: nowrap;
	text-overflow: ellipsis;
	pointer-events: none;
}

:deep(.ui-select__caret) {
	position: absolute;
	top: 50%;
	right: var(--ui-select-hspace);
	width: var(--ui-select-caret-size);
	height: var(--ui-select-caret-size);
	pointer-events: none;

	@include prefers-animate {
		transition: var(--transition);
		transition-property: transform;
	}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		border-bottom: var(--ui-select-caret-stroke, 1px) solid;
		border-left: var(--ui-select-caret-stroke, 1px) solid;
		transform: rotate(-45deg);
	}
}

:deep(.ui-select__caret--is-open) {
	transform: scaleY(-1) translateY(var(--ui-select-caret-size * 0.4));
}

:deep(.ui-select__dropdown) {
	position: absolute;
	top: 100%;
	right: 0;
	left: 0;
	max-height: var(--ui-select-list-height, 'none');
	background: var(--ui-select-list-back, 'none');
	box-shadow: var(--ui-select-list-shadow, 'none');

	@include scrollbar;
}

:deep(.ui-select__dropdown--top) {
	top: auto;
	bottom: 100%;
}

:deep(.ui-select__dropdown--hidden) {
	display: none;
}

:deep(.ui-select__options) {
	margin: 0;
	padding: var(--ui-select-list-vspace, 0) 0;
	list-style: none;
}

:deep(.ui-select__option) {
	position: relative;
	padding: var(--ui-select-list-option-space, 0);
	overflow: clip;
	white-space: nowrap;
	text-overflow: ellipsis;
	background: var(--ui-select-list-option-back, 'none');
	cursor: pointer;

	@include prefers-animate {
		transition: var(--transition);
		transition-property: background-color;
	}

	&:hover {
		background: var(--ui-select-option-back-active, 'none');
	}
}

:deep(.ui-select__option--selected) {
	font-weight: var(--ui-select-option-selected-boldness, inherit);
	background: var(
		--ui-select-option-back-selected,
		var(--ui-select-option-back-active, 'none')
	);
}
</style>

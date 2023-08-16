<template>
  <div class="flex flex-col relative">
    <BaseInput
      v-model="search"
      :label="label"
      @mousedown="onMousedown($event)"
      @focus="onFocus()"
      @blur="onBlur()"
      :error="error"
      :id="id"
      type="text"
      class="pr-6 cursor-pointer"
      blockSuffixAutoFocus
      @keydown.esc="onEsc($event)"
    >
      <template v-slot:suffix>
        <Remixicon class="right-1 absolute transition-transform" name="arrow-down-s-fill" ref="iconRef"></Remixicon>
      </template>
    </BaseInput>

    <div class="absolute h-11 w-full pt-1 flex flex-col justify-center">
      <div v-if="selectedOption && !focused" :class="{ 'px-3': !$slots.option }">
        <slot name="option" v-bind="selectedOption">{{ getOptionLabel(selectedOption) }}</slot>
      </div>
    </div>

    <div
      v-if="focused"
      @click="$event.preventDefault()"
      class="options shadow border border-basic-200 rounded-md py-2 absolute w-full z-50 top-11 pr-[2px] bg-white"
    >
      <ul class="max-h-60 overflow-y-auto scrollbar-thin">
        <template v-for="option in options">
          <li
            v-if="filterOption(option)"
            class="hover:bg-accent-200 hover:text-basic-950 cursor-pointer"
            :class="{ 'px-2 py-1': !$slots.option, 'bg-primary-500 text-white': getOptionValue(option) === modelValue }"
            @mousedown="onSelectOption(option)"
          >
            <slot name="option" v-bind="option">{{ getOptionLabel(option) }}</slot>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO: Implement server-side paginated & filtered options. aka. Async Select
import { useVModel } from '@vueuse/core';
import { Ref, ref } from 'vue';
import { BaseInput } from '#root/components/base';
import Remixicon from '#root/components/shared/Remixicon.vue';
import _ from 'lodash';

interface BaseSelectProps<TOption = any> {
  modelValue: string | number | undefined;
  options?: TOption[];
  /** If TOptions is an object, `valueKey` must be provided. */
  valueKey?: string;
  /** If TOptions is an object, `labelKey` for default display for options. */
  labelKey?: string;
  filterFunction?: (option: TOption) => boolean;
  id?: string;
  label?: string;
  error?: string | Ref<string>;
}
const props = withDefaults(defineProps<BaseSelectProps>(), {
  options: () => [],
});
const emit = defineEmits<BaseSelectEmits>();
interface BaseSelectEmits {
  (e: 'update:modelValue', modelValue: string): void;
}
const modelValue = useVModel(props, 'modelValue', emit);
const selectedOption = ref<any>(null);

const search = ref('');
const focused = ref(false);
const iconRef = ref();

function onFocus() {
  focused.value = true;
  iconRef.value.$el.classList?.add('rotate-180');
  if (search.value === ' ') {
    search.value = '';
  }
}

function onBlur() {
  focused.value = false;
  iconRef.value.$el.classList?.remove('rotate-180');
  if (selectedOption.value) {
    search.value = ' '; // push label up
  }
}

function onMousedown(event: Event) {
  // toggle off dropdown when input is tapped and has no value
  if (focused.value && !search.value) {
    event.preventDefault(); // NOTE: focus will still be trigger on mouse up. we prevent this. (click event , i.e. down and up, triggers focus twice)
    (event.target as HTMLInputElement).blur();
  }
}

function onEsc(event: Event) {
  if (focused) {
    focused.value = false;
    (event.target as HTMLInputElement).blur();
    if (selectedOption) {
      search.value = ' '; // push label up
    }
  }
}

function getOptionLabel<TOption = any>(option: TOption): string {
  if (!_.isObject(option)) {
    return option + '';
  }
  if (props.labelKey) {
    return (option as any)[props.labelKey] + '';
  }
  if (props.valueKey) {
    return (option as any)[props.valueKey] + '';
  }
  return JSON.stringify(option); // whole object will be displayed
}

function onSelectOption<TOption = any>(option: TOption) {
  if (_.isObject(option)) {
    if (!props.valueKey) {
      return;
    }

    modelValue.value = (option as any)[props.valueKey]; // automatically emits 'update:modelValue'.
  } else {
    modelValue.value = option as any;
  }

  selectedOption.value = option;
  search.value = ' '; // push label up
}

function getOptionValue<TOption = any>(option: TOption) {
  if (_.isObject(option)) {
    if (!props.valueKey) {
      return;
    }

    return (option as any)[props.valueKey];
  }
  return option;
}

function filterOption(option: any) {
  if (!props.filterFunction) {
    return getOptionLabel(option)
      .toLowerCase()
      .includes((search.value + '').toLocaleLowerCase());
  }

  return props.filterFunction(option);
}
</script>

<template>
  <div class="flex flex-col">
    <BaseInput
      v-model="search"
      v-bind="$attrs"
      v-element-size="onResize"
      @blur="onBlur()"
      @focus="onFocus()"
      @mousedown="onMousedown($event)"
      @keydown.esc="onEsc($event)"
      @keydown.arrow-down.prevent="onArrowDown"
      @keydown.arrow-up.prevent="onArrowUp"
      @keydown.enter.prevent="onKeyEnter()"
      @keydown="!searchable && $event.preventDefault()"
      ref="inputRef"
      :id="id"
      :label="label"
      :error="error"
      :class="{ 'text-transparent': !searchable }"
      type="text"
      class="pr-6 cursor-pointer"
      blockSuffixAutoFocus
    >
      <template v-slot:suffix>
        <Remixicon class="right-1 absolute transition-transform" name="arrow-down-s-fill" ref="iconRef"></Remixicon>
      </template>
    </BaseInput>

    <div :style="{ width: width }" class="absolute h-11 w-full pt-1 flex flex-col justify-center">
      <div v-if="!searchable || !focused" :class="{ 'px-3': !$slots.option }">
        <slot v-if="selectedOption" name="option" v-bind="selectedOption">{{ getOptionLabel(selectedOption) }}</slot>
        <div v-else class="w-full h-full" @click.stop></div>
      </div>
    </div>
    <div
      v-if="focused"
      @click="$event.preventDefault()"
      :style="{ width: width, marginTop: `calc(.25rem + ${height})` }"
      class="options shadow border border-basic-200 rounded-md py-2 h- absolute z-50 pr-[2px] bg-white"
    >
      <ul ref="ulRef" class="max-h-60 overflow-y-auto scrollbar-thin">
        <template v-for="(option, index) in filteredOptions">
          <li
            @mousedown="onSelectOption(option)"
            @mouseover="hoveredOption = index"
            @mouseleave="if (enableMouseHover) hoveredOption = -1;"
            :class="{
              'px-2 py-1': !$slots.option,
              'bg-accent-200 text-basic-950': hoveredOption === index,
              'bg-primary-500 text-white': getOptionValue(option) === modelValue,
            }"
            class="cursor-pointer"
          >
            <slot name="option" v-bind="option">{{ getOptionLabel(option) }}</slot>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script
export default {
  // We don't want the attrs to bind on the root element (i.e. div)
  // we will bind it manually so the attrs propagate directly to the input element.
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
// TODO: Implement server-side paginated & filtered options. aka. Async Select
import { useVModel, watchDebounced, useMouse } from '@vueuse/core';
import { vElementSize } from '@vueuse/components';
import { ComponentPublicInstance, Ref, ref, toRaw, watch, watchEffect } from 'vue';
import { BaseInput } from '#root/components/base';
import Remixicon from '#root/components/shared/Remixicon.vue';
import getDomElement from '#root/common/utils/get-dom-element';
import _ from 'lodash';

interface BaseSelectProps<TOption = any> {
  modelValue: string | number | boolean | Symbol | undefined | null;
  options?: TOption[];
  /** If TOptions is an object, `valueKey` must be provided. */
  valueKey?: string;
  /** If TOptions is an object, `labelKey` for default display for options. */
  labelKey?: string;
  filterFunction?: (option: TOption) => boolean;
  id?: string;
  label?: string;
  error?: string | Ref<string>;
  searchable?: boolean;
  debounceSearch?: number;
}
const props = withDefaults(defineProps<BaseSelectProps>(), {
  options: () => [],
  searchable: false,
  debounceSearch: 300,
});
const emit = defineEmits<BaseSelectEmits>();
interface BaseSelectEmits {
  (e: 'update:modelValue', modelValue: string): void;
}
const modelValue = useVModel(props, 'modelValue', emit, { deep: true });
const search = ref('');

watch(
  () => props.modelValue,
  value => {
    const option = props.options.find(o => getOptionValue(o) === value);
    if (option) {
      selectedOption.value = option;
      search.value = ' '; // push label up
    }
  },
);

const filteredOptions = ref<BaseSelectProps['options']>([]);

watchEffect(() => {
  filteredOptions.value = props.options.filter(o => filterOption(o));
});

watchDebounced(
  search,
  () => {
    filteredOptions.value = props.options.filter(o => filterOption(o));
  },
  { debounce: props.debounceSearch },
);

const selectedOption = ref<any>(null);
const hoveredOption = ref(-1);
const focused = ref(false);
const iconRef = ref();
const inputRef = ref<ComponentPublicInstance<typeof BaseInput>>();
const ulRef = ref();
const width = ref('auto');
const height = ref('auto');

function onResize({ width: clientWidth, height: clientHeight }: { width: number; height: number }) {
  width.value = clientWidth + 'px';
  height.value = clientHeight + 'px';
}

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
  if (!props.searchable) return true;

  if (!props.filterFunction) {
    return !search.value.trim() || getOptionLabel(option).toLowerCase().includes(search.value.toLocaleLowerCase());
  }

  return props.filterFunction(option);
}

const { x, y } = useMouse({ touch: false });
const enableMouseHover = ref(true);

watch([x, y], () => {
  const ul = getDomElement<HTMLUListElement>(ulRef);
  // return ability to hover li's to choose options.
  if (!ul) return;

  ul.style.pointerEvents = 'auto';
  enableMouseHover.value = true;
});

function scrollToOption() {
  const ul = disableMouseEvents();
  if (!ul) return;

  ul.children[hoveredOption.value]?.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
}

function disableMouseEvents() {
  const ul = getDomElement<HTMLUListElement>(ulRef);
  if (!ul) return;
  // disables mouseover and mouseenter from triggering on another li upon scrolling.
  ul.style.pointerEvents = 'none';
  enableMouseHover.value = false;
  return ul;
}

function onArrowDown() {
  disableMouseEvents();
  if (hoveredOption.value < props.options.length - 1) hoveredOption.value++;
  scrollToOption();
}

function onArrowUp() {
  disableMouseEvents();
  if (hoveredOption.value > 0) hoveredOption.value--;
  scrollToOption();
}

function onKeyEnter() {
  if (hoveredOption.value < 0 || !filteredOptions.value?.length) return;

  onSelectOption(filteredOptions.value[hoveredOption.value]);
  inputRef.value?.getInputElement()?.blur();
}
</script>

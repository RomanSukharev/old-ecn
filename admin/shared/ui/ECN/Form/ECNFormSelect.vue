<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    inline?: boolean;
    required?: boolean;
    error?: string;
    items?: readonly TAny[];
    keyProperty?: string;
    displayProperty?: string;
    newSelect?: boolean;
    disabled?: boolean;
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    inline: true,
    error: undefined,
    items: () => [],
    keyProperty: "id",
    displayProperty: "title",
    newSelect: false,
    disabled: false,
  },
);

const value = defineModel<TAny>();
</script>

<template>
  <div
    :class="{
      'flex items-start space-x-2': inline,
      'w-full flex flex-col space-y-2': !inline,
    }"
  >
    <div
      class="relative text-xs font-medium text-gray-400"
      :class="{
        'w-30 shrink-0 mt-3 leading-snug border border-transparent': inline,
        'before:content-required before:absolute before:text-red-500 before:block before:-left-2 before:top-0.5 before:text-xs':
          required,
      }"
    >
      {{ label }}
    </div>

    <div class="w-full space-y-0.5">
      <PrimeSelect
        v-if="newSelect"
        v-model="value"
        class="w-full"
        :options="items"
        :option-label="displayProperty"
        :option-value="keyProperty"
        :placeholder="placeholder"
        :disabled="disabled"
        :invalid="!!error"
      ></PrimeSelect>

      <HeadlessListbox v-else v-model="value">
        <div class="relative" :class="{ grow: inline }">
          <HeadlessListboxButton
            class="relative w-full rounded-md border px-3 py-2 flex space-x-2 font-medium text-base"
          >
            <span class="block truncate">{{
              value?.[displayProperty] || placeholder
            }}</span>

            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <i-select-chevron-down />
            </span>
          </HeadlessListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <HeadlessListboxOptions
              v-if="!disabled"
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <HeadlessListboxOption
                v-if="!required"
                v-slot="{ active, selected }"
                :key="undefined"
                :value="undefined"
                as="template"
              >
                <li
                  class="relative cursor-default select-none py-2 px-3 font-medium"
                  :class="{
                    'bg-gray-200': selected || active,
                  }"
                >
                  <span class="block truncate">Не выбрано</span>
                </li>
              </HeadlessListboxOption>

              <HeadlessListboxOption
                v-for="item in items"
                v-slot="{ active, selected }"
                :key="item[keyProperty]"
                :value="item"
                as="template"
              >
                <li
                  class="relative cursor-default select-none py-2 px-3 font-medium"
                  :class="{
                    'bg-gray-200': selected || active,
                  }"
                >
                  <span class="block truncate">{{
                    item[displayProperty]
                  }}</span>
                </li>
              </HeadlessListboxOption>
            </HeadlessListboxOptions>
          </transition>
        </div>
      </HeadlessListbox>

      <div v-if="error" class="text-red-500 text-2xs">{{ error }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    inline?: boolean;
    required?: boolean;
  }>(),
  {
    label: undefined,
    type: "text",
    placeholder: undefined,
    error: undefined,
    inline: true,
    required: false,
  },
);

const value = defineModel<string | undefined>();

const formattedValue = computed({
  get: () => {
    if (!value.value) return "";
    return value.value.startsWith("8") ? value.value.slice(1) : value;
  },
  set: (newValue: string | undefined) => {
    if (!newValue) {
      value.value = undefined;
    } else {
      value.value = newValue;
    }
  },
});
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

    <div class="flex flex-col space-y-0.5" :class="{ grow: inline }">
      <div
        :class="{
          grow: inline,
          'border-gray-300': !error,
          'border-red-500': error,
        }"
      >
        <PrimeInputMask
          v-model="formattedValue"
          :placeholder="placeholder || '+7 (___) ___-__-__'"
          mask="+7 (999) 999-99-99"
          fluid
          class="grow outline-none ring-0 placeholder-gray-400"
        />
      </div>

      <div v-if="error" class="text-red-500 text-2xs">{{ error }}</div>
    </div>
  </div>
</template>

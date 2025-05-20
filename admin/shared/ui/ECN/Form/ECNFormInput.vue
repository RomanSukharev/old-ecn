<script lang="ts" setup>
defineEmits<{
  enter: [];
}>();

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

const value = defineModel<string | null>();
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
        class="rounded-md border border-gray-300 px-3 py-2 text-gray-600 flex space-x-2 font-medium text-base"
        :class="{
          grow: inline,
          'border-gray-300': !error,
          'border-red-500': error,
        }"
      >
        <input
          v-model="value"
          :placeholder="placeholder"
          :type="type"
          class="grow outline-none ring-0 placeholder-gray-400"
          @keyup.enter="$emit('enter')"
        />
      </div>

      <div v-if="error" class="text-red-500 text-2xs">{{ error }}</div>
    </div>
  </div>
</template>

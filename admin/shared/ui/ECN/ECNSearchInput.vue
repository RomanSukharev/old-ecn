<script lang="ts" setup>
withDefaults(
  defineProps<{
    placeholder?: string;
    newInput?: boolean;
  }>(),
  {
    placeholder: "Укажите ключевое слово",
    newInput: false,
  },
);

const model = defineModel<string>({
  default: undefined,
  set(v) {
    return v === "" ? undefined : v;
  },
});
</script>

<template>
  <PrimeIconField v-if="newInput">
    <PrimeInputIcon class="pi pi-search" />

    <PrimeInputText
      v-model="model"
      :placeholder="placeholder"
      size="small"
      fluid
    />

    <PrimeInputIcon v-if="model" class="pi pi-times" @click="model = ''" />
  </PrimeIconField>

  <div
    v-else
    class="rounded-md border border-gray-300 px-3 py-1.5 items-center text-gray-600 flex space-x-2 font-medium text-xs relative"
  >
    <i-search />

    <input
      v-model="model"
      class="grow outline-none ring-0 placeholder-gray-400"
      :placeholder="placeholder"
    />

    <div
      v-if="model"
      class="px-2 h-full flex items-center absolute right-0 top-0 cursor-pointer"
      @click="model = ''"
    >
      <i-close />
    </div>
  </div>
</template>

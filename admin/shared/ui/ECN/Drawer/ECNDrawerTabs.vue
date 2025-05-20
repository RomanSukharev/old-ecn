<script lang="ts" setup>
const modelValueRef = defineModel<string>();

const slots = useSlots();
const defaultSlot = slots.default;

const tabsChildren = computed(() => {
  return defaultSlot
    ? flatten(defaultSlot()).filter((v) => {
        return (v.type as { __TAB__?: true }).__TAB__;
      })
    : [];
});

provide("tabs_active_name", modelValueRef);

const onActivate = (value: string): void => {
  modelValueRef.value = value;
};
</script>

<template>
  <div class="overflow-hidden h-full flex flex-col">
    <ul class="m-10 flex space-x-0.5 rounded-md bg-gray-200 p-0.5 shrink-0">
      <li
        v-for="(item, id) in tabsChildren"
        :key="id"
        class="cursor-pointer p-2 rounded whitespace-nowrap text-xs leading-snug font-medium flex items-center justify-center grow shrink-0 basis-0"
        :class="{
          'bg-transparent hover:bg-gray-100 text-gray-400':
            modelValueRef !== item.props?.name,
          'bg-white text-gray-900': modelValueRef === item.props?.name,
        }"
        :active="modelValueRef === item.props?.name"
        @click="onActivate(item.props?.name)"
      >
        {{ item.props?.title }}
      </li>
    </ul>

    <div class="overflow-auto grow px-10">
      <slot />
    </div>
  </div>
</template>

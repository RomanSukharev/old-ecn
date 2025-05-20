<script lang="ts" setup>
defineOptions({
  __TAB__: true,
});

withDefaults(
  defineProps<{
    name: TAny;
    title?: string;
  }>(),
  {
    title: "",
  },
);

const activeTab = inject("tabs_active_name", "");
</script>

<template>
  <div
    v-if="activeTab === name"
    class="overflow-hidden max-h-full h-full flex flex-col"
  >
    <slot />
  </div>
</template>

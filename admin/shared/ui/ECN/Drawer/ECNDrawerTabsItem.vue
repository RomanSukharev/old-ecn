<script lang="ts" setup>
defineOptions({
  __TAB__: true,
});

defineProps<{
  name: string;
  title: string;
}>();

const activeTab = inject("tabs_active_name", "");
</script>

<template>
  <div v-if="activeTab === name">
    <slot />
  </div>
</template>

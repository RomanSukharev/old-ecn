<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <img
    v-if="data?.cover"
    :src="data?.cover.url"
    class="rounded-md bg-gray-400 h-16 aspect-video object-cover"
  />

  <div v-else class="rounded-md bg-gray-400 h-16 aspect-video"></div>
</template>

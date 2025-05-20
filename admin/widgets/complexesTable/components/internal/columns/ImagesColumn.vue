<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <img
    v-if="data?.images?.length"
    :src="data?.images[0].url"
    class="rounded-md bg-gray-400 w-24 aspect-video object-cover"
  />

  <div v-else class="rounded-md bg-gray-400 w-24 aspect-video"></div>
</template>

<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.inCity">В черте города</div>

  <div v-else>{{ data?.cityDistance ?? "-" }}</div>
</template>

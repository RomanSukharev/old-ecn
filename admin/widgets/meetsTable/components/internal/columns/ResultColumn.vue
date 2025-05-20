<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.comment">
    {{ data?.comment }}
  </div>

  <div v-else>-</div>
</template>

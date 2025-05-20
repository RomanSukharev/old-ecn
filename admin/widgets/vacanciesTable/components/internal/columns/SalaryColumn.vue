<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div>{{ data?.salary || "не указана" }}</div>
</template>

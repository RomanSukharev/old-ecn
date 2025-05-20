<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data.dealDate" class="space-y-1">
    {{ $dayjs(data.dealDate).format("DD.MM.YYYY") }}
  </div>

  <div v-else>-</div>
</template>

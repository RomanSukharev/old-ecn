<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data.depositDate" class="space-y-1">
    {{ $dayjs(data.depositDate).format("DD.MM.YYYY") }}
  </div>

  <div v-else>-</div>
</template>

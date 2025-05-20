<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data.validTillDate" class="space-y-1">
    До {{ $dayjs(data.validTillDate).format("DD.MM.YYYY") }}
  </div>

  <div v-else>-</div>
</template>

<script setup lang="ts">
defineProps<{
  data: TAny;
}>();

const formatCommission = (num: number) => {
  return new Intl.NumberFormat("ru-RU").format(num);
};
</script>

<template>
  <div v-if="data?.amount" class="space-y-1 whitespace-nowrap">
    {{ formatCommission(data?.amount) + " ₽" }}
  </div>

  <div v-else>-</div>
</template>

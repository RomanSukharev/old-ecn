<script setup lang="ts">
defineProps<{
  data: TAny;
}>();

const formatCommission = (num: number) => {
  return new Intl.NumberFormat("ru-RU").format(num);
};
</script>

<template>
  <div v-if="data?.firstDeposit" class="space-y-1">
    {{ formatCommission(data?.firstDeposit) + " ₽" }}
  </div>

  <div v-else>-</div>
</template>

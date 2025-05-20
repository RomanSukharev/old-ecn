<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.price" class="text-base whitespace-nowrap">
    {{
      data?.price
        ? `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(data?.price)} ₽`
        : "-"
    }}
  </div>

  <div v-if="data?.pricePerMeter" class="text-gray-500 whitespace-nowrap">
    {{
      data?.pricePerMeter
        ? `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(data?.pricePerMeter)} ₽/м²`
        : "-"
    }}
  </div>
</template>

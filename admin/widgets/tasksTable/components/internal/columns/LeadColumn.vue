<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/sales/leads/${data?.lead?.id}`" target="_blank">
    <div class="space-y-1">
      <div v-if="data?.lead" class="text-blue-600 hover:text-blue-800">
        {{ data?.lead?.patronymic }}
        {{ data?.lead?.name }}
      </div>

      <div v-else>-</div>
    </div>
  </NuxtLink>
</template>

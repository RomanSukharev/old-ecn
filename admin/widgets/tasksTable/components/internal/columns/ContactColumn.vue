<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/sales/contacts/${data?.contact?.id}`" target="_blank">
    <div class="space-y-1">
      <div v-if="data?.contact" class="text-blue-600 hover:text-blue-800">
        {{ data?.contact?.patronymic }}
        {{ data?.contact?.name }}
      </div>

      <div v-else>-</div>
    </div>
  </NuxtLink>
</template>

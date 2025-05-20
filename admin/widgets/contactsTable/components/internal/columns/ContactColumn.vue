<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/sales/contacts/${data?.id}`" target="_blank">
    <div class="space-y-1">
      <div class="text-blue-600 hover:text-blue-800">
        {{ data?.surname }}
        {{ data?.name }}
        <p>{{ data?.patronymic }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/staff/employees/${data?.reporter?.id}`" target="_blank">
    <div class="space-y-1">
      <div v-if="data?.reporter" class="text-blue-600 hover:text-blue-800">
        {{ data?.reporter?.patronymic }}
        {{ data?.reporter?.name }}
      </div>

      <div v-else>-</div>
    </div>
  </NuxtLink>
</template>

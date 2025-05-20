<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/staff/employees/${data?.assignee?.id}`" target="_blank">
    <div class="space-y-1">
      <div v-if="data?.assignee" class="text-blue-600 hover:text-blue-800">
        {{ data?.assignee?.patronymic }}
        {{ data?.assignee?.name }}
      </div>

      <div v-else>-</div>
    </div>
  </NuxtLink>
</template>

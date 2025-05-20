<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    v-if="data?.employee"
    :to="`/staff/employees/${data?.employee.id}`"
    class="text-xs font-medium text-blue-600 mb-1.5"
  >
    {{ data?.employee.name }} {{ data?.employee.surname }}
  </NuxtLink>
</template>

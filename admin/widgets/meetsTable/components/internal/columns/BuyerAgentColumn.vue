<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    :to="`/staff/employees/${data?.buyerAgent?.id}`"
    class="text-blue-600 hover:text-blue-800"
    target="_blank"
  >
    {{
      data?.buyerAgent?.name && data?.buyerAgent?.surname
        ? `${data.buyerAgent.name} ${data.buyerAgent.surname}`
        : "-"
    }}
  </NuxtLink>
</template>

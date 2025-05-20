<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    :to="`/staff/employees/${data?.sellerAgent?.id}`"
    class="text-blue-600 hover:text-blue-800"
    target="_blank"
  >
    {{
      data?.sellerAgent?.name && data?.sellerAgent?.surname
        ? `${data.sellerAgent.name} ${data.sellerAgent.surname}`
        : "-"
    }}
  </NuxtLink>
</template>

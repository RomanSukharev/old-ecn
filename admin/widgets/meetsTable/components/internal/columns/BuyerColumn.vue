<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    :to="`/sales/contacts/${data?.buyerContact?.id}`"
    class="text-blue-600 hover:text-blue-800"
    target="_blank"
  >
    {{
      data?.buyerContact?.name && data?.buyerContact?.surname
        ? `${data.buyerContact.name} ${data.buyerContact.surname}`
        : "-"
    }}
  </NuxtLink>
</template>

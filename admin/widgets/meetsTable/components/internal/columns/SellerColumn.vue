<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    :to="`/sales/contacts/${data?.sellerContact?.id}`"
    class="text-blue-600 hover:text-blue-800"
    target="_blank"
  >
    {{
      data?.sellerContact?.name && data?.sellerContact?.surname
        ? `${data.sellerContact.name} ${data.sellerContact.surname}`
        : "-"
    }}
  </NuxtLink>
</template>

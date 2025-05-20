<script setup lang="ts">
import { formatPhoneNumber } from "~/shared/helpers/formatPhoneNumber";

defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div class="space-y-1">
    <NuxtLink
      :to="`/sales/contacts/${data?.id}`"
      target="_blank"
      class="text-blue-600 hover:text-blue-800"
    >
      {{ data?.sellerContact?.patronymic }}
      {{ data?.sellerContact?.name }}
    </NuxtLink>

    <div class="">
      {{ formatPhoneNumber(data?.sellerPhone) }}
    </div>
  </div>
</template>

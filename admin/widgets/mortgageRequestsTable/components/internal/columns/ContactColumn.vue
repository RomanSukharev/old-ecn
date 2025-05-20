<script setup lang="ts">
import { formatPhoneNumber } from "~/shared/helpers/formatPhoneNumber";
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    :to="`/sales/contacts/${data?.contact?.id}`"
    class="text-blue-600 hover:text-blue-800 whitespace-nowrap"
    target="_blank"
  >
    <div>
      {{ data?.contact?.name }}
      {{ data?.contact?.patronymic }}
    </div>
  </NuxtLink>

  <div class="space-y-1">
    <div class="">
      {{ formatPhoneNumber(data?.contact?.phone) }}
    </div>
  </div>
</template>

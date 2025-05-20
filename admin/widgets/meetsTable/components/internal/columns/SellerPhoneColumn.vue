<script setup lang="ts">
import { formatPhoneNumber } from "~/shared/helpers/formatPhoneNumber";
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.sellerPhone" class="flex-1 whitespace-nowrap">
    {{ formatPhoneNumber(data?.sellerPhone) }}
  </div>

  <div v-else>-</div>
</template>

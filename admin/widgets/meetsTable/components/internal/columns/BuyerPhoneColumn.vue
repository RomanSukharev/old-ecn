<script setup lang="ts">
import { formatPhoneNumber } from "~/shared/helpers/formatPhoneNumber";
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.buyerPhone" class="flex-1 whitespace-nowrap">
    {{ formatPhoneNumber(data?.buyerPhone) }}
  </div>

  <div v-else>-</div>
</template>

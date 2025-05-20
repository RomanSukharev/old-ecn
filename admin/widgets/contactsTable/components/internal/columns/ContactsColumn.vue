<script setup lang="ts">
import { formatPhoneNumber } from "~/shared/helpers/formatPhoneNumber";

defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div class="space-y-1">
    <div class="">
      {{ formatPhoneNumber(data?.phone) }}
    </div>

    <div class="">{{ data?.email }}</div>
  </div>
</template>

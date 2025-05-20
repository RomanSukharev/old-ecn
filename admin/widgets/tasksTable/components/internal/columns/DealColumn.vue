<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink :to="`/sales/deals/${data?.deal?.id}`" target="_blank">
    <div class="space-y-1">
      <div class="text-blue-600 hover:text-blue-800">
        <span>{{
          data?.internalNumber ? `${data.internalNumber}`.padStart(5, "0") : "-"
        }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

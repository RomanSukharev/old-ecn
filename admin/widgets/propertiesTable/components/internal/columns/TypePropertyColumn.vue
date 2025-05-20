<script setup lang="ts">
import { propertySubTypes } from "~/shared/constants";

defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div v-if="data?.subType">
    {{ propertySubTypes.find((i) => i.id === data?.subType)?.title || "-" }}
  </div>

  <div v-else>-</div>
</template>

<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  {{
    data?.createdAt
      ? $dayjs(data?.createdAt).format("DD.MM.YYYY HH:mm:ss")
      : "-"
  }}
</template>

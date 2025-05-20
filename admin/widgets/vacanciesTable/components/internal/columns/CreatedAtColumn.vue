<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div>
    {{
      data?.createdAt
        ? $dayjs(data?.createdAt).format("DD.MM.YYYY HH:mm:ss")
        : "-"
    }}
  </div>
</template>

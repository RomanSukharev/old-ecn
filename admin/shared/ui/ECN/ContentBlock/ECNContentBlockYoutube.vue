<script lang="ts" setup>
const data = defineModel<TAny>({ required: true });
</script>

<template>
  <div class="flex flex-col p-2 space-y-2">
    <div class="shrink-0">
      <ECNFormInput
        v-model="data.link"
        :inline="false"
        label="Ссылка"
        placeholder="Укажите ссылку на видео"
      />
    </div>
  </div>
</template>

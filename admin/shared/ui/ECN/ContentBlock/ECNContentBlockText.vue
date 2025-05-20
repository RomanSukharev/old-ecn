<script lang="ts" setup>
const data = defineModel<TAny>({ required: true });
</script>

<template>
  <div class="flex flex-col p-2 space-y-2">
    <div class="shrink-0">
      <ECNFormInput
        v-model="data.title"
        :inline="false"
        label="Заголовок"
        placeholder="Укажите заголовок"
      />
    </div>

    <div class="shrink-0">
      <ECNFormTextarea
        v-model="data.content"
        :inline="false"
        label="Текст"
        placeholder="Укажите текст"
      />
    </div>
  </div>
</template>

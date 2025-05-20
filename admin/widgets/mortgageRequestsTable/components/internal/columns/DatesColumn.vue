<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <div class="">
    <div class="text-2xs text-gray-400">Отправили</div>

    <div class="">
      {{ data?.sendDate ? $dayjs(data.sendDate).format("DD.MM.YYYY") : "-" }}
    </div>

    <div class="text-2xs text-gray-400">Ответ</div>

    <div class="">
      {{
        data?.responseDate
          ? $dayjs(data.responseDate).format("DD.MM.YYYY")
          : "-"
      }}
    </div>
  </div>
</template>

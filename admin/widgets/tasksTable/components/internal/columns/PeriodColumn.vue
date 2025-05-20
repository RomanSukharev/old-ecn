<script setup lang="ts">
defineProps<{
  data: TAny;
}>();

// Функция для склонения
function plural(n: number, titles: [string, string, string]): string {
  return (
    `${n} ` +
    titles[
      n % 10 === 1 && n % 100 !== 11
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? 1
          : 2
    ]
  );
}
</script>

<template>
  <div class="grow w-32">
    <div v-if="data?.durationDays || data?.durationHours" class="flex gap-1">
      <span v-if="data?.durationDays">
        {{ plural(data.durationDays, ["день", "дня", "дней"]) }}
      </span>

      <span v-if="data?.durationHours">
        {{ plural(data.durationHours, ["час", "часа", "часов"]) }}
      </span>
    </div>

    <div v-else>-</div>
  </div>
</template>

<script lang="ts" setup>
import type { Header } from "vue3-easy-data-table";
import { useElementSize } from "@vueuse/core";
import { useLogsQuery } from "@/shared/api/generated";

const props = defineProps<{
  authorId: string;
}>();

const headers: Header[] = [
  {
    text: "Дата и время события",
    value: "createdAt",
    sortable: true,
    width: 200,
  },
  { text: "Событие", value: "title" },
  { text: "Детали события", value: "details" },
];

const {
  result: data,
  loading: pending,
  error,
} = useLogsQuery({
  filter: {
    author: props.authorId,
  },
});

const logs = computed(() => data.value?.logs.nodes || []);

const tableWrapper = ref<TAny>();

const { height } = useElementSize(tableWrapper);

const computedHeight = computed(() => height.value - 2);
</script>

<template>
  <div ref="tableWrapper" class="grow overflow-hidden flex flex-col">
    <div v-if="error" class="text-center text-gray-400 text-sm">
      Ошибка загрузки, повторите попытку позднее.
    </div>

    <div v-else-if="pending" class="text-center text-gray-400 text-sm">
      Загрузка данных...
    </div>

    <EasyDataTable
      v-else
      :headers="headers"
      :items="logs"
      border-cell
      hide-footer
      table-class-name="ECN--Table"
      header-class-name="font-medium"
      header-item-class-name="select-none"
      theme-color="#0F62FE"
      :table-min-height="256"
      :table-height="computedHeight"
    >
      <template #empty-message>
        <div class="text-gray-400">Ничего не найдено.</div>
      </template>

      <template #item-createdAt="{ createdAt }">
        {{ createdAt ? $dayjs(createdAt).format("DD.MM.YYYY HH:mm:ss") : "-" }}
      </template>
    </EasyDataTable>
  </div>
</template>

<script lang="ts" setup>
import type { Header } from "vue3-easy-data-table";
import { useElementSize } from "@vueuse/core";
import { useLogsQuery } from "@/shared/api/generated";

const searchString = ref("");

const { result: data } = useLogsQuery({
  search: searchString.value || undefined,
});

const headers: Header[] = [
  {
    text: "Дата и время события",
    value: "createdAt",
    sortable: true,
    width: 200,
  },
  { text: "Автор", value: "author" },
  { text: "Событие", value: "title" },
  { text: "Детали события", value: "details" },
];

const items = computed(() => data.value?.logs.nodes || []);

const tableWrapper = ref<TAny>();

const { height } = useElementSize(tableWrapper);

const computedHeight = computed(() => height.value - 2);
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <ECNPageTitle class="mb-4" title="Журнал действий" />

    <ECNSearchInput
      v-model="searchString"
      class="mb-5"
      placeholder="Укажите ключевое слово"
    />

    <div ref="tableWrapper" class="grow relative overflow-hidden">
      <EasyDataTable
        class="max-h-full"
        :headers="headers"
        :items="items"
        border-cell
        hide-footer
        table-class-name="ECN--Table"
        header-class-name="font-medium"
        header-item-class-name="select-none"
        theme-color="#0F62FE"
        :table-min-height="64"
        :table-height="computedHeight"
      >
        <template #empty-message>
          <div class="text-gray-400">Ничего не найдено.</div>
        </template>

        <template #item-author="{ author }">
          <NuxtLink
            v-if="author"
            :to="`/staff/employees/${author.id}`"
            class="text-xs font-medium text-blue-600 mb-1.5"
          >
            {{ author.name }} {{ author.surname }}
          </NuxtLink>

          <div v-else>-</div>
        </template>

        <template #item-createdAt="{ createdAt }">
          {{
            createdAt ? $dayjs(createdAt).format("DD.MM.YYYY HH:mm:ss") : "-"
          }}
        </template>
      </EasyDataTable>
    </div>
  </div>
</template>

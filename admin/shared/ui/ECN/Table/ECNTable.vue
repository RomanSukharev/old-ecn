<script lang="ts" setup>
interface IProps {
  items: readonly TAny[];
  columns: readonly TAny[];
  loading?: boolean;
  // hideSelection?: boolean;
}

defineEmits<{
  itemEdit: [id: string];
  itemDelete: [id: string];
}>();

defineProps<IProps>();

const selectedItems = defineModel<TAny[]>("selection");
</script>

<template>
  <div
    class="grow font-medium rounded-md text-xs border border-gray-200 overflow-hidden"
  >
    <PrimeDataTable
      v-model:selection="selectedItems"
      :value="items"
      :loading="loading"
      class="-m-px"
      show-gridlines
      scrollable
      scroll-height="flex"
      data-key="id"
      table-class="rounded-md"
    >
      <PrimeColumn
        selection-mode="multiple"
        header-class="w-8 p-2"
        body-class="p-2"
      ></PrimeColumn>

      <PrimeColumn
        v-for="column in columns"
        :key="column.key"
        :header="column.header"
        :header-class="`font-bold p-2 ${column.headerClass}`"
        body-class="p-2"
      >
        <template #body="{ data }"
          ><component :is="column.renderer" :data="data"
        /></template>
      </PrimeColumn>

      <PrimeColumn header-class="p-3 w-8" body-class="p-2">
        <template #body="{ data }">
          <div class="space-y-1">
            <div
              class="p-1 cursor-pointer"
              @click="$emit('itemEdit', data?.id)"
            >
              <i-table-edit />
            </div>

            <div
              class="p-1 cursor-pointer"
              @click="$emit('itemDelete', data?.id)"
            >
              <i-table-delete />
            </div>
          </div>
        </template>
      </PrimeColumn>
    </PrimeDataTable>
  </div>
</template>

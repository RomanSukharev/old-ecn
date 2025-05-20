<script setup lang="ts">
import { type DealFilter } from "~/shared/api/generated";
import { useTable } from "../composables/useTable";
import BulkActionsPanel from "./internal/BulkActionsPanel.vue";
import { DealDrawer } from "~/widgets/dealDrawer";

interface IProps {
  filter?: DealFilter;
  keyword?: string;
}

const props = defineProps<IProps>();

const search = computed(() => props.keyword);

const {
  items,
  selectedItems,
  loading,
  refetch,
  isDealDrawerVisible,
  onEditItem,
  onDeleteItem,
  onBulkDeleteItems,
  editDealId,
  columns,
} = useTable(props.filter, search);

const handleBulkDelete = () => {
  const ids = selectedItems.value.map((item) => item.id);
  onBulkDeleteItems(ids);
};

defineExpose({
  refetch,
  selectedItems,
});
</script>

<template>
  <div class="grow flex flex-col overflow-hidden space-y-2">
    <ECNTable
      v-model:selection="selectedItems"
      class="grow"
      :items="items"
      :columns="columns"
      :loading="loading"
      @item-edit="onEditItem"
      @item-delete="onDeleteItem"
    />

    <BulkActionsPanel
      :selected-items="selectedItems"
      @close="selectedItems = []"
      @delete="handleBulkDelete"
    />
  </div>

  <DealDrawer
    v-if="isDealDrawerVisible"
    :id="editDealId"
    @close="
      isDealDrawerVisible = false;
      editDealId = undefined;
    "
    @save="refetch"
  />
</template>

<script setup lang="ts">
import { type MortgageRequestFilter } from "~/shared/api/generated";
import { useTable } from "../composables/useTable";
import BulkActionsPanel from "./internal/BulkActionsPanel.vue";
import TaskDrawer from "~/widgets/taskDrawer";

interface IProps {
  filter?: MortgageRequestFilter;
  keyword?: string;
}

const props = defineProps<IProps>();

const search = computed(() => props.keyword);

const {
  items,
  selectedItems,
  loading,
  refetch,
  isTaskDrawerVisible,
  onEditItem,
  onDeleteItem,
  onBulkDeleteItems,
  editLeadId,
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
      @edit="onEditItem"
    />

    <BulkActionsPanel
      :selected-items="selectedItems"
      @close="selectedItems = []"
      @delete="handleBulkDelete"
    />
  </div>

  <TaskDrawer
    v-if="isTaskDrawerVisible"
    :id="editLeadId"
    @close="
      isTaskDrawerVisible = false;
      editLeadId = undefined;
    "
    @save="refetch"
  />
</template>

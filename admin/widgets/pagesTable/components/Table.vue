<script setup lang="ts">
import { useTable } from "../composables/useTable";
// import BulkActionsPanel from "./internal/BulkActionsPanel.vue";
import PageDrawer from "~/widgets/pageDrawer/components/PageDrawer.vue";

interface IProps {
  keyword?: string;
}

const props = defineProps<IProps>();

const search = computed(() => props.keyword);

const {
  items,
  selectedItems,
  loading,
  refetch,
  isPageDrawerVisible,
  onEditItem,
  onDeleteItem,
  // onBulkDeleteItems,
  editPageId,
  columns,
} = useTable(search);

// const handleBulkDelete = () => {
//   const ids = selectedItems.value.map((item) => item.id);
//   onBulkDeleteItems(ids);
// };

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

    <!-- <BulkActionsPanel
      :selected-items="selectedItems"
      @close="selectedItems = []"
      @delete="handleBulkDelete"
    /> -->
  </div>

  <PageDrawer
    v-if="isPageDrawerVisible"
    :id="editPageId"
    @close="
      isPageDrawerVisible = false;
      editPageId = undefined;
    "
    @save="refetch"
  />
</template>

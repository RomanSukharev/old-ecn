<script setup lang="ts">
import { useTable } from "../composables/useTable";
import BulkActionsPanel from "./internal/BulkActionsPanel.vue";
import ReviewDrawer from "~/widgets/reviewDrawer/components/ReviewDrawer.vue";

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
  isReviewDrawerVisible,
  onEditItem,
  onDeleteItem,
  onBulkDeleteItems,
  editReviewId,
  columns,
} = useTable(search);

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

  <ReviewDrawer
    v-if="isReviewDrawerVisible"
    :id="editReviewId"
    @close="
      isReviewDrawerVisible = false;
      editReviewId = undefined;
    "
    @save="refetch"
  />
</template>

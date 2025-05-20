<script setup lang="ts">
import { type VillageFilter } from "~/shared/api/generated";
import { useTable } from "../composables/useTable";
import BulkActionsPanel from "./internal/BulkActionsPanel.vue";
import VillageDrawer from "~/widgets/villageDrawer/components/VillageDrawer.vue";

interface IProps {
  filter?: VillageFilter;
  keyword?: string;
}

const props = defineProps<IProps>();

const search = computed(() => props.keyword);

const {
  items,
  selectedItems,
  loading,
  refetch,
  isVillageDrawerVisible,
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
    />

    <BulkActionsPanel
      :selected-items="selectedItems"
      @close="selectedItems = []"
      @delete="handleBulkDelete"
    />
  </div>

  <VillageDrawer
    v-if="isVillageDrawerVisible"
    :id="editLeadId"
    @close="
      isVillageDrawerVisible = false;
      editLeadId = undefined;
    "
    @save="refetch"
  />
</template>

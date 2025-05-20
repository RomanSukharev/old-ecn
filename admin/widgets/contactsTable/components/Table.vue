<script setup lang="ts">
import { type ContactFilter } from "~/shared/api/generated";
import { useTable } from "../composables/useTable";
import BulkActionsPanel from "./internal/BulkActionsPanel.vue";
import { ContactDrawer } from "~/widgets/contactDrawer";

interface IProps {
  filter?: ContactFilter;
  keyword?: string;
}

const props = defineProps<IProps>();

const search = computed(() => props.keyword);

const {
  items,
  selectedItems,
  loading,
  refetch,
  isContactDrawerVisible,
  onEditItem,
  onDeleteItem,
  onBulkDeleteItems,
  editContactId,
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

  <ContactDrawer
    v-if="isContactDrawerVisible"
    :id="editContactId"
    @close="
      isContactDrawerVisible = false;
      editContactId = undefined;
    "
    @save="refetch"
  />
</template>

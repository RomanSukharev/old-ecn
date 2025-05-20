<script setup lang="ts">
import KanbanColumns from "./KanbanColumns.vue";
import { useKanban } from "../composables/useKanban";
import { DealDrawer } from "~/widgets/dealDrawer";
import type { IProps } from "../types";

const props = defineProps<IProps>();
const search = computed(() => props.keyword);

const {
  stages,
  items,
  selectedItems,
  loading,
  refetch,
  onDeleteItem,
  onEditItem,
  updateDealStage,
  isDealDrawerVisible,
  editDealId,
} = useKanban(props.filter, search);

defineExpose({
  refetch,
  selectedItems,
});
</script>

<template>
  <div class="flex w-full gap-2 h-full">
    <div
      v-for="stage in stages"
      :key="stage.id"
      class="h-full flex-grow rounded-lg"
      :class="{ hidden: filter?.stage && filter?.stage !== stage.id }"
    >
      <KanbanColumns
        :column-header="stage"
        :items="items"
        :loading="loading"
        :stages="stages ?? null"
        @edit-item="onEditItem"
        @item-delete="onDeleteItem"
        @update-item-stage="updateDealStage"
      />
    </div>
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

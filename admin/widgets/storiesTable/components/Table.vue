<script setup lang="ts">
import { useTable } from "../composables/useTable";
import StoryDrawer from "~/widgets/storyDrawer";

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
  isStoryDrawerVisible,
  onEditItem,
  onDeleteItem,
  editStoryId,
  columns,
} = useTable(search);

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
      :hide-selection="true"
      :items="items"
      :columns="columns"
      :loading="loading"
      @item-edit="onEditItem"
      @item-delete="onDeleteItem"
    />
  </div>

  <StoryDrawer
    v-if="isStoryDrawerVisible"
    :id="editStoryId"
    @close="
      isStoryDrawerVisible = false;
      editStoryId = undefined;
    "
    @save="refetch"
  />
</template>

<script setup lang="ts">
import { useTable } from "../composables/useTable";
import VacancyDrawer from "~/widgets/vacancyDrawer/components/VacancyDrawer.vue";

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
  isVacancyDrawerVisible,
  onEditItem,
  onDeleteItem,
  editVacancyId,
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
      :items="items"
      :columns="columns"
      :loading="loading"
      @item-edit="onEditItem"
      @item-delete="onDeleteItem"
    />
  </div>

  <VacancyDrawer
    v-if="isVacancyDrawerVisible"
    :id="editVacancyId"
    @close="
      isVacancyDrawerVisible = false;
      editVacancyId = undefined;
    "
    @save="refetch"
  />
</template>

<script setup lang="ts">
import type { DealsQuery_deals_DealConnection_nodes_Deal } from "~/shared/api/generated";
import KanbanItem from "./KanbanItem.vue";

// eslint-disable-next-line vue/define-emits-declaration
const emit = defineEmits(["editItem", "updateItemStage"]);

const props = defineProps<{
  columnHeader: {
    id: string;
    title: string;
  };
  items: readonly DealsQuery_deals_DealConnection_nodes_Deal[];
  stages: { id: string; title: string }[] | null | undefined;
}>();

const isFirstStage = computed(() => {
  return props.stages?.[0]?.id === props.columnHeader.id;
});

const hasTargetStage = props.items.find(
  (deal) => deal.stage === props.columnHeader.id,
);

const filteredItemsCount = computed(() => {
  return props.items.filter((deal) => deal.stage === props.columnHeader.id)
    .length;
});

const handleChange = (e: any) => {
  console.log("Dragged event:", e);

  // Получаем идентификатор сделки из элемента, который был удален
  const dealId = e.removed?.element?.id || e.added?.element?.id;
  const newStageId = props.columnHeader.id;

  console.log("Deal ID:", dealId);
  console.log("New Stage ID:", newStageId);

  if (dealId && newStageId) {
    emit("updateItemStage", { dealId, newStageId });
  } else {
    console.error("Ошибка: id сделки или новая стадия неопределены", e);
  }
};
</script>

<template>
  <div class="kanban-column">
    <h2 class="pb-3 flex justify-between items-center relative">
      <div>
        {{ columnHeader.title }}
        <span class="text-gray-400 ml-1">{{ filteredItemsCount }}</span>
      </div>

      <ECNButton
        v-if="isFirstStage"
        small
        rounded
        left-icon="i-plus"
        class="px-1 py-0 absolute right-0"
        @click="$emit('editItem')"
      />
    </h2>

    <div :class="[hasTargetStage ? 'row-layout' : 'kanban-column__content']">
      <draggable
        :list="
          items.filter((deal) => {
            if (!stages || stages.length === 0) {
              return deal.stage === columnHeader.id; // Если stages пуст, используем только текущую стадию
            }
            return (
              stages.some((stage) => stage.id === 'all') ||
              deal.stage === columnHeader.id
            );
          })
        "
        :animation="250"
        ghost-class="ghost-card"
        group="kanban"
        @change="handleChange"
      >
        <div
          v-for="deal in items.filter((deal) => {
            if (!stages || stages.length === 0) {
              return deal.stage === columnHeader.id; // Если stages пуст, используем только текущую стадию
            }
            return (
              stages.some((stage) => stage.id === 'all') ||
              deal.stage === columnHeader.id
            );
          })"
          :key="deal.id"
        >
          <div :data-id="deal.id">
            <KanbanItem :data="deal" @click="emit('editItem', deal.id)" />
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.kanban-column {
  width: 100%;
  font-size: 12px;
  margin-bottom: 1rem;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 225px);
}

.kanban-column__content {
  flex-direction: row;
  overflow-y: auto;
  scrollbar-width: none;
}

.row-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.row-layout > div {
  flex: 1 1 calc(25% - 1rem);
  box-sizing: border-box;
}

.kanban-column__content > div {
  display: grid;
}

.ghost-card {
  /* display: flex; */
  opacity: 0.5;
  /* background: #f7fafc; */
  border: 1px solid #4299e1;
  border-radius: 12px;
}
</style>

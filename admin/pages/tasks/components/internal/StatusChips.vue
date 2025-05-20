<script setup lang="ts">
import { TaskStatusEnum } from "~/shared/api/generated";

const activeTab = defineModel<TaskStatusEnum | "all" | null>({
  default: "all",
  set(v) {
    if (v === "all") {
      return undefined;
    } else {
      return v;
    }
  },
});
</script>

<template>
  <div>
    <ECNTabs v-if="activeTab" v-model="activeTab" variant="chips">
      <ECNTabsItem name="all" title="Все" />

      <ECNTabsItem :name="TaskStatusEnum.NEW" title="Новая" />

      <ECNTabsItem :name="TaskStatusEnum.IN_PROGRESS" title="В работе" />

      <ECNTabsItem :name="TaskStatusEnum.CLOSED" title="Закрыта" />

      <ECNTabsItem :name="TaskStatusEnum.OVERDUE" title="Просрочена" />

      <ECNTabsItem :name="TaskStatusEnum.COMPLETED" title="Завершена" />
    </ECNTabs>
  </div>
</template>

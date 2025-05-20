<script setup lang="ts">
import { MeetStatusEnum } from "~/shared/api/generated";

const activeTab = defineModel<MeetStatusEnum | "all" | null>({
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

      <ECNTabsItem :name="MeetStatusEnum.GOING_ON_SALE" title="Назначено" />

      <ECNTabsItem :name="MeetStatusEnum.CANCELLED" title="Отменено" />

      <ECNTabsItem :name="MeetStatusEnum.FINISHED" title="Завершено" />
    </ECNTabs>
  </div>
</template>

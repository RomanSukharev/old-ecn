<script setup lang="ts">
import { LeadStatusEnum } from "~/shared/api/generated";

const activeTab = defineModel<LeadStatusEnum | "all" | null>({
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

      <ECNTabsItem :name="LeadStatusEnum.IN_PROGRESS" title="В работе" />

      <ECNTabsItem :name="LeadStatusEnum.NEW" title="Новый" />

      <ECNTabsItem :name="LeadStatusEnum.REFUSED" title="Отказ" />

      <ECNTabsItem :name="LeadStatusEnum.SUCCESS" title="Успешный" />

      <ECNTabsItem :name="LeadStatusEnum.THINKING" title="Думает" />
    </ECNTabs>
  </div>
</template>

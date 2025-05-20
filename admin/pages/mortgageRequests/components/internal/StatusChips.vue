<script setup lang="ts">
import { MortgageRequestStatusEnum } from "~/shared/api/generated";

const activeTab = defineModel<MortgageRequestStatusEnum | "all" | null>({
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

      <ECNTabsItem :name="MortgageRequestStatusEnum.REFUSAL" title="Отказ" />

      <ECNTabsItem
        :name="MortgageRequestStatusEnum.OBJECT_APPROVAL"
        title="Согласование объекта"
      />

      <ECNTabsItem
        :name="MortgageRequestStatusEnum.APPROVED"
        title="Одобрено"
      />

      <ECNTabsItem :name="MortgageRequestStatusEnum.SENT" title="Продан" />
    </ECNTabs>
  </div>
</template>

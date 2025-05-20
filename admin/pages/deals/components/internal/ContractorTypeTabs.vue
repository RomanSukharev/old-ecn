<script setup lang="ts">
import { DealStageEnum } from "~/shared/api/generated";

const activeTab = defineModel<DealStageEnum | "all" | null>({
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
  <ECNTabs v-if="activeTab" v-model="activeTab" variant="chips">
    <ECNTabsItem name="all" title="Все" />

    <ECNTabsItem :name="DealStageEnum.DEPOSIT_PAID" title="Задаток" />

    <ECNTabsItem
      :name="DealStageEnum.SCHEDULED_FOR_DEAL"
      title="Записаны на сделку"
    />

    <ECNTabsItem
      :name="DealStageEnum.MFC_REGISTRATION"
      title="На регистрации в МФЦ"
    />

    <ECNTabsItem
      :name="DealStageEnum.REGISTERED"
      title="Зарегестрировано (оплата комиссии)"
    />
  </ECNTabs>
</template>

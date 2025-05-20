<script setup lang="ts">
import { LeadTypeEnum } from "~/shared/api/generated";

const activeTab = defineModel<LeadTypeEnum | null>({
  default: LeadTypeEnum.SALER,
});
</script>

<template>
  <ECNTabs v-if="activeTab" v-model="activeTab" variant="pills">
    <ECNTabsItem :name="LeadTypeEnum.SALER" title="Продавец" />

    <ECNTabsItem :name="LeadTypeEnum.BUYER" title="Покупатель" />

    <ECNTabsItem :name="LeadTypeEnum.BOTH" title="Продавец и покупатель" />
  </ECNTabs>
</template>

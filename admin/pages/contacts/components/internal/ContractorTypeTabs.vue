<script setup lang="ts">
import { CounterPartyTypeEnum } from "~/shared/api/generated";

const activeTab = defineModel<CounterPartyTypeEnum | null>({
  default: CounterPartyTypeEnum.SALER,
});
</script>

<template>
  <ECNTabs v-if="activeTab" v-model="activeTab" variant="pills">
    <ECNTabsItem :name="CounterPartyTypeEnum.SALER" title="Продавец" />

    <ECNTabsItem :name="CounterPartyTypeEnum.BUYER" title="Покупатель" />

    <ECNTabsItem
      :name="CounterPartyTypeEnum.BOTH"
      title="Продавец и покупатель"
    />
  </ECNTabs>
</template>

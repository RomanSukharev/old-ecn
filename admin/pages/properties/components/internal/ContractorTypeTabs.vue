<script setup lang="ts">
import { PropertyTypeEnum } from "~/shared/api/generated";

const activeTab = defineModel<PropertyTypeEnum | null>({
  default: PropertyTypeEnum.NEW,
});
</script>

<template>
  <ECNTabs v-if="activeTab" v-model="activeTab" variant="pills">
    <ECNTabsItem :name="PropertyTypeEnum.NEW" title="Новостройки" />

    <ECNTabsItem :name="PropertyTypeEnum.USED" title="Вторичная" />

    <ECNTabsItem :name="PropertyTypeEnum.VILLAGE" title="Коттеджные поселки" />

    <ECNTabsItem :name="PropertyTypeEnum.SUBURBAN" title="Загородная" />

    <ECNTabsItem :name="PropertyTypeEnum.COMMERCIAL" title="Коммерческая" />
  </ECNTabs>
</template>

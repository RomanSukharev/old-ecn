<script setup lang="ts">
import { viewTabs } from "~/widgets/meetDrawer/constants";

const activeTab = defineModel<string | null>({
  default: viewTabs[0].id,
});
</script>

<template>
  <div>
    <ECNTabs v-if="activeTab" v-model="activeTab" variant="pills">
      <ECNTabsItem :name="viewTabs[0].id" title="Список" />

      <ECNTabsItem :name="viewTabs[1].id" title="Календарь" />
    </ECNTabs>
  </div>
</template>

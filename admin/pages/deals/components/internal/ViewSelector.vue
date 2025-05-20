<script setup lang="ts">
import { viewModes } from "~/widgets/dealDrawer/constants";

const activeTab = defineModel<string | null>({
  default: viewModes[0].id,
});
</script>

<template>
  <div>
    <ECNTabs v-if="activeTab" v-model="activeTab" variant="pills">
      <ECNTabsItem :name="viewModes[0].id" title="Канбан" />

      <ECNTabsItem :name="viewModes[1].id" title="Список" />
    </ECNTabs>
  </div>
</template>

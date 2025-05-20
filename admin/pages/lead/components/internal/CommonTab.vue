<script setup lang="ts">
import { type LeadPageQuery_lead_Lead } from "~/shared/api/generated";
import { leadSources } from "~/widgets/leadDrawer/constants";

const props = defineProps<{
  lead?: LeadPageQuery_lead_Lead;
}>();

const leadSourceTitle = computed(() => {
  const leadSource = leadSources.find(
    (source) => source.id === props.lead?.source,
  );
  return leadSource ? leadSource.title : "-";
});

const agentLabel = computed(() => {
  const agentCount = props.lead?.agents?.length || 0;
  return agentCount === 1 ? "Агент" : "Агенты";
});
</script>

<template>
  <div
    v-if="lead"
    class="mt-8 flex flex-col space-y-4 text-xs overflow-auto max-h-full"
  >
    <ECNKeyValue label="Компания" :value="lead.company || '-'" />

    <ECNKeyValue label="Адрес" :value="lead.address || '-'" />

    <ECNKeyValue
      label="Источник"
      :value="leadSourceTitle"
      :items="leadSources"
    />

    <ECNKeyValue label="Заявка" :value="lead.request || '-'" />

    <div class="flex space-x-5">
      <div class="w-30 text-gray-400 font-medium leading-snug">
        {{ agentLabel }}
      </div>

      <div v-if="lead?.agents?.length">
        <span v-for="(agent, index) in lead.agents" :key="agent.id">
          <NuxtLink
            :to="`/staff/employees/${agent.id}`"
            class="text-blue-600 hover:text-blue-800 font-medium"
            target="_blank"
          >
            {{ agent.surname }} {{ agent.name }}
          </NuxtLink>

          <span v-if="index < lead.agents.length - 1" class="text-blue-600"
            >,
          </span>
        </span>
      </div>

      <div v-else>-</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: TAny;
}>();

const groupAgents = (agents: TAny[]) => {
  const result = [];
  for (let i = 0; i < agents.length; i += 2) {
    result.push(agents.slice(i, i + 2));
  }
  return result;
};
</script>

<template>
  <div>
    <div v-if="data?.agents?.length">
      <template
        v-for="(group, groupIndex) in groupAgents(data.agents)"
        :key="groupIndex"
      >
        <div>
          <template v-for="(agent, index) in group" :key="agent.id">
            <NuxtLink
              :to="`/staff/employees/${agent.id}`"
              class="text-blue-600 hover:text-blue-800"
              target="_blank"
            >
              {{ agent.surname }} {{ agent.name }}
            </NuxtLink>

            <span
              v-if="
                groupIndex < groupAgents(data.agents).length - 1 ||
                index < group.length - 1
              "
              class="text-blue-600"
              >,
            </span>
          </template>
        </div>
      </template>
    </div>

    <div v-else>-</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    :to="`/staff/employees/${data?.agent?.id}`"
    class="text-blue-600 hover:text-blue-800 whitespace-nowrap"
    target="_blank"
  >
    <div>
      {{
        data?.agent?.name && data?.agent?.surname
          ? `${data.agent.name} ${data.agent.surname}`
          : "-"
      }}
    </div>
  </NuxtLink>
</template>

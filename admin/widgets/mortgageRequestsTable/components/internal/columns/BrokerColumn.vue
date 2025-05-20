<script setup lang="ts">
defineProps<{
  data: TAny;
}>();
</script>

<template>
  <NuxtLink
    :to="`/staff/employees/${data?.mortgageBroker?.id}`"
    class="text-blue-600 hover:text-blue-800 whitespace-nowrap"
    target="_blank"
  >
    <div>
      {{
        data?.mortgageBroker?.name && data?.mortgageBroker?.surname
          ? `${data.mortgageBroker.name} ${data.mortgageBroker.surname}`
          : "-"
      }}
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  to: string;
}>();

const slots = useSlots();
const hasSlot = (name: string): boolean => {
  return !!slots[name];
};

const currentRoute = useRoute();
const isExpanded = ref(currentRoute.path.startsWith(props.to));
</script>

<template>
  <div>
    <NuxtLink v-slot="{ navigate, isActive }" :to="to" custom>
      <div
        class="px-4 py-3 font-medium text-xs leading-snug flex justify-between space-x-1 cursor-pointer items-center select-none hover:bg-gray-200"
        :class="{
          'bg-gray-200':
            isActive || (currentRoute.path.startsWith(to) && to !== '/'),
        }"
        @click="hasSlot('default') ? (isExpanded = !isExpanded) : navigate()"
      >
        {{ title }}
        <template v-if="hasSlot('default')">
          <i-chevron-up v-if="isExpanded" />

          <i-chevron-down v-else />
        </template>
      </div>
    </NuxtLink>

    <div v-if="hasSlot('default') && isExpanded">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: "pills" | "underline" | "chips";
    size?: "small" | "large";
  }>(),
  {
    variant: "pills",
    size: "small",
  },
);

const modelValueRef = defineModel<TAny>();

const slots = useSlots();
const defaultSlot = slots.default;

const tabsChildren = computed(() => {
  return defaultSlot
    ? flatten(defaultSlot()).filter((v) => {
        return (v.type as { __TAB__?: true }).__TAB__;
      })
    : [];
});

provide("tabs_active_name", modelValueRef);

const onActivate = (value: TAny): void => {
  modelValueRef.value = value;
};
</script>

<template>
  <div class="flex flex-col overflow-hidden max-h-full h-full">
    <Swiper
      class="shrink-0 overflow-hidden w-full"
      slides-per-view="auto"
      :space-between="variant == 'underline' ? 12 : 4"
    >
      <SwiperSlide
        v-for="(item, id) in tabsChildren"
        :key="id"
        class="cursor-pointer whitespace-nowrap text-xs !w-fit select-none"
        :class="{
          'p-2': size == 'small' && variant == 'pills',
          'px-4 py-3': size == 'large' && variant == 'pills',
          'rounded font-medium': variant == 'pills',
          'px-4 py-2 rounded-full font-medium': variant == 'chips',
          'py-1.5 font-semibold': variant == 'underline',
          'bg-gray-50 hover:bg-gray-100 text-gray-400':
            (variant == 'pills' || variant == 'chips') &&
            modelValueRef !== item.props?.name,
          'bg-gray-100 hover:bg-gray-200 text-blue-600':
            (variant == 'pills' || variant == 'chips') &&
            modelValueRef === item.props?.name,
          'text-gray-400':
            variant == 'underline' && modelValueRef !== item.props?.name,
          'text-blue-600 border-b border-blue-600':
            variant == 'underline' && modelValueRef === item.props?.name,
        }"
        :active="modelValueRef === item.props?.name"
        @click="onActivate(item.props?.name)"
      >
        {{ item.props?.title }}
      </SwiperSlide>
    </Swiper>

    <slot />
  </div>
</template>

<style></style>

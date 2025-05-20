<script lang="ts" setup>
import type { DealEnum, PropertyFilter } from "@/shared/api/generated";
import { deals } from "~/shared/constants";

const emit = defineEmits<{
  close: [];
  apply: [PropertyFilter];
  reset: [];
}>();

const props = defineProps<PropertyFilter>();

const deal = ref<{
  id: DealEnum;
  title: string;
}>();
deal.value = deals.find((d) => d.id === props.deal);

const isHot = ref<boolean | undefined>(props.isHot || undefined);
const isDeleted = ref<boolean | undefined>(props.isDeleted || undefined);
const withPhotos = ref<boolean | undefined>(props.withPhotos || undefined);

const minPrice = ref<number | undefined>(props.minPrice || undefined);
const maxPrice = ref<number | undefined>(props.maxPrice || undefined);
const minArea = ref<number | undefined>(props.minArea || undefined);
const maxArea = ref<number | undefined>(props.maxArea || undefined);
const minLandArea = ref<number | undefined>(props.minLandArea || undefined);
const maxLandArea = ref<number | undefined>(props.maxLandArea || undefined);
const minPricePerMeter = ref<number | undefined>(
  props.minPricePerMeter || undefined,
);
const maxPricePerMeter = ref<number | undefined>(
  props.maxPricePerMeter || undefined,
);
const minPricePerAr = ref<number | undefined>(props.minPricePerAr || undefined);
const maxPricePerAr = ref<number | undefined>(props.maxPricePerAr || undefined);

function onApply(): void {
  emit("apply", {
    deal: deal.value?.id || undefined,
    isHot: isHot.value || undefined,
    minPrice: minPrice.value || undefined,
    maxPrice: maxPrice.value || undefined,
    minArea: minArea.value || undefined,
    maxArea: maxArea.value || undefined,
    minLandArea: minLandArea.value || undefined,
    maxLandArea: maxLandArea.value || undefined,
    minPricePerMeter: minPricePerMeter.value || undefined,
    maxPricePerMeter: maxPricePerMeter.value || undefined,
    minPricePerAr: minPricePerAr.value || undefined,
    maxPricePerAr: maxPricePerAr.value || undefined,
    isDeleted: isDeleted.value || undefined,
    withPhotos: withPhotos.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  deal.value = undefined;
  isHot.value = undefined;
  minPrice.value = undefined;
  maxPrice.value = undefined;
  minArea.value = undefined;
  maxArea.value = undefined;
  minLandArea.value = undefined;
  maxLandArea.value = undefined;
  minPricePerMeter.value = undefined;
  maxPricePerMeter.value = undefined;
  minPricePerAr.value = undefined;
  maxPricePerAr.value = undefined;
  isDeleted.value = undefined;
  withPhotos.value = undefined;
  emit("reset");
}
</script>

<template>
  <ECNDrawer
    title="Фильтр"
    subtitle="Примените нужные элементы фильтрации"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col">
      <div class="p-10 grow overflow-auto">
        <ECNFormSelect
          v-model="deal"
          :items="deals"
          class="mb-4"
          inline
          label="Сделка"
          placeholder="Не выбрано"
        />

        <ECNDivider />

        <ECNFormNumberRange
          v-model:min="minPrice"
          v-model:max="maxPrice"
          inline
          class="mb-4"
          label="Стоимость ₽"
        />

        <ECNDivider />

        <ECNFormNumberRange
          v-model:min="minArea"
          v-model:max="maxArea"
          inline
          class="mb-4"
          label="Площадь м²"
        />

        <ECNFormNumberRange
          v-model:min="minPricePerMeter"
          v-model:max="maxPricePerMeter"
          inline
          class="mb-4"
          label="Стоимость за м²"
        />

        <ECNFormNumberRange
          v-model:min="minLandArea"
          v-model:max="maxLandArea"
          inline
          class="mb-4"
          label="Площадь сот"
        />

        <ECNFormNumberRange
          v-model:min="minPricePerAr"
          v-model:max="maxPricePerAr"
          inline
          class="mb-4"
          label="Стоимость за сот"
        />

        <ECNDivider />

        <ECNFormToggle
          v-model="isHot"
          class="mb-4"
          label="Горячее предложение"
        />

        <ECNFormToggle
          v-model="isDeleted"
          class="mb-4"
          label="Показать удалённые"
        />

        <ECNFormToggle
          v-model="withPhotos"
          class="mb-4"
          label="Только с фотографиями"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        class="border-transparent text-blue-500 mr-auto"
        outline
        @click="onReset"
        >Очистить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onApply">Применить</ECNButton>
    </template>
  </ECNDrawer>
</template>

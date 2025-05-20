<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  useComplexesQuery,
  type ComplexHouseFilter,
} from "@/shared/api/generated";
import { publicationStatuses } from "@/shared/constants";

const emit = defineEmits<{
  close: [];
  apply: [ComplexHouseFilter];
  reset: [];
}>();

const props = defineProps<ComplexHouseFilter>();

const complexRef = ref(props.complexID);
const publicationStatusRef = ref(props.publicationStatus);
const isDeleted = ref<boolean | undefined>(props.isDeleted);
const withPhotos = ref<boolean | undefined>(props.withPhotos);

const complex = computed({
  get: () => complexes.value.find((d) => d.id === complexRef.value),
  set: (val) => (complexRef.value = val?.id),
});

const publicationStatus = computed({
  get: () =>
    publicationStatuses.find((s) => s.id === publicationStatusRef.value),
  set: (val) => (publicationStatusRef.value = val?.id),
});

const { result: complexesRaw } = useComplexesQuery();
const complexes = computed(() => complexesRaw.value?.complexes.nodes ?? []);

function onApply(): void {
  emit("apply", {
    complexID: complexRef.value,
    publicationStatus: publicationStatusRef.value,
    isDeleted: isDeleted.value || undefined,
    withPhotos: withPhotos.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  complex.value = undefined;
  publicationStatusRef.value = undefined;
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
          v-model="complex"
          :items="complexes"
          class="mb-4"
          inline
          label="Жилой комплекс"
          placeholder="Не выбрано"
        />

        <ECNFormSelect
          v-model="publicationStatus"
          :items="publicationStatuses"
          class="mb-4"
          inline
          label="Статус"
          placeholder="Не выбрано"
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

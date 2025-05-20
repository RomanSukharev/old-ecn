<script lang="ts" setup>
import { useDevelopersQuery, type VillageFilter } from "@/shared/api/generated";
import { publicationStatuses } from "@/shared/constants";

const emit = defineEmits<{
  close: [];
  apply: [VillageFilter];
  reset: [];
}>();

const props = defineProps<VillageFilter>();

const developerRef = ref(props.developerID || undefined);
const publicationStatusRef = ref(props.publicationStatus || undefined);
const isDeleted = ref<boolean | undefined>(props.isDeleted || undefined);
const withPhotos = ref<boolean | undefined>(props.withPhotos || undefined);

const developer = computed({
  get: () => developers.value.find((d) => d.id === developerRef.value),
  set: (val) => (developerRef.value = val?.id),
});

const publicationStatus = computed({
  get: () =>
    publicationStatuses.find((s) => s.id === publicationStatusRef.value),
  set: (val) => (publicationStatusRef.value = val?.id),
});

const { result: developersRaw } = useDevelopersQuery();
const developers = computed(() => developersRaw.value?.developers.nodes ?? []);

function onApply(): void {
  emit("apply", {
    developerID: developerRef.value,
    publicationStatus: publicationStatusRef.value,
    isDeleted: isDeleted.value || undefined,
    withPhotos: withPhotos.value || undefined,
  });
  emit("close");
}

function onReset(): void {
  developer.value = undefined;
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
          v-model="developer"
          :items="developers"
          class="mb-4"
          inline
          label="Застройщик"
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

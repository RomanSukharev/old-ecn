<script setup lang="ts">
import { useVillageDrawer } from "../composables/useVillageDrawer";
import {
  type DocumentInput,
  type ImageInput,
  useVillageQuery,
  useSaveVillageMutation,
  useDeleteVillageMutation,
  useDevelopersQuery,
} from "@/shared/api/generated";
import { publicationStatuses, readinessQuarters } from "../constants";
import type { IProps } from "../types";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = defineProps<IProps>();

function filterDocuments(docs: Array<DocumentInput & { file?: File }>) {
  return docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    ...(doc.file ? { file: doc.file } : {}),
  }));
}

function filterImages(imgs: Array<ImageInput & { file?: File }>) {
  return imgs.map((img) => ({
    id: img.id,
    title: img.title,
    ...(img.file ? { file: img.file } : {}),
  }));
}

const { result: developersRaw } = useDevelopersQuery();
const developers = computed(() => developersRaw.value?.developers.nodes ?? []);

const toast = useToast();
const confirm = useConfirm();

const {
  drawerTitle,
  saveButtonTitle,
  errors,
  handleSubmit,
  loading,

  address,
  cadastrNumber,
  cityDistance,
  description,
  developerID,
  documents,
  images,
  inCity,
  internalInfo,
  isReady,
  lat,
  lon,
  projectDeclarations,
  publicationStatus,
  readinessQuarter,
  readinessYear,
  region,
  seoText,
  subRegion,
  title,
  tourLink,
  youtubeLink,

  setErrors,
  setTouched,
} = useVillageDrawer(props);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useVillageQuery({ id: props.id });

  onResult((res) => {
    const village = res.data.village;

    address.value = village.address;
    cadastrNumber.value = village.cadastrNumber;
    cityDistance.value = village.cityDistance;
    description.value = village.description;
    developerID.value = village.developer?.id;
    documents.value = village.documents!;
    images.value = village.images!;
    inCity.value = village.inCity;
    internalInfo.value = village.internalInfo;
    isReady.value = village.isReady;
    lat.value = village.lat;
    lon.value = village.lon;
    projectDeclarations.value = village.projectDeclarations;
    publicationStatus.value = village.publicationStatus;
    readinessQuarter.value = village.readinessQuarter;
    readinessYear.value = village.readinessYear;
    region.value = village.region;
    seoText.value = village.seoText;
    subRegion.value = village.subRegion;
    title.value = village.title;
    tourLink.value = village.tourLink;
    youtubeLink.value = village.youtubeLink;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить КП",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
} else {
  documents.value = [];
  images.value = [];
  projectDeclarations.value = [];
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSaveVillageMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "КП успешно сохранён",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить КП",
      severity: "error",
      life: 5000,
    });
  });

  const formattedValues = {
    ...values,
    documents: filterDocuments(
      (values.documents ?? []).filter(
        (doc): doc is DocumentInput & { file?: File } => doc !== null,
      ),
    ),
    images: filterImages(
      (values.images ?? []).filter(
        (img): img is ImageInput & { file?: File } => img !== null,
      ),
    ),
  };

  mutate({
    input: {
      id: props.id,
      ...formattedValues,
    },
  });
});

function onDeleteHandler(id: string) {
  confirm.require({
    message: "Удалить выбранный КП?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteVillageMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "КП удалён",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить КП",
          severity: "error",
          life: 5000,
        });
      });

      mutate({ id });
    },
  });
}
</script>

<template>
  <ECNDrawer
    :title="drawerTitle"
    subtitle="Заполните нужные поля"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col overflow-auto">
      <div class="px-10 pt-10 shrink-0">
        <ECNFormInput
          v-model="title"
          class="mb-4"
          inline
          required
          label="Название"
          placeholder="Укажите название"
          :error="errors.title"
        />

        <ECNFormTextarea
          v-model="description"
          class="mb-4"
          inline
          required
          label="Описание"
          placeholder="Укажите описание"
          :error="errors.description"
        />

        <ECNDivider dense />

        <ECNFormSelect
          v-model="developerID"
          :items="developers"
          class="mb-4"
          inline
          label="Застройщик"
          placeholder="Не выбрано"
          :error="errors.developerID"
          new-select
        />

        <ECNDivider dense />

        <ECNFormInput
          v-model="address"
          class="mb-4"
          inline
          required
          label="Отображаемый адрес"
          placeholder="Укажите адрес"
          :error="errors.address"
        />

        <ECNFormNumber
          v-model.number="lat"
          class="mb-4"
          inline
          label="Широта"
          placeholder="Укажите значение широты"
          :error="errors.lat"
        />

        <ECNFormNumber
          v-model.number="lon"
          class="mb-4"
          inline
          label="Долгота"
          placeholder="Укажите значение долготы"
          :error="errors.lon"
        />

        <ECNFormInput
          v-model="cadastrNumber"
          class="mb-4"
          inline
          label="Кадастровый номер"
          placeholder="Укажите кадастровый номер"
          :error="errors.cadastrNumber"
        />

        <ECNFormToggle
          v-model="inCity"
          label="В черте города"
          class="mb-4"
          :error="errors.inCity"
        />

        <ECNFormNumber
          v-if="!inCity"
          v-model.number="cityDistance"
          class="mb-4"
          inline
          label="Расстояние до города (км)"
          placeholder="Укажите расстояние в км"
          :error="errors.cityDistance"
        />

        <ECNFormInput
          v-if="inCity"
          v-model="region"
          class="mb-4"
          inline
          label="Район"
          placeholder="Укажите район"
          :error="errors.region"
        />

        <ECNFormInput
          v-if="inCity"
          v-model="subRegion"
          class="mb-4"
          inline
          label="Микрорайон"
          placeholder="Укажите микрорайон"
          :error="errors.subRegion"
        />

        <ECNDivider dense />

        <ECNFormToggle
          v-model="isReady"
          class="mb-4"
          label="Сдан (полная готовность)"
          :error="errors.isReady"
        />

        <ECNFormNumber
          v-if="isReady"
          v-model.number="readinessYear"
          class="mb-4"
          inline
          label="Год постройки"
          placeholder="Укажите год"
          :error="errors.readinessYear"
        />

        <ECNFormSelect
          v-if="!isReady"
          v-model="readinessQuarter"
          class="mb-4"
          :items="readinessQuarters"
          inline
          label="Квартал сдачи"
          placeholder="Выберите значение"
          :error="errors.readinessQuarter"
          new-select
        />

        <ECNFormNumber
          v-if="!isReady"
          v-model.number="readinessYear"
          class="mb-4"
          inline
          label="Год сдачи"
          placeholder="Укажите год"
          :error="errors.readinessYear"
        />

        <ECNDivider dense />

        <ECNFormSelect
          v-model="publicationStatus"
          class="mb-4"
          :items="publicationStatuses"
          inline
          required
          label="Статус"
          placeholder="Выберите значение"
          :error="errors.publicationStatus"
          new-select
        />

        <ECNDivider dense />

        <ECNFormTextarea
          v-model="seoText"
          class="mb-4"
          inline
          label="Описание для SEO"
          placeholder="Укажите описание"
          :error="errors.seoText"
        />

        <ECNFormTextarea
          v-model="internalInfo"
          class="mb-4"
          inline
          label="Служебная информация"
          placeholder="Введите текст"
          :error="errors.internalInfo"
        />

        <ECNDivider />

        <ECNFormImages v-model="images" class="mb-4" label="Фотогалерея" />

        <ECNFormDocuments v-model="documents" class="mb-4" label="Вложения" />

        <ECNFormDocuments
          v-model="projectDeclarations"
          class="mb-4"
          label="Проектная декларация"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="id"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteHandler"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSaveHandler">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>

<script setup lang="ts">
import {
  // type Complex,
  // type ComplexHouseInput,
  type DocumentInput,
  type ImageInput,
  // type QuarterEnum,
  useSaveComplexHouseMutation,
  useDeleteComplexHouseMutation,
  // PublicationStatusEnum,
  useComplexHouseQuery,
  useComplexesQuery,
} from "@/shared/api/generated";
import { useComplexHouseDrawer } from "../composables/useComplexHouseDrawer";
import { publicationStatuses, readinessQuarters } from "../constants";
import type { IProps } from "../types";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = defineProps<IProps>();

const { result: complexesRaw } = useComplexesQuery();
const complexes = computed(() => complexesRaw.value?.complexes.nodes ?? []);

// const complexHouse = reactive<ComplexHouseInput>({
//   title: "",
//   description: "",
//   publicationStatus: PublicationStatusEnum.DRAFT,
//   address: "",
// });

// const complexRef = ref<Pick<Complex, "id" | "title">>();
// const complex = computed({
//   get: () => complexRef.value,
//   set: (value) => {
//     complexRef.value = value;
//     complexID.value = value?.id;
//   },
// });

// const publicationStatusRef = ref<{
//   id: PublicationStatusEnum;
//   title: string;
// }>();
// const publicationStatus = computed({
//   get: () => publicationStatusRef.value,
//   set: (value) => {
//     publicationStatusRef.value = value;
//     publicationStatus.value = value?.id || PublicationStatusEnum.DRAFT;
//   },
// });

// const readinessQuarterRef = ref<{
//   id: QuarterEnum;
//   title: string;
// }>();
// const readinessQuarter = computed({
//   get: () => readinessQuarterRef.value,
//   set: (value) => {
//     readinessQuarterRef.value = value;
//     readinessQuarter.value = value?.id;
//   },
// });

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
  complexID,
  description,
  documents,
  images,
  internalInfo,
  isReady,
  lat,
  lon,
  projectDeclarations,
  publicationStatus,
  readinessQuarter,
  readinessYear,
  seoText,
  title,
  tourLink,
  youtubeLink,

  setErrors,
  setTouched,
} = useComplexHouseDrawer(props);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = useComplexHouseQuery({ id: props.id });

  onResult((res) => {
    const complexHouse = res.data.complexHouse;

    address.value = complexHouse.address;
    cadastrNumber.value = complexHouse.cadastrNumber;
    complexID.value = complexHouse.complex?.id;
    description.value = complexHouse.description;
    documents.value = complexHouse.documents!;
    images.value = complexHouse.images!;
    internalInfo.value = complexHouse.internalInfo;
    isReady.value = complexHouse.isReady;
    lat.value = complexHouse.lat;
    lon.value = complexHouse.lon;
    projectDeclarations.value = complexHouse.projectDeclarations!;
    publicationStatus.value = complexHouse.publicationStatus;
    readinessQuarter.value = complexHouse.readinessQuarter;
    readinessYear.value = complexHouse.readinessYear;
    seoText.value = complexHouse.seoText;
    title.value = complexHouse.title;
    tourLink.value = complexHouse.tourLink;
    youtubeLink.value = complexHouse.youtubeLink;

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить новостройку",
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
  const { mutate, onDone, onError } = useSaveComplexHouseMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Новостройка успешно сохранена",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить новостройку",
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
    message: "Удалить выбранную новостройку?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeleteComplexHouseMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Новостройка удалён",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить новостройку",
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
          v-model="complexID"
          :items="complexes"
          class="mb-4"
          inline
          label="Жилой комплекс"
          placeholder="Не выбрано"
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
          new-select
          :error="errors.publicationStatus"
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

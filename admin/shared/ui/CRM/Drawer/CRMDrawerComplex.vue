<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  type QuarterEnum,
  type Developer,
  useSaveComplexMutation,
  useDeleteComplexMutation,
  useComplexQuery,
  PublicationStatusEnum,
  useDevelopersQuery,
  type ComplexInput,
} from "@/shared/api/generated";
import { publicationStatuses, readinessQuarters } from "~/shared/constants";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    id?: string;
  }>(),
  {
    id: undefined,
  },
);

const { result: developersRaw } = useDevelopersQuery();
const developers = computed(() => developersRaw.value?.developers.nodes ?? []);

const complex = reactive<ComplexInput>({
  title: "",
  description: "",
  publicationStatus: PublicationStatusEnum.DRAFT,
  address: "",
});

const developerRef = ref<Pick<Developer, "id" | "title">>();
const developer = computed({
  get: () => developerRef.value,
  set: (value) => {
    developerRef.value = value;
    complex.developerID = value?.id;
  },
});

const publicationStatusRef = ref<{
  id: PublicationStatusEnum;
  title: string;
}>();
const publicationStatus = computed({
  get: () => publicationStatusRef.value,
  set: (value) => {
    publicationStatusRef.value = value;
    complex.publicationStatus = value?.id || PublicationStatusEnum.DRAFT;
  },
});

const readinessQuarterRef = ref<{
  id: QuarterEnum;
  title: string;
}>();
const readinessQuarter = computed({
  get: () => readinessQuarterRef.value,
  set: (value) => {
    readinessQuarterRef.value = value;
    complex.readinessQuarter = value?.id;
  },
});

const imagesRef = ref<
  {
    id?: string;
    file?: File;
    title?: string;
    url?: string;
    previewUrl?: string;
  }[]
>([]);
const images = computed({
  get: () => imagesRef.value,
  set: (value) => {
    imagesRef.value = value || [];
    complex.images =
      value?.map((i) => ({
        id: i.id,
        file: i.file,
        title: i.title,
      })) || [];
  },
});

const documentsRef = ref<
  {
    id?: string;
    file?: File;
    title?: string;
    url?: string;
  }[]
>([]);
const documents = computed({
  get: () => documentsRef.value,
  set: (value) => {
    documentsRef.value = value || [];
    complex.documents =
      value?.map((i) => ({
        id: i.id,
        file: i.file,
        title: i.title,
      })) || undefined;
  },
});

const projectDeclarationsRef = ref<
  {
    id?: string;
    file?: File;
    title?: string;
    url?: string;
  }[]
>([]);
const projectDeclarations = computed({
  get: () => projectDeclarationsRef.value,
  set: (value) => {
    projectDeclarationsRef.value = value || [];
    complex.projectDeclarations =
      value?.map((i) => ({
        id: i.id,
        file: i.file,
        title: i.title,
      })) || [];
  },
});

if (props.id) {
  const { onResult } = useComplexQuery({
    id: props.id,
  });

  onResult((result) => {
    complex.id = result.data.complex.id;
    complex.title = result.data.complex.title;
    complex.description = result.data.complex.description;
    complex.address = result.data.complex.address;
    complex.lat = result.data.complex.lat;
    complex.lon = result.data.complex.lon;
    complex.cadastrNumber = result.data.complex.cadastrNumber;
    complex.seoText = result.data.complex.seoText;
    complex.youtubeLink = result.data.complex.youtubeLink;
    complex.tourLink = result.data.complex.tourLink;

    complex.inCity = result.data.complex.inCity;
    complex.cityDistance = result.data.complex.cityDistance;
    complex.region = result.data.complex.region;
    complex.subRegion = result.data.complex.subRegion;

    developer.value = result.data.complex.developer;

    complex.isReady = result.data.complex.isReady;
    readinessQuarter.value = readinessQuarters.find(
      (q) => q.id === result.data.complex.readinessQuarter,
    );
    complex.readinessYear = result.data.complex.readinessYear;

    images.value = result.data.complex.images || [];
    documents.value = result.data.complex.documents || [];
    projectDeclarations.value = result.data.complex.projectDeclarations || [];

    publicationStatus.value = publicationStatuses.find(
      (s) => s.id === result.data.complex.publicationStatus,
    );

    complex.internalInfo = result.data.complex.internalInfo;
  });
}

const drawerTitle = computed(() =>
  props.id ? "Редактирование жилого комплекса" : "Создание жилого комплекса",
);

const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

async function onSave(): Promise<void> {
  if (props.id) {
    try {
      const { mutate } = useSaveComplexMutation();
      await mutate({
        input: complex,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить жилой комплекс.");
    }
  } else {
    try {
      const { mutate } = useSaveComplexMutation();
      await mutate({
        input: complex,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать жилой комплекс.");
    }
  }
}

async function onDeleteComplex(): Promise<void> {
  if (confirm("Удалить жилой комплекс?")) {
    if (props.id) {
      try {
        const { mutate } = useDeleteComplexMutation();
        await mutate({
          id: props.id,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить жилой комплекс.");
      }
    }
  }
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
          v-model="complex.title"
          class="mb-4"
          inline
          required
          label="Название"
          placeholder="Укажите название"
        />

        <ECNFormTextarea
          v-model="complex.description"
          class="mb-4"
          inline
          required
          label="Описание"
          placeholder="Укажите описание"
        />

        <ECNDivider dense />

        <ECNFormSelect
          v-model="developer"
          :items="developers"
          class="mb-4"
          inline
          label="Застройщик"
          placeholder="Не выбрано"
        />

        <ECNDivider dense />

        <ECNFormInput
          v-model="complex.address"
          class="mb-4"
          inline
          required
          label="Отображаемый адрес"
          placeholder="Укажите адрес"
        />

        <ECNFormNumber
          v-model.number="complex.lat"
          class="mb-4"
          inline
          label="Широта"
          placeholder="Укажите значение широты"
        />

        <ECNFormNumber
          v-model.number="complex.lon"
          class="mb-4"
          inline
          label="Долгота"
          placeholder="Укажите значение долготы"
        />

        <ECNFormInput
          v-model="complex.cadastrNumber"
          class="mb-4"
          inline
          label="Кадастровый номер"
          placeholder="Укажите кадастровый номер"
        />

        <ECNFormToggle
          v-model="complex.inCity"
          label="В черте города"
          class="mb-4"
        />

        <ECNFormNumber
          v-if="!complex.inCity"
          v-model.number="complex.cityDistance"
          class="mb-4"
          inline
          label="Расстояние до города (км)"
          placeholder="Укажите расстояние в км"
        />

        <ECNFormInput
          v-if="complex.inCity"
          v-model="complex.region"
          class="mb-4"
          inline
          label="Район"
          placeholder="Укажите район"
        />

        <ECNFormInput
          v-if="complex.inCity"
          v-model="complex.subRegion"
          class="mb-4"
          inline
          label="Микрорайон"
          placeholder="Укажите микрорайон"
        />

        <ECNDivider dense />

        <ECNFormToggle
          v-model="complex.isReady"
          class="mb-4"
          label="Сдан (полная готовность)"
        />

        <ECNFormNumber
          v-if="complex.isReady"
          v-model.number="complex.readinessYear"
          class="mb-4"
          inline
          label="Год постройки"
          placeholder="Укажите год"
        />

        <ECNFormSelect
          v-if="!complex.isReady"
          v-model="readinessQuarter"
          class="mb-4"
          :items="readinessQuarters"
          inline
          label="Квартал сдачи"
          placeholder="Выберите значение"
        />

        <ECNFormNumber
          v-if="!complex.isReady"
          v-model.number="complex.readinessYear"
          class="mb-4"
          inline
          label="Год сдачи"
          placeholder="Укажите год"
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
        />

        <ECNDivider dense />

        <ECNFormTextarea
          v-model="complex.seoText"
          class="mb-4"
          inline
          label="Описание для SEO"
          placeholder="Укажите описание"
        />

        <ECNFormTextarea
          v-model="complex.internalInfo"
          class="mb-4"
          inline
          label="Служебная информация"
          placeholder="Введите текст"
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
        @click="onDeleteComplex"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>

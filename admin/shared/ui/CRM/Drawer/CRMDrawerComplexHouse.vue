<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  type QuarterEnum,
  type Complex,
  useSaveComplexHouseMutation,
  useDeleteComplexHouseMutation,
  useComplexHouseQuery,
  PublicationStatusEnum,
  useComplexesQuery,
  type ComplexHouseInput,
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

const { result: complexesRaw } = useComplexesQuery();
const complexes = computed(() => complexesRaw.value?.complexes.nodes ?? []);

const complexHouse = reactive<ComplexHouseInput>({
  title: "",
  description: "",
  publicationStatus: PublicationStatusEnum.DRAFT,
  address: "",
});

const complexRef = ref<Pick<Complex, "id" | "title">>();
const complex = computed({
  get: () => complexRef.value,
  set: (value) => {
    complexRef.value = value;
    complexHouse.complexID = value?.id;
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
    complexHouse.publicationStatus = value?.id || PublicationStatusEnum.DRAFT;
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
    complexHouse.readinessQuarter = value?.id;
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
    complexHouse.images =
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
    complexHouse.documents =
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
    complexHouse.projectDeclarations =
      value?.map((i) => ({
        id: i.id,
        file: i.file,
        title: i.title,
      })) || [];
  },
});

if (props.id) {
  const { onResult } = useComplexHouseQuery({
    id: props.id,
  });

  onResult((result) => {
    complexHouse.id = result.data.complexHouse.id;
    complexHouse.title = result.data.complexHouse.title;
    complexHouse.description = result.data.complexHouse.description;
    complexHouse.address = result.data.complexHouse.address;
    complexHouse.lat = result.data.complexHouse.lat;
    complexHouse.lon = result.data.complexHouse.lon;
    complexHouse.cadastrNumber = result.data.complexHouse.cadastrNumber;
    complexHouse.seoText = result.data.complexHouse.seoText;
    complexHouse.youtubeLink = result.data.complexHouse.youtubeLink;
    complexHouse.tourLink = result.data.complexHouse.tourLink;

    complex.value = result.data.complexHouse.complex;

    complexHouse.isReady = result.data.complexHouse.isReady;
    readinessQuarter.value = readinessQuarters.find(
      (q) => q.id === result.data.complexHouse.readinessQuarter,
    );
    complexHouse.readinessYear = result.data.complexHouse.readinessYear;

    images.value = result.data.complexHouse.images || [];
    documents.value = result.data.complexHouse.documents || [];
    projectDeclarations.value =
      result.data.complexHouse.projectDeclarations || [];

    publicationStatus.value = publicationStatuses.find(
      (s) => s.id === result.data.complexHouse.publicationStatus,
    );

    complexHouse.internalInfo = result.data.complexHouse.internalInfo;
  });
}

const drawerTitle = computed(() =>
  props.id ? "Редактирование новостройки" : "Создание новостройки",
);

const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

async function onSave(): Promise<void> {
  if (props.id) {
    try {
      const { mutate } = useSaveComplexHouseMutation();
      await mutate({
        input: complexHouse,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить новостройку.");
    }
  } else {
    try {
      const { mutate } = useSaveComplexHouseMutation();
      await mutate({
        input: complexHouse,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать новостройку.");
    }
  }
}

async function onDeleteComplexHouse(): Promise<void> {
  if (confirm("Удалить новостройку?")) {
    if (props.id) {
      try {
        const { mutate } = useDeleteComplexHouseMutation();
        await mutate({
          id: props.id,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить новостройку.");
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
          v-model="complexHouse.title"
          class="mb-4"
          inline
          required
          label="Название"
          placeholder="Укажите название"
        />

        <ECNFormTextarea
          v-model="complexHouse.description"
          class="mb-4"
          inline
          required
          label="Описание"
          placeholder="Укажите описание"
        />

        <ECNDivider dense />

        <ECNFormSelect
          v-model="complex"
          :items="complexes"
          class="mb-4"
          inline
          label="Жилой комплекс"
          placeholder="Не выбрано"
        />

        <ECNDivider dense />

        <ECNFormInput
          v-model="complexHouse.address"
          class="mb-4"
          inline
          required
          label="Отображаемый адрес"
          placeholder="Укажите адрес"
        />

        <ECNFormNumber
          v-model.number="complexHouse.lat"
          class="mb-4"
          inline
          label="Широта"
          placeholder="Укажите значение широты"
        />

        <ECNFormNumber
          v-model.number="complexHouse.lon"
          class="mb-4"
          inline
          label="Долгота"
          placeholder="Укажите значение долготы"
        />

        <ECNFormInput
          v-model="complexHouse.cadastrNumber"
          class="mb-4"
          inline
          label="Кадастровый номер"
          placeholder="Укажите кадастровый номер"
        />

        <ECNDivider dense />

        <ECNFormToggle
          v-model="complexHouse.isReady"
          class="mb-4"
          label="Сдан (полная готовность)"
        />

        <ECNFormNumber
          v-if="complexHouse.isReady"
          v-model.number="complexHouse.readinessYear"
          class="mb-4"
          inline
          label="Год постройки"
          placeholder="Укажите год"
        />

        <ECNFormSelect
          v-if="!complexHouse.isReady"
          v-model="readinessQuarter"
          class="mb-4"
          :items="readinessQuarters"
          inline
          label="Квартал сдачи"
          placeholder="Выберите значение"
        />

        <ECNFormNumber
          v-if="!complexHouse.isReady"
          v-model.number="complexHouse.readinessYear"
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
          v-model="complexHouse.seoText"
          class="mb-4"
          inline
          label="Описание для SEO"
          placeholder="Укажите описание"
        />

        <ECNFormTextarea
          v-model="complexHouse.internalInfo"
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
        @click="onDeleteComplexHouse"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>

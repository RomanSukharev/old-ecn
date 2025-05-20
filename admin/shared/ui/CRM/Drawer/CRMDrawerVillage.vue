<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  type QuarterEnum,
  type Developer,
  useSaveVillageMutation,
  useDeleteVillageMutation,
  useVillageQuery,
  PublicationStatusEnum,
  useDevelopersQuery,
  type VillageInput,
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

const village = reactive<VillageInput>({
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
    village.developerID = value?.id;
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
    village.publicationStatus = value?.id || PublicationStatusEnum.DRAFT;
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
    village.readinessQuarter = value?.id;
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
    village.images =
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
    village.documents =
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
    village.projectDeclarations =
      value?.map((i) => ({
        id: i.id,
        file: i.file,
        title: i.title,
      })) || [];
  },
});

if (props.id) {
  const { onResult } = useVillageQuery({
    id: props.id,
  });

  onResult((result) => {
    village.id = result.data.village.id;
    village.title = result.data.village.title;
    village.description = result.data.village.description;
    village.address = result.data.village.address;
    village.lat = result.data.village.lat;
    village.lon = result.data.village.lon;
    village.cadastrNumber = result.data.village.cadastrNumber;
    village.seoText = result.data.village.seoText;
    village.youtubeLink = result.data.village.youtubeLink;
    village.tourLink = result.data.village.tourLink;

    village.inCity = result.data.village.inCity;
    village.cityDistance = result.data.village.cityDistance;
    village.region = result.data.village.region;
    village.subRegion = result.data.village.subRegion;

    developer.value = result.data.village.developer;

    village.isReady = result.data.village.isReady;
    readinessQuarter.value = readinessQuarters.find(
      (q) => q.id === result.data.village.readinessQuarter,
    );
    village.readinessYear = result.data.village.readinessYear;

    images.value = result.data.village.images || [];
    documents.value = result.data.village.documents || [];
    projectDeclarations.value = result.data.village.projectDeclarations || [];

    publicationStatus.value = publicationStatuses.find(
      (s) => s.id === result.data.village.publicationStatus,
    );

    village.internalInfo = result.data.village.internalInfo;
  });
}

const drawerTitle = computed(() =>
  props.id
    ? "Редактирование коттеджного посёлка"
    : "Создание коттеджного посёлка",
);

const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

async function onSave(): Promise<void> {
  if (props.id) {
    try {
      const { mutate } = useSaveVillageMutation();
      await mutate({
        input: village,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить коттеджный посёлок.");
    }
  } else {
    try {
      const { mutate } = useSaveVillageMutation();
      await mutate({
        input: village,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать коттеджный посёлок.");
    }
  }
}

async function onDeleteVillage(): Promise<void> {
  if (confirm("Удалить коттеджный посёлок?")) {
    if (props.id) {
      try {
        const { mutate } = useDeleteVillageMutation();
        await mutate({
          id: props.id,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить коттеджный посёлок.");
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
          v-model="village.title"
          class="mb-4"
          inline
          required
          label="Название"
          placeholder="Укажите название"
        />

        <ECNFormTextarea
          v-model="village.description"
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
          v-model="village.address"
          class="mb-4"
          inline
          required
          label="Отображаемый адрес"
          placeholder="Укажите адрес"
        />

        <ECNFormNumber
          v-model.number="village.lat"
          class="mb-4"
          inline
          label="Широта"
          placeholder="Укажите значение широты"
        />

        <ECNFormNumber
          v-model.number="village.lon"
          class="mb-4"
          inline
          label="Долгота"
          placeholder="Укажите значение долготы"
        />

        <ECNFormInput
          v-model="village.cadastrNumber"
          class="mb-4"
          inline
          label="Кадастровый номер"
          placeholder="Укажите кадастровый номер"
        />

        <ECNFormToggle
          v-model="village.inCity"
          label="В черте города"
          class="mb-4"
        />

        <ECNFormNumber
          v-if="!village.inCity"
          v-model.number="village.cityDistance"
          class="mb-4"
          inline
          label="Расстояние до города (км)"
          placeholder="Укажите расстояние в км"
        />

        <ECNFormInput
          v-if="village.inCity"
          v-model="village.region"
          class="mb-4"
          inline
          label="Район"
          placeholder="Укажите район"
        />

        <ECNFormInput
          v-if="village.inCity"
          v-model="village.subRegion"
          class="mb-4"
          inline
          label="Микрорайон"
          placeholder="Укажите микрорайон"
        />

        <ECNDivider dense />

        <ECNFormToggle
          v-model="village.isReady"
          class="mb-4"
          label="Сдан (полная готовность)"
        />

        <ECNFormNumber
          v-if="village.isReady"
          v-model.number="village.readinessYear"
          class="mb-4"
          inline
          label="Год постройки"
          placeholder="Укажите год"
        />

        <ECNFormSelect
          v-if="!village.isReady"
          v-model="readinessQuarter"
          class="mb-4"
          :items="readinessQuarters"
          inline
          label="Квартал сдачи"
          placeholder="Выберите значение"
        />

        <ECNFormNumber
          v-if="!village.isReady"
          v-model.number="village.readinessYear"
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
          v-model="village.seoText"
          class="mb-4"
          inline
          label="Описание для SEO"
          placeholder="Укажите описание"
        />

        <ECNFormTextarea
          v-model="village.internalInfo"
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
        @click="onDeleteVillage"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>

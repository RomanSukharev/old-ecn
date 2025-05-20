<script setup lang="ts">
import { usePropertyDrawer } from "../composables/usePropertyDrawer";
import type { DocumentInput, ImageInput } from "@/shared/api/generated";
import {
  useSavePropertyMutation,
  useDeletePropertyMutation,
  usePropertyQuery,
  useComplexesQuery,
  PropertyTypeEnum,
  useVillagesQuery,
  useComplexHousesQuery,
  PropertySubTypeEnum,
} from "@/shared/api/generated";
import {
  deals,
  propertySources,
  propertyStatuses,
  propertySubTypes,
  propertyTypes,
  readinessQuarters,
  rehabTypes,
  toiletTypes,
} from "~/shared/constants";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    id?: string;
    type?: PropertyTypeEnum;
  }>(),
  {
    id: undefined,
    type: undefined,
  },
);

const propertyTypeRef = ref<{
  id: PropertyTypeEnum;
  title: string;
}>();
const propertyType = computed({
  get: () => propertyTypeRef.value,
  set: (value) => {
    propertyTypeRef.value = value;
    if (value && type.value !== value.id) {
      propertySubType.value = undefined;
    }
    type.value = value?.id;
  },
});
if (props.type) {
  propertyType.value = propertyTypes.find((q) => q.id === props.type);
}

const propertySubTypeRef = ref<{
  id: PropertySubTypeEnum;
  title: string;
}>();
const propertySubType = computed({
  get: () => propertySubTypeRef.value,
  set: (value) => {
    propertySubTypeRef.value = value;
    subType.value = value?.id;
  },
});

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
  area,
  cadastrNumber,
  ceilingHeight,
  cityDistance,
  comissionAmount,
  comissionPercent,
  complexHouseID,
  complexID,
  deal,
  description,
  documents,
  floor,
  floors,
  fromDeveloper,
  images,
  inCity,
  inComplex,
  inVillage,
  internalInfo,
  isHot,
  isReady,
  kitchenArea,
  landArea,
  lat,
  livingArea,
  lon,
  price,
  readinessQuarter,
  readinessYear,
  region,
  rehabType,
  rooms,
  seoText,
  source,
  status,
  subRegion,
  subType,
  title,
  toiletType,
  tourLink,
  type,
  villageID,
  youtubeLink,

  setErrors,
  setTouched,
} = usePropertyDrawer(props);

const { result: complexesRaw } = useComplexesQuery();
const complexes = computed(() => complexesRaw.value?.complexes.nodes ?? []);

const { result: complexHousesRaw } = useComplexHousesQuery(() => ({
  filter: { complexID: complexID.value },
}));
const complexHouses = computed(
  () => (complexID && complexHousesRaw.value?.complexHouses.nodes) || [],
);

const { result: villagesRaw } = useVillagesQuery();
const villages = computed(() => villagesRaw.value?.villages.nodes ?? []);

if (props.id) {
  loading.value = true;
  const { onResult, onError } = usePropertyQuery({ id: props.id });

  onResult((res) => {
    const property = res.data.property;

    address.value = property.address;
    area.value = property.area;
    cadastrNumber.value = property.cadastrNumber;
    ceilingHeight.value = property.ceilingHeight;
    cityDistance.value = property.cityDistance;
    comissionAmount.value = property.comissionAmount;
    comissionPercent.value = property.comissionPercent;
    complexHouseID.value = property.complexHouse?.id;
    complexID.value = property.complex?.id;
    deal.value = property.deal;
    description.value = property.description;
    documents.value = property.documents!;
    floor.value = property.floor;
    floors.value = property.floors;
    fromDeveloper.value = property.fromDeveloper;
    images.value = property.images!;
    inCity.value = property.inCity;
    inComplex.value = property.inComplex;
    inVillage.value = property.inVillage;
    internalInfo.value = property.internalInfo;
    isHot.value = property.isHot;
    isReady.value = property.isReady;
    kitchenArea.value = property.kitchenArea;
    landArea.value = property.landArea;
    lat.value = property.lat;
    livingArea.value = property.livingArea;
    lon.value = property.lon;
    price.value = property.price;
    readinessQuarter.value = property.readinessQuarter;
    readinessYear.value = property.readinessYear;
    region.value = property.region;
    rehabType.value = property.rehabType;
    rooms.value = property.rooms;
    seoText.value = property.seoText;
    source.value = property.source;
    status.value = property.status;
    subRegion.value = property.subRegion;
    subType.value = property.subType;
    title.value = property.title;
    toiletType.value = property.toiletType;
    tourLink.value = property.tourLink;
    type.value = property.type;
    villageID.value = property.villageID;
    youtubeLink.value = property.youtubeLink;
    propertyType.value = propertyTypes.find(
      (q) => q.id === res.data.property.type,
    );
    propertySubType.value = propertySubTypes.find(
      (q) => q.id === res.data.property.subType,
    );

    setErrors({});
    setTouched(false);

    loading.value = false;
  });

  onError(() => {
    loading.value = false;
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось загрузить объект",
      severity: "error",
      life: 5000,
    });
    emit("close");
  });
} else {
  documents.value = [];
  images.value = [];
}

const onSaveHandler = handleSubmit(async (values) => {
  const { mutate, onDone, onError } = useSavePropertyMutation();

  onDone(() => {
    toast.add({
      summary: "Операция завершена",
      detail: "Объект успешно сохранён",
      severity: "success",
      life: 5000,
    });
    emit("save");
    emit("close");
  });

  onError(() => {
    toast.add({
      summary: "Ошибка",
      detail: "Не удалось сохранить объект",
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
    message: "Удалить выбранный объект?",
    header: "Внимание",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    acceptProps: {
      severity: "danger",
    },

    accept: () => {
      const { mutate, onDone, onError } = useDeletePropertyMutation();

      onDone(() => {
        toast.add({
          summary: "Операция завершена",
          detail: "Объект удалён",
          severity: "info",
          life: 5000,
        });
        emit("delete");
        emit("close");
      });

      onError(() => {
        toast.add({
          summary: "Ошибка",
          detail: "Не удалось удалить объект",
          severity: "error",
          life: 5000,
        });
      });

      mutate({ id });
    },
  });
}

const subTypesFiltered = computed(() => {
  switch (type.value) {
    case PropertyTypeEnum.NEW:
      return propertySubTypes.filter((i) =>
        [
          PropertySubTypeEnum.APARTMENT,
          PropertySubTypeEnum.FLAT,
          PropertySubTypeEnum.STUDIO,
        ].includes(i.id),
      );
    case PropertyTypeEnum.USED:
      return propertySubTypes.filter((i) =>
        [
          PropertySubTypeEnum.APARTMENT,
          PropertySubTypeEnum.FLAT,
          PropertySubTypeEnum.ROOM,
          PropertySubTypeEnum.STUDIO,
        ].includes(i.id),
      );
    case PropertyTypeEnum.SUBURBAN:
      return propertySubTypes.filter((i) =>
        [
          PropertySubTypeEnum.LAND,
          PropertySubTypeEnum.HOUSE,
          PropertySubTypeEnum.SUMMER_HOUSE,
          PropertySubTypeEnum.TOWNHOUSE,
        ].includes(i.id),
      );
    case PropertyTypeEnum.VILLAGE:
      return propertySubTypes.filter((i) =>
        [PropertySubTypeEnum.HOUSE, PropertySubTypeEnum.TOWNHOUSE].includes(
          i.id,
        ),
      );
    default:
      return [];
  }
});
</script>

<template>
  <ECNDrawer
    :title="drawerTitle"
    subtitle="Заполните нужные поля"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col overflow-auto">
      <div class="px-10 pt-10 shrink-0">
        <ECNFormSelect
          v-model="deal"
          :items="deals"
          class="mb-4"
          inline
          required
          label="Сделка"
          placeholder="Не выбрано"
          :error="errors.deal"
          new-select
        />

        <ECNFormSelect
          v-model="propertyType"
          :items="propertyTypes"
          class="mb-4"
          inline
          required
          label="Тип недвижимости"
          placeholder="Не выбрано"
        />

        <ECNFormSelect
          v-if="propertyType"
          v-model="propertySubType"
          :items="subTypesFiltered"
          class="mb-4"
          inline
          required
          label="Вид недвижимости"
          placeholder="Не выбрано"
        />

        <ECNFormToggle
          v-model="fromDeveloper"
          class="mb-4"
          label="От застройщика"
          :error="errors.fromDeveloper"
        />

        <ECNFormToggle
          v-model="isHot"
          class="mb-4"
          label="Горячее предложение"
          :error="errors.isHot"
        />

        <template
          v-if="
            type &&
            [
              PropertyTypeEnum.NEW,
              PropertyTypeEnum.USED,
              PropertyTypeEnum.COMMERCIAL,
            ].includes(type)
          "
        >
          <ECNFormToggle
            v-model="inComplex"
            class="mb-4"
            label="В ЖК"
            :error="errors.inComplex"
          />

          <ECNFormSelect
            v-if="inComplex"
            v-model="complexID"
            :items="complexes"
            class="mb-4"
            inline
            label="Жилой комплекс"
            placeholder="Не выбрано"
            new-select
          />

          <ECNFormSelect
            v-if="inComplex"
            v-model="complexHouseID"
            :items="complexHouses"
            class="mb-4"
            inline
            label="Дом/ГП в ЖК"
            placeholder="Не выбрано"
            new-select
          />
        </template>

        <template
          v-if="
            type &&
            [
              PropertyTypeEnum.SUBURBAN,
              PropertyTypeEnum.VILLAGE,
              PropertyTypeEnum.COMMERCIAL,
            ].includes(type)
          "
        >
          <ECNFormToggle
            v-model="inVillage"
            class="mb-4"
            label="В КП"
            :error="errors.inVillage"
          />

          <ECNFormSelect
            v-if="inVillage"
            v-model="villageID"
            :items="villages"
            class="mb-4"
            inline
            label="Коттеджный посёлок"
            placeholder="Не выбрано"
            :error="errors.villageID"
          />
        </template>

        <ECNFormInput
          v-model="title"
          class="mb-4"
          inline
          required
          label="Название"
          placeholder="Укажите название"
          :error="errors.title"
        />

        <ECNDivider />

        <ECNFormNumber
          v-model="price"
          class="mb-4"
          inline
          label="Стоимость"
          placeholder="Укажите стоимость"
          :error="errors.price"
        />

        <ECNFormInput
          v-model="address"
          class="mb-4"
          inline
          required
          label="Адрес"
          placeholder="Укажите адрес"
          :error="errors.address"
        />

        <ECNFormNumber
          v-model="lat"
          class="mb-4"
          inline
          label="Широта"
          placeholder="Укажите значение широты"
          :error="errors.lat"
        />

        <ECNFormNumber
          v-model="lon"
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
          required
          label="Кадастровый номер объекта"
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

        <ECNDivider />

        <ECNFormSelect
          v-model="source"
          :items="propertySources"
          class="mb-4"
          inline
          required
          label="Источник"
          placeholder="Не выбрано"
          :error="errors.source"
          new-select
        />

        <ECNDivider />

        <ECNFormNumber
          v-if="
            type && [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(type)
          "
          v-model="rooms"
          class="mb-4"
          inline
          label="Кол-во комнат"
          placeholder="Укажите количество комнат"
          :error="errors.rooms"
        />

        <ECNFormNumber
          v-model="area"
          class="mb-4"
          inline
          label="Общая площадь"
          placeholder="Укажите площадь"
          :error="errors.area"
        />

        <ECNFormNumber
          v-if="
            type && [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(type)
          "
          v-model="livingArea"
          class="mb-4"
          inline
          label="Жилая площадь"
          placeholder="Укажите площадь"
          :error="errors.livingArea"
        />

        <ECNFormNumber
          v-if="
            type && [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(type)
          "
          v-model="kitchenArea"
          class="mb-4"
          inline
          label="Площадь кухни"
          placeholder="Укажите площадь"
          :error="errors.kitchenArea"
        />

        <ECNFormNumber
          v-if="
            type &&
            [PropertyTypeEnum.SUBURBAN, PropertyTypeEnum.VILLAGE].includes(type)
          "
          v-model="landArea"
          class="mb-4"
          inline
          label="Площадь участка"
          placeholder="Укажите площадь"
          :error="errors.landArea"
        />

        <ECNFormSelect
          v-if="
            type && [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(type)
          "
          v-model="toiletType"
          :items="toiletTypes"
          class="mb-4"
          inline
          label="Тип санузла"
          placeholder="Не выбрано"
          :error="errors.toiletType"
          new-select
        />

        <ECNFormSelect
          v-if="
            type && [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(type)
          "
          v-model="rehabType"
          :items="rehabTypes"
          class="mb-4"
          inline
          label="Вид ремонта"
          placeholder="Не выбрано"
          :error="errors.rehabType"
          new-select
        />

        <ECNFormNumber
          v-if="
            type && [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(type)
          "
          v-model="floor"
          class="mb-4"
          inline
          label="Этаж"
          placeholder="Укажите номер"
          :error="errors.floor"
        />

        <ECNFormNumber
          v-model="floors"
          class="mb-4"
          inline
          label="Этажей в доме"
          placeholder="Укажите кол-во"
          :error="errors.floors"
        />

        <ECNFormNumber
          v-model="ceilingHeight"
          class="mb-4"
          inline
          label="Высота потолков"
          placeholder="Укажите высоту"
          :error="errors.ceilingHeight"
        />

        <ECNDivider />

        <ECNFormTextarea
          v-model="description"
          class="mb-4"
          inline
          required
          label="Описание"
          placeholder="Укажите описание"
          :error="errors.description"
        />

        <ECNFormTextarea
          v-model="seoText"
          class="mb-4"
          inline
          label="Описание для SEO"
          placeholder="Укажите описание"
          :error="errors.seoText"
        />

        <ECNDivider />

        <ECNFormInput
          v-model="youtubeLink"
          class="mb-4"
          inline
          label="Ссылка на Youtube"
          placeholder="Укажите ссылку"
          :error="errors.youtubeLink"
        />

        <ECNFormInput
          v-model="tourLink"
          class="mb-4"
          inline
          label="Ссылка на 3D-тур"
          placeholder="Укажите ссылку"
          :error="errors.tourLink"
        />

        <ECNFormSelect
          v-model="status"
          class="mb-4"
          :items="propertyStatuses"
          inline
          required
          label="Статус"
          placeholder="Выберите значение"
          :error="errors.status"
          new-select
        />

        <ECNDivider />

        <ECNFormNumber
          v-model="comissionPercent"
          class="mb-4"
          inline
          label="Размер комиссии в процентах"
          placeholder="Укажите значение"
          :error="errors.comissionPercent"
        />

        <ECNFormNumber
          v-model="comissionAmount"
          class="mb-4"
          inline
          label="Размер комиссии в рублях"
          placeholder="Укажите значение"
          :error="errors.comissionAmount"
        />

        <ECNDivider />

        <ECNFormImages v-model="images" class="mb-4" label="Фотогалерея" />

        <ECNFormDocuments v-model="documents" class="mb-4" label="Вложения" />
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

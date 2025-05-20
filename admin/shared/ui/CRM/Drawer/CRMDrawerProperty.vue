<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import type {
  PropertyInput,
  Complex,
  QuarterEnum,
  Village,
  ComplexHouse,
  PropertySourceEnum,
  ToiletTypeEnum,
  RehabTypeEnum,
  DealEnum,
} from "@/shared/api/generated";
import {
  useSavePropertyMutation,
  useDeletePropertyMutation,
  usePropertyQuery,
  PropertyStatusEnum,
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

const property = reactive<PropertyInput>({
  title: "",
  description: "",
  status: PropertyStatusEnum.UNPUBLISHED,
});

const { result: complexesRaw } = useComplexesQuery();
const complexes = computed(() => complexesRaw.value?.complexes.nodes ?? []);

const { result: complexHousesRaw } = useComplexHousesQuery(() => ({
  filter: {
    complexID: property.complexID,
  },
}));
const complexHouses = computed(
  () =>
    (property.complexID && complexHousesRaw.value?.complexHouses.nodes) || [],
);

const { result: villagesRaw } = useVillagesQuery();
const villages = computed(() => villagesRaw.value?.villages.nodes ?? []);

const dealRef = ref<{
  id: DealEnum;
  title: string;
}>();
const deal = computed({
  get: () => dealRef.value,
  set: (value) => {
    dealRef.value = value;
    property.deal = value?.id;
  },
});

const complexRef = ref<Pick<Complex, "id" | "title">>();
const complex = computed({
  get: () => complexRef.value,
  set: (value) => {
    complexRef.value = value;
    property.complexID = value?.id;
  },
});

const complexHouseRef = ref<Pick<ComplexHouse, "id" | "title">>();
const complexHouse = computed({
  get: () => complexHouseRef.value,
  set: (value) => {
    complexHouseRef.value = value;
    property.complexHouseID = value?.id;
  },
});

const villageRef = ref<Pick<Village, "id" | "title">>();
const village = computed({
  get: () => villageRef.value,
  set: (value) => {
    villageRef.value = value;
    property.villageID = value?.id;
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
    property.readinessQuarter = value?.id;
  },
});

const statusRef = ref<{
  id: PropertyStatusEnum;
  title: string;
}>();
const status = computed({
  get: () => statusRef.value,
  set: (value) => {
    statusRef.value = value;
    property.status = value?.id;
  },
});

const propertyTypeRef = ref<{
  id: PropertyTypeEnum;
  title: string;
}>();
const propertyType = computed({
  get: () => propertyTypeRef.value,
  set: (value) => {
    propertyTypeRef.value = value;
    property.type = value?.id;
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
    property.subType = value?.id;
  },
});

const sourceRef = ref<{
  id: PropertySourceEnum;
  title: string;
}>();
const source = computed({
  get: () => sourceRef.value,
  set: (value) => {
    sourceRef.value = value;
    property.source = value?.id;
  },
});

const toiletTypeRef = ref<{
  id: ToiletTypeEnum;
  title: string;
}>();
const toiletType = computed({
  get: () => toiletTypeRef.value,
  set: (value) => {
    toiletTypeRef.value = value;
    property.toiletType = value?.id;
  },
});

const rehabTypeRef = ref<{
  id: RehabTypeEnum;
  title: string;
}>();
const rehabType = computed({
  get: () => rehabTypeRef.value,
  set: (value) => {
    rehabTypeRef.value = value;
    property.rehabType = value?.id;
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
    property.images =
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
    property.documents =
      value?.map((i) => ({
        id: i.id,
        file: i.file,
        title: i.title,
      })) || undefined;
  },
});

if (props.id) {
  const { onResult } = usePropertyQuery({
    id: props.id,
  });

  onResult((result) => {
    property.id = result.data.property.id;
    deal.value = deals.find((q) => q.id === result.data.property.deal);
    propertyType.value = propertyTypes.find(
      (q) => q.id === result.data.property.type,
    );
    propertySubType.value = propertySubTypes.find(
      (q) => q.id === result.data.property.subType,
    );

    property.fromDeveloper = result.data.property.fromDeveloper;

    property.inComplex = result.data.property.inComplex;
    complex.value = result.data.property.complex;
    complexHouse.value = result.data.property.complexHouse;

    property.inVillage = result.data.property.inVillage;
    village.value = result.data.property.village;

    property.isHot = result.data.property.isHot;

    property.title = result.data.property.title;
    property.description = result.data.property.description;
    property.address = result.data.property.address;
    property.lat = result.data.property.lat;
    property.lon = result.data.property.lon;
    property.cadastrNumber = result.data.property.cadastrNumber;
    property.seoText = result.data.property.seoText;
    property.youtubeLink = result.data.property.youtubeLink;
    property.tourLink = result.data.property.tourLink;

    documents.value = result.data.property.documents || [];
    images.value = result.data.property.images || [];

    status.value = propertyStatuses.find(
      (q) => q.id === result.data.property.status,
    );

    property.price = result.data.property.price;

    property.isReady = result.data.property.isReady;
    readinessQuarter.value = readinessQuarters.find(
      (q) => q.id === result.data.property.readinessQuarter,
    );
    property.readinessYear = result.data.property.readinessYear;

    property.inCity = result.data.property.inCity;
    property.cityDistance = result.data.property.cityDistance;
    property.region = result.data.property.region;
    property.subRegion = result.data.property.subRegion;

    source.value = propertySources.find(
      (q) => q.id === result.data.property.source,
    );

    property.rooms = result.data.property.rooms;
    property.area = result.data.property.area;
    property.landArea = result.data.property.landArea;
    property.livingArea = result.data.property.livingArea;
    property.kitchenArea = result.data.property.kitchenArea;
    toiletType.value = toiletTypes.find(
      (q) => q.id === result.data.property.toiletType,
    );
    rehabType.value = rehabTypes.find(
      (q) => q.id === result.data.property.rehabType,
    );
    property.floor = result.data.property.floor;
    property.floors = result.data.property.floors;
    property.ceilingHeight = result.data.property.ceilingHeight;

    property.internalInfo = result.data.property.internalInfo;

    property.comissionPercent = result.data.property.comissionPercent;
    property.comissionAmount = result.data.property.comissionAmount;
  });
}

const drawerTitle = computed(() =>
  props.id ? "Редактирование объекта" : "Создание объекта",
);

const saveButtonTitle = computed(() => (props.id ? "Сохранить" : "Создать"));

async function onSave(): Promise<void> {
  if (props.id) {
    try {
      const { mutate } = useSavePropertyMutation();
      await mutate({
        input: property,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить объект.");
    }
  } else {
    try {
      const { mutate } = useSavePropertyMutation();
      await mutate({
        input: property,
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать объект.");
    }
  }
}

async function onDeleteNewProperty(): Promise<void> {
  if (confirm("Удалить объект?")) {
    if (props.id) {
      try {
        const { mutate } = useDeletePropertyMutation();
        await mutate({
          id: props.id,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить объект.");
      }
    }
  }
}

const subTypesFiltered = computed(() => {
  switch (property.type) {
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
          v-if="property.type"
          v-model="propertySubType"
          :items="subTypesFiltered"
          class="mb-4"
          inline
          required
          label="Вид недвижимости"
          placeholder="Не выбрано"
        />

        <ECNFormToggle
          v-model="property.fromDeveloper"
          class="mb-4"
          label="От застройщика"
        />

        <ECNFormToggle
          v-model="property.isHot"
          class="mb-4"
          label="Горячее предложение"
        />

        <template
          v-if="
            property.type &&
            [
              PropertyTypeEnum.NEW,
              PropertyTypeEnum.USED,
              PropertyTypeEnum.COMMERCIAL,
            ].includes(property.type)
          "
        >
          <ECNFormToggle
            v-model="property.inComplex"
            class="mb-4"
            label="В ЖК"
          />

          <ECNFormSelect
            v-if="property.inComplex"
            v-model="complex"
            :items="complexes"
            class="mb-4"
            inline
            label="Жилой комплекс"
            placeholder="Не выбрано"
          />

          <ECNFormSelect
            v-if="property.inComplex"
            v-model="complexHouse"
            :items="complexHouses"
            class="mb-4"
            inline
            label="Дом/ГП в ЖК"
            placeholder="Не выбрано"
          />
        </template>

        <template
          v-if="
            property.type &&
            [
              PropertyTypeEnum.SUBURBAN,
              PropertyTypeEnum.VILLAGE,
              PropertyTypeEnum.COMMERCIAL,
            ].includes(property.type)
          "
        >
          <ECNFormToggle
            v-model="property.inVillage"
            class="mb-4"
            label="В КП"
          />

          <ECNFormSelect
            v-if="property.inVillage"
            v-model="village"
            :items="villages"
            class="mb-4"
            inline
            label="Коттеджный посёлок"
            placeholder="Не выбрано"
          />
        </template>

        <ECNFormInput
          v-model="property.title"
          class="mb-4"
          inline
          required
          label="Название"
          placeholder="Укажите название"
        />

        <ECNDivider />

        <ECNFormNumber
          v-model="property.price"
          class="mb-4"
          inline
          label="Стоимость"
          placeholder="Укажите стоимость"
        />

        <ECNFormInput
          v-model="property.address"
          class="mb-4"
          inline
          required
          label="Адрес"
          placeholder="Укажите адрес"
        />

        <ECNFormNumber
          v-model="property.lat"
          class="mb-4"
          inline
          label="Широта"
          placeholder="Укажите значение широты"
        />

        <ECNFormNumber
          v-model="property.lon"
          class="mb-4"
          inline
          label="Долгота"
          placeholder="Укажите значение долготы"
        />

        <ECNFormInput
          v-model="property.cadastrNumber"
          class="mb-4"
          inline
          required
          label="Кадастровый номер объекта"
          placeholder="Укажите кадастровый номер"
        />

        <ECNDivider dense />

        <ECNFormToggle
          v-model="property.isReady"
          class="mb-4"
          label="Сдан (полная готовность)"
        />

        <ECNFormNumber
          v-if="property.isReady"
          v-model.number="property.readinessYear"
          class="mb-4"
          inline
          label="Год постройки"
          placeholder="Укажите год"
        />

        <ECNFormSelect
          v-if="!property.isReady"
          v-model="readinessQuarter"
          class="mb-4"
          :items="readinessQuarters"
          inline
          label="Квартал сдачи"
          placeholder="Выберите значение"
        />

        <ECNFormNumber
          v-if="!property.isReady"
          v-model.number="property.readinessYear"
          class="mb-4"
          inline
          label="Год сдачи"
          placeholder="Укажите год"
        />

        <ECNDivider dense />

        <ECNFormToggle
          v-model="property.inCity"
          label="В черте города"
          class="mb-4"
        />

        <ECNFormNumber
          v-if="!property.inCity"
          v-model.number="property.cityDistance"
          class="mb-4"
          inline
          label="Расстояние до города (км)"
          placeholder="Укажите расстояние в км"
        />

        <ECNFormInput
          v-if="property.inCity"
          v-model="property.region"
          class="mb-4"
          inline
          label="Район"
          placeholder="Укажите район"
        />

        <ECNFormInput
          v-if="property.inCity"
          v-model="property.subRegion"
          class="mb-4"
          inline
          label="Микрорайон"
          placeholder="Укажите микрорайон"
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
        />

        <ECNDivider />

        <ECNFormNumber
          v-if="
            property.type &&
            [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(
              property.type,
            )
          "
          v-model="property.rooms"
          class="mb-4"
          inline
          label="Кол-во комнат"
          placeholder="Укажите количество комнат"
        />

        <ECNFormNumber
          v-model="property.area"
          class="mb-4"
          inline
          label="Общая площадь"
          placeholder="Укажите площадь"
        />

        <ECNFormNumber
          v-if="
            property.type &&
            [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(
              property.type,
            )
          "
          v-model="property.livingArea"
          class="mb-4"
          inline
          label="Жилая площадь"
          placeholder="Укажите площадь"
        />

        <ECNFormNumber
          v-if="
            property.type &&
            [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(
              property.type,
            )
          "
          v-model="property.kitchenArea"
          class="mb-4"
          inline
          label="Площадь кухни"
          placeholder="Укажите площадь"
        />

        <ECNFormNumber
          v-if="
            property.type &&
            [PropertyTypeEnum.SUBURBAN, PropertyTypeEnum.VILLAGE].includes(
              property.type,
            )
          "
          v-model="property.landArea"
          class="mb-4"
          inline
          label="Площадь участка"
          placeholder="Укажите площадь"
        />

        <ECNFormSelect
          v-if="
            property.type &&
            [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(
              property.type,
            )
          "
          v-model="toiletType"
          :items="toiletTypes"
          class="mb-4"
          inline
          label="Тип санузла"
          placeholder="Не выбрано"
        />

        <ECNFormSelect
          v-if="
            property.type &&
            [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(
              property.type,
            )
          "
          v-model="rehabType"
          :items="rehabTypes"
          class="mb-4"
          inline
          label="Вид ремонта"
          placeholder="Не выбрано"
        />

        <ECNFormNumber
          v-if="
            property.type &&
            [PropertyTypeEnum.NEW, PropertyTypeEnum.USED].includes(
              property.type,
            )
          "
          v-model="property.floor"
          class="mb-4"
          inline
          label="Этаж"
          placeholder="Укажите номер"
        />

        <ECNFormNumber
          v-model="property.floors"
          class="mb-4"
          inline
          label="Этажей в доме"
          placeholder="Укажите кол-во"
        />

        <ECNFormNumber
          v-model="property.ceilingHeight"
          class="mb-4"
          inline
          label="Высота потолков"
          placeholder="Укажите высоту"
        />

        <ECNDivider />

        <ECNFormTextarea
          v-model="property.description"
          class="mb-4"
          inline
          required
          label="Описание"
          placeholder="Укажите описание"
        />

        <ECNFormTextarea
          v-model="property.seoText"
          class="mb-4"
          inline
          label="Описание для SEO"
          placeholder="Укажите описание"
        />

        <ECNDivider />

        <ECNFormInput
          v-model="property.youtubeLink"
          class="mb-4"
          inline
          label="Ссылка на Youtube"
          placeholder="Укажите ссылку"
        />

        <ECNFormInput
          v-model="property.tourLink"
          class="mb-4"
          inline
          label="Ссылка на 3D-тур"
          placeholder="Укажите ссылку"
        />

        <ECNFormSelect
          v-model="status"
          class="mb-4"
          :items="propertyStatuses"
          inline
          required
          label="Статус"
          placeholder="Выберите значение"
        />

        <ECNDivider />

        <ECNFormNumber
          v-model="property.comissionPercent"
          class="mb-4"
          inline
          label="Размер комиссии в процентах"
          placeholder="Укажите значение"
        />

        <ECNFormNumber
          v-model="property.comissionAmount"
          class="mb-4"
          inline
          label="Размер комиссии в рублях"
          placeholder="Укажите значение"
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
        @click="onDeleteNewProperty"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>

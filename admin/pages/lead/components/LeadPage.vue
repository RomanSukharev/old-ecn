<script lang="ts" setup>
import {
  useLeadPageQuery,
  LeadStatusEnum,
  LeadTypeEnum,
  useChangeLeadStatusMutation,
} from "@/shared/api/generated";
import { leadTypes, leadStatuses } from "~/widgets/leadDrawer/constants";
import CommonTab from "./internal/CommonTab.vue";
import CRMTabHistory from "~/shared/ui/CRM/Tab/CRMTabHistory.vue";
import PropertiesTable from "~/widgets/propertiesTable/components/Table.vue";
import MeetsTable from "~/widgets/meetsTable/components/Table.vue";
// import DealsTable from "~/widgets/dealsTable/components/Table.vue";
import TasksTable from "~/widgets/tasksTable/components/Table.vue";
import MeetDrawer from "~/widgets/meetDrawer";
import { usePage } from "~/pages/meets/composables/usePage";
// import LeadDrawer from "~/widgets/leadDrawer";
import PropertyDrawer from "~/widgets/propertyDrawer/components/PropertyDrawer.vue";

const activeTab = ref("common");
const route = useRoute();
const id = route.params.id as string;

const { result: data, refetch: refresh } = useLeadPageQuery({
  id,
});

// const showLeadDrawer = ref(false);
const isPropertyDrawerVisible = ref(false);

// async function onLeadSave(): Promise<void> {
//   await refresh();
// }

// async function onLeadDelete(): Promise<void> {
//   await refresh();
// }

const { isMeetDrawerVisible } = usePage();

const lead = computed(() => data.value?.lead);

const leadTypeTitle = computed(() => {
  const leadType = leadTypes.find((type) => type.id === lead.value?.type);
  return leadType ? leadType.title : "-";
});

const showMeetDrawerComputed = computed(
  () =>
    lead?.value?.type === LeadTypeEnum.SALER &&
    lead?.value?.status !== LeadStatusEnum.IN_PROGRESS,
);

const isSaler = computed(() => lead.value?.type === LeadTypeEnum.SALER);
const isBuyer = computed(() => lead.value?.type === LeadTypeEnum.BUYER);

function getStatusColor(color: LeadStatusEnum | null | undefined): string {
  switch (color) {
    case LeadStatusEnum.NEW:
      return "bg-gray-500";
    case LeadStatusEnum.IN_PROGRESS:
      return "bg-blue-300";
    case LeadStatusEnum.THINKING:
      return "bg-yellow-500";
    case LeadStatusEnum.REFUSED:
      return "bg-red-500";
    case LeadStatusEnum.SUCCESS:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
}

function getStatusText(status: LeadStatusEnum | null | undefined): string {
  switch (status) {
    case LeadStatusEnum.NEW:
      return "Новый";
    case LeadStatusEnum.IN_PROGRESS:
      return "В работе";
    case LeadStatusEnum.THINKING:
      return "Думает";
    case LeadStatusEnum.REFUSED:
      return "Отказ";
    case LeadStatusEnum.SUCCESS:
      return "Успех";
    default:
      return "-";
  }
}
const toast = useToast();

const { mutate, onDone, onError } = useChangeLeadStatusMutation();

onDone(() => {
  toast.add({
    summary: "Операция завершена",
    detail: "Статус лида успешно изменён",
    severity: "success",
    life: 5000,
  });
  refresh();
});

onError(() => {
  toast.add({
    summary: "Ошибка",
    detail: "Не удалось изменить статус лида",
    severity: "error",
    life: 5000,
  });
});
const menu = ref();
const items = ref([
  {
    label: "Статусы",
    items: leadStatuses.map((status) => ({
      id: status.id,
      label: status.title,
      command: () => mutate({ id, status: status.id }),
    })),
  },
]);

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event);
};

watch(activeTab, async () => {});
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-y-auto">
    <div
      class="flex items-center shrink-0 space-x-1 text-xs leading-snug font-semibold text-blue-600 mb-6"
    >
      <NuxtLink to="/sales/leads">Лиды</NuxtLink>

      <i-breadcrumbs-chevron />

      <div class="">Страница лида</div>

      <i-breadcrumbs-chevron />
    </div>

    <div class="flex flex-col mb-4 max-w-[800px]">
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="font-bold text-gray-900 text-2xl">
              {{ lead?.surname }} {{ lead?.name }} {{ lead?.patronymic }}
            </div>

            <div class="font-medium text-gray-400 mt-1 ml-2 text-xs">
              ID {{ lead?.internalNumber?.toString().padStart(6, "0") }}
            </div>
          </div>

          <ECNButton
            v-if="showMeetDrawerComputed"
            small
            title="Создать встречу/показ"
            outline
            class="border-none font-semibold"
            @click="isMeetDrawerVisible = true"
          />

          <MeetDrawer
            v-if="isMeetDrawerVisible"
            @close="isMeetDrawerVisible = false"
            @save="$refs.meetsTable?.refetch"
          />
        </div>
      </div>

      <ECNDivider dense />

      <div>
        <div class="items-center space-y-0.5 overflow-y-auto">
          <div class="flex items-center w-56 pt-3">
            <div
              class="w-1.5 h-1.5 rounded-full"
              :class="getStatusColor(lead?.status)"
            ></div>

            <div
              class="px-[3px] pl-[4px] font-medium leading-snug text-xs text-gray-400"
            >
              {{ getStatusText(lead?.status) }}
            </div>

            <div class="card flex justify-center">
              <Button
                type="button"
                title="Изменить статус"
                class="text-blue-600 text-xs font-semibold ml-1"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click="toggle"
                >Изменить статус</Button
              >

              <PrimeMenu
                id="overlay_menu"
                ref="menu"
                :model="items"
                :popup="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="text-2xs mt-5 mb-1">
        <span class="text-gray-500">Создано</span>
        {{ $dayjs(lead?.createdAt).format("DD.MM.YYYY") }}
      </div>

      <div class="text-2xs">
        <span class="text-gray-500">Изменено</span>
        {{ $dayjs(lead?.updatedAt).format("DD.MM.YYYY") }}
      </div>

      <div class="mt-8 flex flex-col space-y-4 text-xs">
        <ECNKeyValue label="E-mail" :value="lead?.email || '-'" />

        <ECNKeyValue label="Телефон" :value="lead?.phone || '-'" />

        <ECNKeyValue
          label="Тип лида"
          :items="leadTypes"
          :value="leadTypeTitle"
        />
      </div>
    </div>

    <div class="pt-6 grow overflow-y-auto">
      <ECNTabs v-model="activeTab" size="large">
        <ECNTabsItem name="common" title="Общее">
          <CommonTab :lead="lead" />
        </ECNTabsItem>

        <ECNTabsItem v-if="isSaler" class="pt-9" name="objects" title="Объекты">
          <ECNButton
            outline
            small
            left-icon="i-plus"
            title="Добавить объект"
            class="mb-4"
            @click="isPropertyDrawerVisible = true"
          />

          <PropertyDrawer
            v-if="isPropertyDrawerVisible"
            @close="isPropertyDrawerVisible = false"
            @save="$refs.propertiesTable?.refetch"
          />

          <PropertiesTable ref="propertiesTable" />
        </ECNTabsItem>

        <ECNTabsItem
          v-if="isBuyer"
          class="pt-8"
          name="suggestions"
          title="Подборы"
        >
          <MeetsTable ref="suggestionsTable" />
        </ECNTabsItem>

        <!-- <ECNTabsItem class="pt-8" name="deals" title="Сделки">
          <DealsTable ref="dealsTable" />
        </ECNTabsItem> -->

        <ECNTabsItem class="pt-8" name="tasks" title="Задачи">
          <TasksTable ref="tasksTable" />
        </ECNTabsItem>

        <ECNTabsItem name="comments" title="Комментарии" />

        <ECNTabsItem name="history" title="История">
          <CRMTabHistory class="pt-8" :author-id="id" />
        </ECNTabsItem>
      </ECNTabs>
    </div>
  </div>
</template>

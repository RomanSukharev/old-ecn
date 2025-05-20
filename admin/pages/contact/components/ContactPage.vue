<script lang="ts" setup>
import {
  useContactPageQuery,
  CounterPartyTypeEnum,
} from "@/shared/api/generated";
import { contactTypes } from "~/widgets/contactDrawer/constants";
import CommonTab from "./internal/CommonTab.vue";
import CRMTabHistory from "~/shared/ui/CRM/Tab/CRMTabHistory.vue";
import TasksTable from "~/widgets/tasksTable/components/Table.vue";
import PropertiesTable from "~/widgets/propertiesTable/components/Table.vue";
import DealsTable from "~/widgets/dealsTable/components/Table.vue";
import MeetsTable from "~/widgets/meetsTable/components/Table.vue";
import MortgageRequestsTable from "~/widgets/mortgageRequestsTable/components/Table.vue";
import PropertyDrawer from "~/widgets/propertyDrawer/components/PropertyDrawer.vue";
import MeetDrawer from "~/widgets/meetDrawer";

const activeTab = ref("common");
const route = useRoute();
const id = route.params.id as string;

const { result: data } = useContactPageQuery({
  id,
});
const isPropertyDrawerVisible = ref(false);
const isMeetDrawerVisible = ref(false);

const contact = computed(() => data.value?.contact);

const contactTypeTitle = computed(() => {
  const contactType = contactTypes.find(
    (type) => type.id === contact.value?.type,
  );
  return contactType ? contactType.title : "-";
});

const isSaler = computed(
  () => contact.value?.type === CounterPartyTypeEnum.SALER,
);

const isBuyer = computed(
  () => contact.value?.type === CounterPartyTypeEnum.BUYER,
);

watch(activeTab, async () => {});
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <div
      class="flex items-center shrink-0 space-x-1 text-xs leading-snug font-semibold text-blue-600 mb-6"
    >
      <NuxtLink to="/sales/contacts">Контакты</NuxtLink>

      <i-breadcrumbs-chevron />

      <div class="">Страница контакта</div>

      <i-breadcrumbs-chevron />
    </div>

    <div class="flex flex-col mb-4 max-w-[800px]">
      <div class="flex items-center space-y-0.5">
        <div class="font-bold text-gray-900 text-2xl">
          {{ contact?.surname }} {{ contact?.name }} {{ contact?.patronymic }}
        </div>

        <div class="font-medium text-gray-400 ml-2 pt-1 text-xs">
          ID {{ contact?.internalNumber?.toString().padStart(6, "0") }}
        </div>
      </div>

      <ECNDivider dense />

      <div
        class="mt-8 flex flex-col space-y-6 text-xs overflow-auto max-h-full"
      >
        <ECNKeyValue label="Телефон" :value="contact?.phone || '-'" />

        <ECNKeyValue label="E-mail" :value="contact?.email || '-'" />

        <ECNKeyValue
          label="Тип контакта"
          :items="contactTypes"
          :value="contactTypeTitle"
        />
      </div>
    </div>

    <div class="pt-6 grow overflow-hidden">
      <ECNTabs v-model="activeTab" size="large">
        <ECNTabsItem name="common" title="Общее">
          <CommonTab :contact="contact" />
        </ECNTabsItem>

        <ECNTabsItem v-if="isSaler" class="pt-8" name="objects" title="Объекты">
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

        <ECNTabsItem class="pt-8" name="meets" title="Встречи/Показы">
          <ECNButton
            outline
            small
            left-icon="i-plus"
            title="Добавить встречу/показ"
            class="mb-4"
            @click="isMeetDrawerVisible = true"
          />

          <MeetDrawer
            v-if="isMeetDrawerVisible"
            @close="isMeetDrawerVisible = false"
            @save="$refs.meetsTable?.refetch"
          />

          <MeetsTable ref="meetsTable" />
        </ECNTabsItem>

        <ECNTabsItem
          v-if="isBuyer"
          class="pt-8"
          name="suggestions"
          title="Подборы"
        >
          <!-- Пока что таблицу встреч/показов поставил, так как подборов ещё нет -->
          <MeetsTable ref="suggestionsTable" />
        </ECNTabsItem>

        <ECNTabsItem
          v-if="isBuyer"
          class="pt-8"
          name="mortgageRequests"
          title="Ипотека"
        >
          <MortgageRequestsTable ref="mortgageRequestsTable" />
        </ECNTabsItem>

        <ECNTabsItem class="pt-8" name="deals" title="Сделки">
          <DealsTable ref="dealsTable" />
        </ECNTabsItem>

        <ECNTabsItem class="pt-8" name="tasks" title="Задачи">
          <TasksTable ref="tasksTable" />
        </ECNTabsItem>

        <ECNTabsItem name="comments" title="Комментарии" />

        <ECNTabsItem class="pt-8" name="history" title="История">
          <CRMTabHistory :author-id="id" />
        </ECNTabsItem>
      </ECNTabs>
    </div>
  </div>
</template>

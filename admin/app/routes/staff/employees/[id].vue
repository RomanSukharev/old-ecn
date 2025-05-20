<script lang="ts" setup>
import { useEmployeeQuery } from "@/shared/api/generated";
import CRMTabHistory from "~/shared/ui/CRM/Tab/CRMTabHistory.vue";

const activeTab = ref("common");
const route = useRoute();
const id = route.params.id as string;

const { result: data } = useEmployeeQuery({
  id,
});

const employee = computed(() => data.value?.employee);

watch(activeTab, async () => {});
</script>

<template>
  <div class="px-6 py-7 flex flex-col grow overflow-hidden">
    <div
      class="flex items-center shrink-0 space-x-1 text-xs leading-snug font-semibold text-blue-600 mb-8"
    >
      <NuxtLink to="/staff/employees">Сотрудники</NuxtLink>

      <i-breadcrumbs-chevron />

      <div class="">Страница сотрудника</div>

      <i-breadcrumbs-chevron />
    </div>

    <div class="flex items-center space-x-3 mb-4">
      <img
        v-if="employee?.avatar"
        :src="employee?.avatar.url"
        class="shrink-0 rounded-full w-19 h-19 bg-gray-200 aspect-square"
      />

      <div
        v-else
        class="shrink-0 rounded-full w-19 h-19 bg-gray-200 aspect-square"
      />

      <div class="flex flex-col space-y-0.5">
        <div class="font-bold text-gray-900 text-2xl">
          {{ employee?.surname }} {{ employee?.name }}
        </div>

        <div class="font-medium text-gray-400 text-xs">
          ID {{ employee?.id }}
        </div>
      </div>
    </div>

    <div class="pt-6 grow overflow-hidden">
      <ECNTabs v-model="activeTab" size="large">
        <ECNTabsItem name="common" title="Общее">
          <div
            class="mt-8 flex flex-col space-y-6 text-xs overflow-auto max-h-full"
          >
            <ECNKeyValue
              label="Дата рождения"
              :value="
                employee?.birthday
                  ? $dayjs(employee.birthday).format('DD.MM.YYYY')
                  : '-'
              "
            />

            <div class="border-b border-gray-200" />

            <ECNKeyValue label="E-mail" :value="employee?.email || '-'" />

            <ECNKeyValue label="Телефон" :value="employee?.phone || '-'" />

            <div class="border-b border-gray-200" />

            <ECNKeyValue
              label="Должность"
              :value="employee?.position?.title || '-'"
            />

            <ECNKeyValue
              label="Отдел"
              :value="employee?.department?.title || '-'"
            />

            <ECNKeyValue
              label="Группа"
              :value="employee?.group?.title || '-'"
            />

            <ECNKeyValue label="Роль" :value="employee?.role?.title || '-'" />

            <div class="border-b border-gray-200" />

            <ECNKeyValue
              label="Общая информация"
              :value="employee?.internalInfo || '-'"
            />
          </div>
        </ECNTabsItem>

        <ECNTabsItem name="stats" title="Статистика" />

        <ECNTabsItem name="contacts" title="Контакты" />

        <ECNTabsItem name="objects" title="Объекты" />

        <ECNTabsItem name="suggestions" title="Подборы" />

        <ECNTabsItem name="meets" title="Встречи/Показы" />

        <ECNTabsItem name="deals" title="Сделки" />

        <ECNTabsItem name="mortgages" title="Ипотека" />

        <ECNTabsItem name="tasks" title="Задачи" />

        <ECNTabsItem name="comments" title="Комментарии" />

        <ECNTabsItem name="history" title="История">
          <CRMTabHistory class="pt-8" :author-id="id" />
        </ECNTabsItem>
      </ECNTabs>
    </div>
  </div>
</template>

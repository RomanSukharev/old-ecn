<script lang="ts" setup>
import { useMortgageRequestPageQuery } from "@/shared/api/generated";
// import CRMTabHistory from "~/shared/ui/CRM/Tab/CRMTabHistory.vue";
import Table from "~/widgets/tasksTable/components/Table.vue";
import SberTab from "./internal/SberTab.vue";
const activeBankTab = ref("sber");
const activeTasksTab = ref("tasks");

const route = useRoute();
const id = route.params.id as string;

const { result: data } = useMortgageRequestPageQuery({
  id,
});

const mortgageRequest = computed(() => data.value?.mortgageRequest);

watch([activeBankTab, activeTasksTab], async () => {});
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="overflow-y-auto px-6 py-7 flex flex-col grow">
      <div
        class="flex items-center shrink-0 space-x-1 text-xs leading-snug font-semibold text-blue-600 mb-8"
      >
        <NuxtLink to="/sales/mortgage-requests">Ипотека</NuxtLink>

        <i-breadcrumbs-chevron />

        <div class="">Страница ипотеки</div>

        <i-breadcrumbs-chevron />
      </div>

      <div class="flex flex-col mb-4">
        <div class="flex items-center space-y-0.5">
          <div class="font-bold text-gray-900 text-2xl">Ипотека</div>

          <div class="font-medium text-gray-400 ml-2 text-xs pt-1">
            ID
            {{ mortgageRequest?.internalNumber?.toString().padStart(6, "0") }}
          </div>
        </div>

        <div class="flex flex-col space-y-6 text-xs">
          <div class="flex mt-5">
            <div class="w-30 text-gray-400 font-medium leading-snug">
              Контакт
            </div>

            <div
              v-if="mortgageRequest?.contact"
              class="text-blue-600 hover:text-blue-800"
            >
              <NuxtLink :to="`/sales/contacts/${mortgageRequest.id}`">
                <div class="space-y-1">
                  {{ mortgageRequest.contact.patronymic }}
                  {{ mortgageRequest.contact.name }}
                </div>
              </NuxtLink>
            </div>

            <div v-else class="ml-5">-</div>
          </div>

          <div class="flex mt-5">
            <div class="w-30 text-gray-400 font-medium leading-snug">
              Ипотечный брокер
            </div>

            <div
              v-if="mortgageRequest?.mortgageBroker"
              class="text-blue-600 hover:text-blue-800"
            >
              <NuxtLink :to="`/sales/contacts/${mortgageRequest.id}`">
                <div class="space-y-1">
                  {{ mortgageRequest?.mortgageBroker.patronymic }}
                  {{ mortgageRequest?.mortgageBroker.name }}
                </div>
              </NuxtLink>
            </div>

            <div v-else class="ml-5">-</div>
          </div>

          <div class="flex mt-5">
            <div class="w-30 text-gray-400 font-medium leading-snug">Агент</div>

            <div
              v-if="mortgageRequest?.agent"
              class="text-blue-600 hover:text-blue-800"
            >
              <NuxtLink :to="`/sales/contacts/${mortgageRequest.id}`">
                <div class="space-y-1">
                  {{ mortgageRequest?.agent.patronymic }}
                  {{ mortgageRequest?.agent.name }}
                </div>
              </NuxtLink>
            </div>

            <div v-else class="ml-5">-</div>
          </div>

          <div class="flex mt-5">
            <div class="w-30 text-gray-400 font-medium leading-snug">
              Сделка
            </div>

            <div
              v-if="mortgageRequest?.deal"
              class="text-blue-600 hover:text-blue-800"
            >
              <NuxtLink :to="`/sales/deals/${mortgageRequest.id}`">
                <div class="space-y-1">
                  {{
                    mortgageRequest?.deal?.internalNumber
                      .toString()
                      .padStart(6, "0")
                  }}
                </div>
              </NuxtLink>
            </div>

            <div v-else class="ml-5">-</div>
          </div>
        </div>
      </div>

      <div class="pt-6 grow">
        <ECNTabs v-model="activeBankTab" size="large">
          <ECNTabsItem name="sber" title="Сбербанк">
            <SberTab class="pt-8" :mortgage-request="mortgageRequest" />
          </ECNTabsItem>

          <ECNTabsItem name="vtb" title="ВТБ" />

          <ECNTabsItem name="alfa" title="Альфабанк" />

          <ECNTabsItem name="tink" title="Тинькофф" />
        </ECNTabs>
      </div>

      <div class="pt-6 grow">
        <ECNTabs v-model="activeTasksTab" size="large">
          <ECNTabsItem class="pt-8" name="tasks" title="Задачи">
            <Table ref="tasksTable" />
          </ECNTabsItem>

          <ECNTabsItem name="comments" title="Комментарии" />

          <ECNTabsItem name="history" title="История">
            <CRMTabHistory class="pt-8" :author-id="id" />
          </ECNTabsItem>
        </ECNTabs>
      </div>
    </div>
  </div>
</template>

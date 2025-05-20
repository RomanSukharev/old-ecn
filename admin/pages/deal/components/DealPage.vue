<script lang="ts" setup>
import {
  useDealQuery,
  DealStageEnum,
  DealTypeEnum,
} from "@/shared/api/generated";
import { getStatusColor } from "~/shared/helpers/getStatusColor";
import TasksTable from "~/widgets/tasksTable/components/Table.vue";

const activeTab = ref("common");
const route = useRoute();
const id = route.params.id as string;

const { result: data } = useDealQuery({
  id,
});

const deal = computed(() => data.value?.deal);

function getContactType(d: DealTypeEnum): string {
  switch (d) {
    case DealTypeEnum.PURCHASE:
      return "Покупка";
    case DealTypeEnum.SALE:
      return "Продажа";
    default:
      return "Не указан";
  }
}

function getDealStage(stage: DealStageEnum): string {
  switch (stage) {
    case DealStageEnum.DEPOSIT_PAID:
      return "Задаток";
    case DealStageEnum.MFC_REGISTRATION:
      return "На регистрации в МФЦ";
    case DealStageEnum.REGISTERED:
      return "Зарегестрировано (оплата комиссии)";
    case DealStageEnum.SCHEDULED_FOR_DEAL:
      return "Записаны на сделку";
    default:
      return "Не указан";
  }
}

const formatCommission = (num: number) => {
  return new Intl.NumberFormat("ru-RU").format(num);
};

watch(activeTab, async () => {});
</script>

<template>
  <div class="overflow-y-auto">
    <div class="px-6 py-7 flex flex-col">
      <div
        class="flex items-center shrink-0 space-x-1 text-xs leading-snug font-semibold text-blue-600 mb-6"
      >
        <NuxtLink to="/sales/deals">Сделки</NuxtLink>

        <i-breadcrumbs-chevron />

        <NuxtLink to="">Страница сделки</NuxtLink>

        <i-breadcrumbs-chevron />
      </div>

      <div class="max-w-[800px] grow">
        <div class="items-center space-y-0.5">
          <div class="font-bold text-gray-900 text-2xl">
            {{ "Сделка " + deal?.internalNumber }}
          </div>

          <div class="text-gray-400 text-2xs">
            {{ "Создана " + $dayjs(deal?.createdAt).format("DD.MM.YYYY") }}
          </div>

          <div class="flex items-center w-56 pt-3 relative">
            <div
              class="w-1.5 h-1.5 rounded-full absolute z-10 ml-1"
              :class="getStatusColor(deal?.stage)"
            ></div>

            <div
              class="px-[3px] py-[3px] pl-[14px] pr-[8px] text-2xs text-gray-400 absolute bg-gray-100 rounded-xl"
            >
              {{ getDealStage(deal?.stage) }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 mt-12 overflow-hidden">
        <ECNTabs v-model="activeTab" size="large">
          <ECNTabsItem
            :class="{ 'max-w-[800px]': activeTab === 'common' }"
            name="common"
            title="Общее"
          >
            <div class="mt-8 flex flex-col space-y-6 text-xs">
              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Тип сделки
                </div>

                <div class="text-gray-900 font-medium leading-snug">
                  {{ getContactType(deal?.type) }}
                </div>
              </div>

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Агент
                </div>

                <NuxtLink
                  :to="`/staff/employees/${deal?.sellerAgent?.id}`"
                  class="text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  <div>
                    {{
                      deal?.sellerAgent?.name && deal?.sellerAgent?.surname
                        ? `${deal.sellerAgent.name} ${deal.sellerAgent.surname}`
                        : "-"
                    }}
                  </div>
                </NuxtLink>
              </div>

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Продавец
                </div>

                <NuxtLink
                  :to="`/staff/employees/${deal?.sellerContact?.id}`"
                  class="text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  <div>
                    {{
                      deal?.sellerContact?.name && deal?.sellerContact?.surname
                        ? `${deal.sellerContact.name} ${deal.sellerContact.surname}`
                        : "-"
                    }}
                  </div>
                </NuxtLink>
              </div>

              <ECNKeyValue
                label="Телефон продавца"
                :value="deal?.sellerPhone || '-'"
              />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium">Документы</div>

                <div class="text-gray-900 font-medium space-x-3">
                  <div v-if="deal?.sellerDocuments?.length" class="flex gap-3">
                    <a
                      v-for="document in deal?.sellerDocuments"
                      :key="document.id"
                      :href="document.url"
                      class="mr-3 text-blue-600 hover:text-blue-800"
                    >
                      <div class="flex gap-1">
                        <i-filetype class="w-4 h-4" />
                        {{ document?.title }}
                      </div>
                    </a>
                  </div>

                  <div v-else>-</div>
                </div>
              </div>

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Покупатель
                </div>

                <NuxtLink
                  :to="`/staff/employees/${deal?.buyerAgent?.id}`"
                  class="text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  <div>
                    {{
                      deal?.buyerAgent?.name && deal?.buyerAgent?.surname
                        ? `${deal.buyerAgent.name} ${deal.buyerAgent.surname}`
                        : "-"
                    }}
                  </div>
                </NuxtLink>
              </div>

              <ECNKeyValue
                label="Телефон покупателя"
                :value="deal?.buyerPhone || '-'"
              />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium">Документы</div>

                <div class="text-gray-900 font-medium space-x-3">
                  <div v-if="deal?.buyerDocuments?.length" class="flex gap-3">
                    <a
                      v-for="document in deal?.buyerDocuments"
                      :key="document.id"
                      :href="document.url"
                      class="mr-3 text-blue-600 hover:text-blue-800"
                    >
                      <div class="flex gap-1">
                        <i-filetype class="w-4 h-4" />
                        {{ document?.title }}
                      </div>
                    </a>
                  </div>

                  <div v-else>-</div>
                </div>
              </div>

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Объект
                </div>

                <NuxtLink
                  :to="`/estate/properties/${deal?.property?.id}`"
                  target="_blank"
                >
                  <div class="space-y-1">
                    <div
                      v-if="deal?.property?.id"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      {{ deal?.property?.title }}
                    </div>
                  </div>
                </NuxtLink>
              </div>

              <ECNKeyValue label="Адрес" :value="deal?.address || '-'" />

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Агент
                </div>

                <NuxtLink
                  :to="`/staff/employees/${deal?.buyerAgent?.id}`"
                  class="text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  <div>
                    {{
                      deal?.buyerAgent?.name && deal?.buyerAgent?.surname
                        ? `${deal.buyerAgent.name} ${deal.buyerAgent.surname}`
                        : "-"
                    }}
                  </div>
                </NuxtLink>
              </div>

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Юрист
                </div>

                <NuxtLink
                  :to="`/staff/employees/${deal?.lawer?.id}`"
                  class="text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  <div>
                    {{
                      deal?.lawer?.name && deal?.lawer?.surname
                        ? `${deal.lawer.name} ${deal.lawer.surname}`
                        : "-"
                    }}
                  </div>
                </NuxtLink>
              </div>

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium">Документы</div>

                <div class="text-gray-900 font-medium space-x-3">
                  <div v-if="deal?.lawerDocuments?.length" class="flex gap-3">
                    <a
                      v-for="document in deal?.lawerDocuments"
                      :key="document.id"
                      :href="document.url"
                      class="mr-3 text-blue-600 hover:text-blue-800"
                    >
                      <div class="flex gap-1">
                        <i-filetype class="w-4 h-4" />
                        {{ document?.title }}
                      </div>
                    </a>
                  </div>

                  <div v-else>-</div>
                </div>
              </div>

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Бухгалтер
                </div>

                <NuxtLink
                  :to="`/staff/employees/${deal?.accountant?.id}`"
                  class="text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  <div>
                    {{
                      deal?.accountant?.name && deal?.accountant?.surname
                        ? `${deal.accountant.name} ${deal.accountant.surname}`
                        : "-"
                    }}
                  </div>
                </NuxtLink>
              </div>

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium">Документы</div>

                <div class="text-gray-900 font-medium space-x-3">
                  <div
                    v-if="deal?.accountantDocuments?.length"
                    class="flex gap-3"
                  >
                    <a
                      v-for="document in deal?.accountantDocuments"
                      :key="document.id"
                      :href="document.url"
                      class="mr-3 text-blue-600 hover:text-blue-800"
                    >
                      <div class="flex gap-1">
                        <i-filetype class="w-4 h-4" />
                        {{ document?.title }}
                      </div>
                    </a>
                  </div>

                  <div v-else>-</div>
                </div>
              </div>

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Ипотечный брокер
                </div>

                <NuxtLink
                  :to="`/staff/employees/${deal?.mortgageBroker?.id}`"
                  class="text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  <div>
                    {{
                      deal?.mortgageBroker?.name &&
                      deal?.mortgageBroker?.surname
                        ? `${deal.mortgageBroker.name} ${deal.mortgageBroker.surname}`
                        : "-"
                    }}
                  </div>
                </NuxtLink>
              </div>

              <ECNKeyValue
                label="Ипотечная заявка"
                :value="deal?.mortgageRequestID || '-'"
              />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium">Документы</div>

                <div class="text-gray-900 font-medium space-x-3">
                  <div
                    v-if="deal?.mortgageDocuments?.length"
                    class="flex gap-3"
                  >
                    <a
                      v-for="document in deal?.mortgageDocuments"
                      :key="document.id"
                      :href="document.url"
                      class="mr-3 text-blue-600 hover:text-blue-800"
                    >
                      <div class="flex gap-1">
                        <i-filetype class="w-4 h-4" />
                        {{ document?.title }}
                      </div>
                    </a>
                  </div>

                  <div v-else>-</div>
                </div>
              </div>

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Дата задатка
                </div>

                <div v-if="deal?.dealDate" class="space-y-1">
                  {{ $dayjs(deal?.dealDate).format("DD.MM.YYYY") }}
                </div>

                <div v-else>-</div>
              </div>

              <ECNKeyValue
                label="Служебная информация"
                :value="deal?.internalComment || '-'"
              />

              <ECNDivider dense />

              <div class="flex space-x-5">
                <div class="w-30 text-gray-400 font-medium leading-snug">
                  Размер комиссии в рублях
                </div>

                <div v-if="deal?.dealDate" class="space-y-1">
                  {{ formatCommission(deal?.commissionAmount) + " ₽" }}
                </div>

                <div v-else>-</div>
              </div>
            </div>
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
  </div>
</template>

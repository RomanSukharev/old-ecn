<script setup lang="ts">
import { getContactType } from "~/shared/helpers/getContactType";
import { formatCommission } from "~/shared/helpers/formatCommission";
import { getPropertyType } from "~/shared/helpers/getPropertyType";
import { DealStageEnum } from "~/shared/api/generated";

defineProps<{
  data: TAny;
}>();

function getStatusColor(status: DealStageEnum): string {
  switch (status) {
    case DealStageEnum.DEPOSIT_PAID:
      return "#77dced";
    case DealStageEnum.SCHEDULED_FOR_DEAL:
      return "#1192a8";
    case DealStageEnum.MFC_REGISTRATION:
      return "#fcd34d";
    case DealStageEnum.REGISTERED:
      return "#4ade80";
    default:
      return "#d1d5db";
  }
}
</script>

<template>
  <div
    class="kanban-item"
    :style="{ '--status-color': getStatusColor(data?.stage) }"
  >
    <div class="flex py-1">
      <div class="text-gray-400">сделка</div>

      <div class="kanban-item__element"></div>

      <div>{{ data.internalNumber }}</div>
    </div>

    <div class="flex py-1">
      <div class="text-gray-400">агент</div>

      <div class="kanban-item__element"></div>

      <NuxtLink
        v-if="data?.sellerAgent?.name && data?.sellerAgent?.surname"
        :to="data?.sellerAgent ? `/staff/employees/${data.sellerAgent.id}` : ''"
        :class="{
          underline: data?.sellerAgent?.name && data?.sellerAgent?.surname,
          'hover:text-blue-800':
            data?.sellerAgent?.name && data?.sellerAgent?.surname,
        }"
        target="_blank"
        @click.stop
      >
        {{ `${data.sellerAgent.name} ${data.sellerAgent.surname}` }}
      </NuxtLink>

      <span v-else>-</span>
    </div>

    <div class="flex py-1">
      <div class="text-gray-400">контакт</div>

      <div class="kanban-item__element"></div>

      <NuxtLink
        v-if="data?.buyerContact?.name && data?.buyerContact?.surname"
        :to="
          data?.buyerContact ? `/sales/contacts/${data.buyerContact.id}` : ''
        "
        :class="{
          underline: data?.buyerContact?.name && data?.buyerContact?.surname,
          'hover:text-blue-800':
            data?.buyerContact?.name && data?.buyerContact?.surname,
        }"
        target="_blank"
        @click.stop
      >
        {{ `${data.buyerContact.name} ${data.buyerContact.surname}` }}
      </NuxtLink>

      <span v-else>-</span>
    </div>

    <div class="flex py-1">
      <div class="text-gray-400">тип сделки</div>

      <div class="kanban-item__element"></div>

      <div>{{ getContactType(data?.type ? data?.type : "-") }}</div>
    </div>

    <div class="flex py-1">
      <div class="text-gray-400">задаток</div>

      <div class="kanban-item__element"></div>

      <div>{{ formatCommission(data?.commissionAmount) + " руб." }}</div>
    </div>

    <div class="py-1">
      <div class="text-gray-400">тип недвижимости</div>

      <div>
        {{ getPropertyType(data?.propertyType ? data?.propertyType : "-") }}
      </div>
    </div>

    <div class="py-1">
      <div class="text-gray-400">адрес</div>

      <div>{{ data?.address ? data?.address : "-" }}</div>
    </div>
  </div>
</template>

<style scoped>
.kanban-item {
  position: relative;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 12px;
  padding-left: 10px;
  cursor: pointer;
}

.kanban-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -1px;
  margin-top: 13px;
  height: 90%;
  width: 1px;
  background-color: var(--status-color);
}

.kanban-item__element {
  flex-grow: 1;
  border-bottom: 1px dashed #ccc;
  margin: 5px 4px 0.2rem;
}
</style>

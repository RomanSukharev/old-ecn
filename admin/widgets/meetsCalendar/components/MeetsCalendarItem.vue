<script setup lang="ts">
import type { MeetsQuery_meets_MeetConnection_nodes_Meet } from "~/shared/api/generated";

const props = defineProps<{
  items: MeetsQuery_meets_MeetConnection_nodes_Meet[];
  currentDate: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 z-40">
    <div
      v-for="item in props.items"
      :key="item.id"
      class="border rounded-xl shadow-sm p-4 bg-white relative text-left"
      @click="$emit('editItem', item.id)"
    >
      <h3
        class="flex justify-between items-center font-semibold text-base text-gray-800 mb-2"
      >
        Показ
        <i-house class="text-gray-400 h-4" />
      </h3>

      <hr class="border-t mb-2" />

      <div class="text-gray-600 mb-1">
        <span class="font-medium text-xs text-gray-800">Время и дата</span>

        <br />

        <div class="text-xs">
          {{
            new Date(item.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }},
          {{
            new Date(item.dateTime).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          }}
        </div>
      </div>

      <div class="text-gray-600 mb-1">
        <span class="font-medium text-xs text-gray-800">Агент</span>

        <br />

        <div class="text-xs">
          <NuxtLink
            v-if="item?.buyerAgent?.name && item?.buyerAgent?.surname"
            :to="
              item?.buyerAgent ? `/staff/employees/${item.buyerAgent.id}` : ''
            "
            class="hover:text-blue-800"
            target="_blank"
            @click.stop
          >
            {{ `${item.buyerAgent.name} ${item.buyerAgent.surname}` }}
          </NuxtLink>

          <span v-else>-</span>
        </div>
      </div>

      <div class="text-gray-600 mb-1">
        <span class="font-medium text-xs text-gray-800">Покупатель</span>

        <br />

        <div class="text-xs">
          <NuxtLink
            v-if="item?.buyerContact?.name && item?.buyerContact?.surname"
            :to="
              item?.buyerContact
                ? `/sales/contacts/${item.buyerContact.id}`
                : ''
            "
            class="hover:text-blue-800"
            target="_blank"
            @click.stop
          >
            {{ `${item.buyerContact.name} ${item.buyerContact.surname}` }}
          </NuxtLink>

          <span v-else>-</span>
        </div>
      </div>

      <div class="text-sm text-gray-600">
        <span class="font-medium text-xs text-gray-800">Объект</span>

        <br />

        <div class="text-xs">
          <NuxtLink
            v-if="item?.property?.id"
            :to="
              item?.buyerContact ? `/estate/properties/${item.property.id}` : ''
            "
            class="hover:text-blue-800"
            target="_blank"
            @click.stop
          >
            {{ `${item.property.title}` }}
          </NuxtLink>

          <span v-else>-</span>
        </div>
      </div>
    </div>
  </div>
</template>

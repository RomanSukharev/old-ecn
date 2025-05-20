<template>
  <NuxtLink
    v-if="layout === 'wide'"
    :to="`/stories/${data.id}`"
    class="flex flex-col space-y-3 col-span-3"
  >
    <img
      class="rounded-xl h-80 object-cover bg-gray-100"
      :src="data.cover?.url || defaultUrl"
    />

    <div class="flex flex-col space-y-2">
      <div class="font-bold text-xl">{{ data.title }}</div>

      <div class="font-medium text-base text-gray-400">
        {{ $dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") }}
      </div>
    </div>
  </NuxtLink>

  <NuxtLink
    v-else-if="layout === 'horizontal'"
    :to="`/stories/${data.id}`"
    class="grow grid grid-cols-2 gap-5 col-span-2 border border-gray-100 rounded-xl"
  >
    <img
      class="rounded-l-xl h-full object-cover bg-gray-100 shrink-0"
      :src="data.cover?.url || defaultUrl"
    />

    <div class="flex flex-col space-y-2 grow py-4">
      <div class="font-bold text-xl shrink-0 mb-4">{{ data.title }}</div>

      <div class="font-medium text-base grow">{{ data.teaser }}</div>

      <div class="font-medium text-base text-gray-400 shrink-0">
        {{ $dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") }}
      </div>
    </div>
  </NuxtLink>

  <NuxtLink
    v-else-if="layout === 'vertical'"
    :to="`/stories/${data.id}`"
    class="flex flex-col space-y-3 row-span-2"
  >
    <img
      class="rounded-xl h-[180px] object-cover bg-gray-100 shrink-0"
      :src="data.cover?.url || defaultUrl"
    />

    <div class="flex flex-col space-y-2 grow">
      <div class="font-bold text-xl grow">{{ data.title }}</div>

      <div class="font-medium text-base text-gray-400">
        {{ $dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") }}
      </div>
    </div>
  </NuxtLink>

  <NuxtLink
    v-else
    :to="`/stories/${data.id}`"
    class="grow flex flex-col space-y-3"
  >
    <img
      class="rounded-xl h-[180px] object-cover bg-gray-100 shrink-0"
      :src="data.cover?.url || defaultUrl"
    />

    <div class="flex flex-col space-y-2 grow">
      <div class="font-bold text-xl grow">{{ data.title }}</div>

      <div class="font-medium text-base text-gray-400">
        {{ $dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") }}
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Story } from "~/shared/api/generated";

defineProps<{
  data: Partial<Story>;
  layout?: "wide" | "horizontal" | "vertical";
}>();

const defaultUrl = "/img/no-image.png";
</script>

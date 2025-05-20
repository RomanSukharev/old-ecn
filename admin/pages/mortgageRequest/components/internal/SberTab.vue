<script setup lang="ts">
import { type MortgageRequestPageQuery_mortgageRequest_MortgageRequest } from "~/shared/api/generated";
// import { contactSources } from "~/widgets/contactDrawer/constants";

defineProps<{
  mortgageRequest?: MortgageRequestPageQuery_mortgageRequest_MortgageRequest;
}>();
</script>

<template>
  <div
    v-if="mortgageRequest"
    class="flex flex-col space-y-6 text-xs max-w-[800px] grow"
  >
    <ECNKeyValue label="Сумма, ₽" :value="mortgageRequest?.amount || '-'" />

    <ECNKeyValue
      label="Первоналчальный взнос"
      :value="mortgageRequest?.firstDeposit || '-'"
    />

    <ECNKeyValue label="Ставка" :value="mortgageRequest?.percentage || '-'" />

    <ECNKeyValue label="Срок" :value="mortgageRequest?.period || '-'" />

    <ECNDivider />

    <ECNKeyValue
      label="Уникальный номер"
      :value="mortgageRequest?.internalNumber || '-'"
    />

    <ECNKeyValue
      label="Дата отправки"
      :value="mortgageRequest?.sendDate || '-'"
    />

    <ECNKeyValue
      label="Дата ответа"
      :value="mortgageRequest?.responseDate || '-'"
    />

    <ECNDivider />

    <ECNKeyValue label="Срок" :value="mortgageRequest?.comment || '-'" />
  </div>
</template>

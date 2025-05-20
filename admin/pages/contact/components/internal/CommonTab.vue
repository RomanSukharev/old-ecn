<script setup lang="ts">
import { type ContactPageQuery_contact_Contact } from "~/shared/api/generated";
import { contactSources } from "~/widgets/contactDrawer/constants";

const props = defineProps<{
  contact?: ContactPageQuery_contact_Contact;
}>();

const contactSourceTitle = computed(() => {
  const contactSource = contactSources.find(
    (source) => source.id === props.contact?.source,
  );
  return contactSource ? contactSource.title : "-";
});

const agentLabel = computed(() => {
  const agentCount = props.contact?.agents?.length || 0;
  return agentCount === 1 ? "Агент" : "Агенты";
});
</script>

<template>
  <div
    v-if="contact"
    class="mt-8 flex flex-col space-y-6 text-xs overflow-auto max-h-full"
  >
    <ECNKeyValue label="Компания" :value="contact.company || '-'" />

    <ECNKeyValue label="Адрес" :value="contact.address || '-'" />

    <ECNKeyValue
      label="Паспортные данные"
      :value="`
                ${'серия ' + contact.passportNumber || '-'},
                ${'выдан ' + contact.passportIssuedBy || '-'},
                ${'дата выдачи ' + (contact.passportIssueDate ? $dayjs(contact.passportIssueDate).format('DD.MM.YYYY') : '-')},
                ${'код подразделения ' + contact.passportIssuerCode || '-'}
              `"
    />

    <ECNKeyValue
      label="Источник"
      :value="contactSourceTitle"
      :items="contactSources"
    />

    <ECNKeyValue label="Информация" :value="contact.note || '-'" />

    <div class="flex space-x-5">
      <div class="w-30 text-gray-400 font-medium leading-snug">
        {{ agentLabel }}
      </div>

      <div v-if="contact?.agents?.length">
        <span v-for="(agent, index) in contact.agents" :key="agent.id">
          <NuxtLink
            :to="`/staff/employees/${agent.id}`"
            class="text-blue-600 hover:text-blue-800 font-medium"
            target="_blank"
          >
            {{ agent.surname }} {{ agent.name }}
          </NuxtLink>

          <span v-if="index < contact.agents.length - 1" class="text-blue-600"
            >,
          </span>
        </span>
      </div>

      <div v-else>-</div>
    </div>

    <div class="flex space-x-5">
      <div class="w-30 text-gray-400 font-medium">Договоры</div>

      <div class="text-gray-900 font-medium flex space-x-3">
        <div v-if="contact.contracts?.length" class="flex gap-3">
          <a
            v-for="contract in contact.contracts"
            :key="contract.id"
            :href="contract.url"
            class="mr-3 text-blue-600 hover:text-blue-800 font-medium"
          >
            <div class="flex gap-1">
              <i-filetype class="w-4 h-4" />
              {{ contract.title }}
            </div>
          </a>
        </div>

        <div v-else>-</div>
      </div>
    </div>

    <div class="flex space-x-5">
      <div class="w-30 text-gray-400 font-medium">Документы</div>

      <div class="text-gray-900 font-medium space-x-3">
        <div v-if="contact.documents?.length" class="flex gap-3">
          <a
            v-for="document in contact.documents"
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
  </div>
</template>

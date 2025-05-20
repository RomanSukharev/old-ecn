<script setup lang="ts">
withDefaults(
  defineProps<{
    errors?: string;
    inline?: boolean;
    required?: boolean;
  }>(),
  {
    errors: undefined,
    inline: true,
    required: false,
  },
);

const additionalPhones = defineModel<string[]>("additionalPhones");
const maxAdditionalPhones = 4;

const addAdditionalPhones = (): void => {
  if (!additionalPhones.value) {
    additionalPhones.value = [""];
  } else if (additionalPhones.value.length < maxAdditionalPhones) {
    additionalPhones.value = [...additionalPhones.value, ""];
  }
};

const removeAdditionalPhones = (index: number): void => {
  if (additionalPhones.value) {
    additionalPhones.value = additionalPhones.value.filter(
      (_, i) => i !== index,
    );
  }
};

const formattedPhones = computed({
  get: () => {
    return additionalPhones.value
      ? additionalPhones.value.map((phone) =>
          phone.startsWith("8") ? phone.slice(1) : phone,
        )
      : [];
  },
  set: (newPhones: string[]) => {
    additionalPhones.value = newPhones.map((phone) => phone || "");
  },
});
</script>

<template>
  <div v-if="formattedPhones && additionalPhones && additionalPhones.length">
    <div
      v-for="(_, index) in formattedPhones"
      :key="index"
      class="flex items-center justify-between space-x-2 mb-4"
    >
      <div class="ml-32 flex flex-col space-y-0.5 grow">
        <div
          :class="{
            'border-gray-300': !errors,
            'border-red-500': errors,
          }"
        >
          <PrimeInputMask
            v-model="additionalPhones[index]"
            placeholder="+7 (___) ___-__-__"
            mask="+7 (999) 999-99-99"
            fluid
            class="grow outline-none ring-0 placeholder-gray-400"
          />
        </div>

        <div v-if="errors" class="text-red-500 text-2xs">{{ errors }}</div>
      </div>

      <div
        class="cursor-pointer p-2 rounded-md"
        @click="removeAdditionalPhones(index)"
      >
        <i-delete />
      </div>
    </div>
  </div>

  <div v-if="formattedPhones && formattedPhones.length < maxAdditionalPhones">
    <ECNButton
      small
      left-icon="i-plus"
      title="Добавить телефон"
      outline
      class="ml-32 border-none"
      @click="addAdditionalPhones()"
    />
  </div>
</template>

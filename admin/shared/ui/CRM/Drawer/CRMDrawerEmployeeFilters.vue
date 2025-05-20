<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  usePositionsQuery,
  useRolesQuery,
  type EmployeesFilterInput,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  apply: [EmployeesFilterInput];
  reset: [];
}>();

const props = defineProps<EmployeesFilterInput>();

const positionId = ref<TAny>(props.position);
const roleId = ref<TAny>(props.role);

const positionInternal = computed({
  get: () => positions.value.find((p) => p.id === positionId.value),
  set: (val) => (positionId.value = val?.id),
});
const roleInternal = computed({
  get: () => roles.value.find((p) => p.id === roleId.value),
  set: (val) => (roleId.value = val?.id),
});

const { result: positionsRaw } = usePositionsQuery();
const { result: rolesRaw } = useRolesQuery();

const positions = computed(() => positionsRaw.value?.positions.nodes ?? []);
const roles = computed(() => rolesRaw.value?.roles.nodes ?? []);

function onApply(): void {
  emit("apply", {
    position: positionId?.value,
    role: roleId?.value,
  });
  emit("close");
}

function onReset(): void {
  positionId.value = undefined;
  roleId.value = undefined;
  emit("reset");
}
</script>

<template>
  <ECNDrawer
    title="Фильтр"
    subtitle="Примените нужные элементы фильтрации"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col">
      <div class="p-10 grow overflow-auto">
        <ECNFormSelect
          v-model="positionInternal"
          :items="positions"
          class="mb-4"
          inline
          required
          label="Должность"
          placeholder="Не выбрано"
        />

        <ECNFormSelect
          v-model="roleInternal"
          :items="roles"
          class="mb-4"
          inline
          required
          label="Роль"
          placeholder="Не выбрано"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        class="border-transparent text-blue-500 mr-auto"
        outline
        @click="onReset"
        >Очистить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onApply">Применить</ECNButton>
    </template>
  </ECNDrawer>
</template>

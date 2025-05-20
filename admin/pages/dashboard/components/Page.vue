<script setup lang="ts">
import { usePage } from "../composables/usePage";
import CounterCard from "./internal/CounterCard.vue";

const {
  loading,
  properties,
  complexes,
  villages,
  developers,
  employees,
  roles,
} = usePage();
</script>

<template>
  <div class="px-6 py-7 flex flex-col">
    <ECNPageTitle class="mb-4" title="Рабочий стол" />

    <div class="grid grid-cols-4 gap-4 mb-4">
      <CounterCard
        to="/estate/properties"
        :loading="loading"
        :value="properties"
        title="Объекты"
      />

      <CounterCard
        to="/estate/complexes"
        :loading="loading"
        :value="complexes"
        title="Жилые комплексы"
      />

      <CounterCard
        to="/estate/villages"
        :loading="loading"
        :value="villages"
        title="Коттеджные посёлки"
      />

      <CounterCard
        to="/estate/developers"
        :loading="loading"
        :value="developers"
        title="Застройщики"
      />

      <CounterCard
        to="/staff/employees"
        :loading="loading"
        :value="employees"
        title="Сотрудники"
      />

      <CounterCard
        to="/staff/roles"
        :loading="loading"
        :value="roles"
        title="Роли"
      />
    </div>
  </div>
</template>

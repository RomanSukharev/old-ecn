<script lang="ts" setup>
import { useLogoutMutation } from "@/shared/api/generated";

const me = useState<TAny>("me");

const router = useRouter();

async function onLogout(): Promise<void> {
  try {
    const { mutate } = useLogoutMutation();
    await mutate();
  } catch (err) {
    console.log("Не удалось выйти из системы");
  }
  localStorage.removeItem("token");
  router.replace("/login");
}
</script>

<template>
  <div class="flex flex-col border-r border-gray-200">
    <div class="px-6 py-7 border-b border-gray-200 shrink-0">
      <i-logo />
    </div>

    <div class="grow overflow-auto">
      <ECNMenuItem title="Рабочий стол" to="/" />

      <ECNMenuItem title="Недвижимость" to="/estate">
        <ECNMenuSubitem title="База объектов" to="/estate/properties" />

        <ECNMenuSubitem title="Жилые комплексы" to="/estate/complexes" />

        <ECNMenuSubitem title="Новостройки" to="/estate/complexHouses" />

        <ECNMenuSubitem title="Коттеджные посёлки" to="/estate/villages" />

        <ECNMenuSubitem title="Застройщики" to="/estate/developers" />

        <ECNMenuSubitem title="Подборы" to="/estate/suggestions" />
      </ECNMenuItem>

      <ECNMenuItem title="Воронка продаж" to="/sales">
        <ECNMenuSubitem title="Лиды" to="/sales/leads" />

        <ECNMenuSubitem title="Контакты" to="/sales/contacts" />

        <ECNMenuSubitem title="Сделки" to="/sales/deals" />

        <ECNMenuSubitem title="Задачи" to="/sales/tasks" />

        <ECNMenuSubitem title="Встречи/Показы" to="/sales/meets" />

        <ECNMenuSubitem
          title="Ипотечные заявки"
          to="/sales/mortgage-requests"
        />

        <ECNMenuSubitem title="Банки" to="/sales/banks" />
      </ECNMenuItem>

      <ECNMenuItem title="Контент" to="/content">
        <ECNMenuSubitem title="База знаний" to="/content/articles" />

        <ECNMenuSubitem title="Новости" to="/content/stories" />

        <ECNMenuSubitem title="Отзывы" to="/content/reviews" />

        <ECNMenuSubitem title="Вакансии" to="/content/vacancies" />

        <ECNMenuSubitem title="Страницы" to="/content/pages" />
      </ECNMenuItem>

      <ECNMenuItem title="Персонал" to="/staff">
        <ECNMenuSubitem title="Сотрудники" to="/staff/employees" />

        <ECNMenuSubitem title="Роли и полномочия" to="/staff/roles" />
      </ECNMenuItem>

      <ECNMenuItem title="Система" to="/system">
        <ECNMenuSubitem title="Журнал действий" to="/system/logs" />

        <ECNMenuSubitem title="Параметры" to="/system/options" />

        <ECNMenuSubitem title="Справочники" to="/system/dictionaries" />
      </ECNMenuItem>

      <ECNMenuItem title="Календарь" to="/calendar" />

      <ECNMenuItem title="Уведомления" to="/notifications" />

      <ECNMenuItem title="Чат" to="/chat" />
    </div>

    <div class="shrink-0 px-4 py-3 flex space-x-1.5 items-center">
      <ECNAvatar />

      <div class="flex flex-col space-y-0.5">
        <div class="text-2xs">{{ me?.surname }} {{ me?.name }}</div>

        <div class="text-2xs text-blue-600 cursor-pointer" @click="onLogout">
          Выйти
        </div>
      </div>
    </div>
  </div>
</template>

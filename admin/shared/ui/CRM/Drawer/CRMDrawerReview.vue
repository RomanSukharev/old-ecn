<!-- eslint-disable vue/html-self-closing -->
<script lang="ts" setup>
import {
  useSaveReviewMutation,
  useDeleteReviewMutation,
  useReviewQuery,
  ReviewStatusEnum,
  useEmployeesQuery,
} from "@/shared/api/generated";

const emit = defineEmits<{
  close: [];
  save: [];
  delete: [];
}>();

const props = withDefaults(
  defineProps<{
    reviewId?: string;
  }>(),
  {
    reviewId: undefined,
  },
);

const reviewStatus = [
  {
    id: ReviewStatusEnum.NEW,
    title: "Новый",
  },
  {
    id: ReviewStatusEnum.APPROVED,
    title: "Подтверждён",
  },
  {
    id: ReviewStatusEnum.DECLINED,
    title: "Отклонён",
  },
];

const { result: employeesRaw } = useEmployeesQuery();
const employees = computed(
  () =>
    employeesRaw.value?.employees.nodes.map((e) => ({
      id: e.id,
      title: `${e.name} ${e.surname}`,
    })) ?? [],
);

const review = reactive<{
  id?: string;
  text: string;
  authorName: string;
  authorPhone: string;
  status: ReviewStatusEnum;
  employee?: { id: string; title: string };
}>({
  id: undefined,
  text: "",
  authorName: "",
  authorPhone: "",
  status: ReviewStatusEnum.NEW,
  employee: undefined,
});

const internalStatus = ref<{ id: ReviewStatusEnum; title: string }>({
  id: ReviewStatusEnum.NEW,
  title: "Новый",
});
watch(internalStatus, (value) => {
  review.status = value?.id ?? ReviewStatusEnum.NEW;
});

if (props.reviewId) {
  const { onResult } = useReviewQuery({
    id: props.reviewId,
  });

  onResult((result) => {
    review.id = result.data.review.id;
    review.text = result.data.review.text;
    review.authorName = result.data.review.authorName;
    review.authorPhone = result.data.review.authorPhone;
    review.status = result.data.review.status;
    if (result.data.review.employee) {
      review.employee = {
        id: result.data.review.employee.id,
        title: `${result.data.review.employee.name} ${result.data.review.employee.surname}`,
      };
    }

    nextTick(() => {
      if (review.status) {
        internalStatus.value = {
          id: review.status,
          title: reviewStatus.find((i) => i.id === review.status)?.title ?? "-",
        };
      }
    });
  });
}

const drawerTitle = computed(() =>
  props.reviewId ? "Редактирование отзыва" : "Создание отзыва",
);

const saveButtonTitle = computed(() =>
  props.reviewId ? "Сохранить" : "Создать",
);

async function onSave(): Promise<void> {
  if (props.reviewId) {
    try {
      const { mutate } = useSaveReviewMutation();
      await mutate({
        input: {
          id: props.reviewId,
          text: review.text,
          authorName: review.authorName,
          authorPhone: review.authorPhone,
          status: review.status,
          employeeID: review.employee?.id || "",
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось обновить отзыв.");
    }
  } else {
    try {
      const { mutate } = useSaveReviewMutation();
      await mutate({
        input: {
          text: review.text,
          authorName: review.authorName,
          authorPhone: review.authorPhone,
          status: review.status,
          employeeID: review.employee?.id || "",
        },
      });
      emit("save");
      emit("close");
    } catch (err) {
      alert("Не удалось создать отзыв.");
    }
  }
}

async function onDeleteReview(): Promise<void> {
  if (confirm("Удалить отзыв?")) {
    if (props.reviewId) {
      try {
        const { mutate } = useDeleteReviewMutation();
        await mutate({
          id: props.reviewId,
        });
        emit("delete");
        emit("close");
      } catch (err) {
        alert("Не удалось удалить отзыв.");
      }
    }
  }
}
</script>

<template>
  <ECNDrawer
    :title="drawerTitle"
    subtitle="Заполните нужные поля"
    @close="$emit('close')"
  >
    <div class="h-full flex flex-col overflow-auto">
      <div class="px-10 pt-10 shrink-0">
        <ECNFormSelect
          v-model="review.employee"
          class="mb-4"
          :items="employees"
          inline
          required
          label="Сотрудник"
          placeholder="Выберите значение"
        />

        <ECNFormInput
          v-model="review.authorName"
          class="mb-4"
          inline
          required
          label="Имя автора"
          placeholder="Укажите имя автора отзыва"
        />

        <ECNFormInput
          v-model="review.authorPhone"
          class="mb-4"
          inline
          required
          label="Телефон автора"
          placeholder="Укажите телефон автора отзыва"
        />

        <ECNFormTextarea
          v-model="review.text"
          class="mb-4"
          inline
          required
          label="Текст отзыва"
          placeholder="Укажите текст отзыва"
        />

        <ECNFormSelect
          v-model="internalStatus"
          :items="reviewStatus"
          inline
          required
          label="Статус отзыва"
          placeholder="Выберите значение"
        />
      </div>
    </div>

    <template #actions>
      <ECNButton
        v-if="reviewId"
        class="border-transparent text-red-500 mr-auto"
        outline
        @click="onDeleteReview"
        >Удалить</ECNButton
      >

      <ECNButton outline @click="$emit('close')">Отмена</ECNButton>

      <ECNButton @click="onSave">{{ saveButtonTitle }}</ECNButton>
    </template>
  </ECNDrawer>
</template>

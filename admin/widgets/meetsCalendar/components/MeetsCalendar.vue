<script setup lang="ts">
import dayjs from "dayjs";
import "dayjs/locale/ru";
import type { IProps } from "../types";
import { useCalendar } from "../composables/useCalendar";
import MeetDrawer from "~/widgets/meetDrawer";
import MeetsCalendarItem from "./MeetsCalendarItem.vue";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  addMonths,
  subMonths,
} from "date-fns";

const props = defineProps<IProps>();
const search = computed(() => props.keyword);

const {
  items,
  // selectedItems,
  loading,
  refetch,
  isMeetDrawerVisible,
  editMeetId,
  onEditItem,
} = useCalendar(props.filter, search);

dayjs.locale("ru");

const selectedDate = ref(new Date());
const currentMonth = ref(new Date());

const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const days = computed(() => {
  const start = startOfWeek(startOfMonth(currentMonth.value), {
    weekStartsOn: 1,
  });
  const end = endOfWeek(endOfMonth(currentMonth.value), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
});

const isCurrentMonth = (date: Date) => {
  return date.getMonth() === currentMonth.value.getMonth();
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isFirstDayOfMonth = (date: Date) => {
  return date.getDate() === 1;
};

const selectDate = (date: Date) => {
  selectedDate.value = date;
};

const nextMonth = () => {
  currentMonth.value = addMonths(currentMonth.value, 1);
};

const prevMonth = () => {
  currentMonth.value = subMonths(currentMonth.value, 1);
};

const getItemsForDay = (day: Date) => {
  return items.value.filter((item) => {
    const itemDate = new Date(item.dateTime);
    return (
      itemDate.getFullYear() === day.getFullYear() &&
      itemDate.getMonth() === day.getMonth() &&
      itemDate.getDate() === day.getDate()
    );
  });
};
</script>

<template>
  <div class="flex flex-col gap-1 overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center">
      <button
        type="button"
        class="text-gray-700 rotate-180 mx-2"
        @click="prevMonth"
      >
        <i-chevron-black />
      </button>

      <span class="text-lg font-sans">
        {{ dayjs(currentMonth).format("MMMM YYYY") }}
      </span>

      <button type="button" class="text-gray-700 mx-2" @click="nextMonth">
        <i-chevron-black />
      </button>
    </div>

    <div class="grid grid-cols-7 text-center font-sans text-gray-400 mb-1">
      <div v-for="(day, index) in weekDays" :key="index">
        {{ day }}
      </div>
    </div>

    <!-- Calendar -->
    <div class="grid grid-cols-7">
      <div
        v-for="day in days"
        :key="day.getTime()"
        class="relative text-center px-1.5 py-20 border cursor-pointer transition-colors duration-150 hover:bg-slate-100"
        :class="{
          '': format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'),
          'text-gray-400 bg-gray-100': !isCurrentMonth(day),
        }"
        @click="selectDate(day)"
      >
        <!-- Today's Date -->
        <div
          v-if="isToday(day)"
          class="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
        >
          {{ format(day, "d") }}
        </div>
        <!-- First Day of the Month -->
        <div
          v-else-if="isFirstDayOfMonth(day)"
          class="absolute top-1 right-1 text-sm font-semi"
        >
          {{ dayjs(day).format("MMM D") }}
        </div>
        <!-- Other Dates -->
        <div v-else class="absolute top-1 right-1 text-sm font-semi">
          {{ format(day, "d") }}
        </div>

        <!-- Meet Calendar Items -->
        <div class="-mt-10 -mb-16">
          <MeetsCalendarItem
            :loading="loading"
            :items="getItemsForDay(day)"
            :current-date="format(day, 'yyyy-MM-dd')"
            @edit-item="onEditItem"
          />
        </div>
      </div>
    </div>
  </div>

  <MeetDrawer
    v-if="isMeetDrawerVisible"
    :id="editMeetId"
    @close="
      isMeetDrawerVisible = false;
      editMeetId = undefined;
    "
    @save="refetch"
  />
</template>

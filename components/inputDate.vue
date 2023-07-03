<template>
  <div class="flex items-center gap-4">
    <div class="flex w-20 justify-center items-center">
      <select
        v-model="year" 
        name="year"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
        <option
          v-for="y, i in 100"
          :key="i"
          :v-model="currentYear + 5 - i"
        >
          {{ currentYear + 5 - i }}
        </option>
      </select>
    </div>
    <div class="w-14">
      <select
        v-model="month"
        name="month"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
        <option
          v-for="m in 12"
          :key="m"
          :value="m"
        >
          {{ m }}
        </option>
      </select>
    </div>
    <div class="w-14">
      <select
        v-model="day"
        name="day"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
        <option
          v-for="d in totalDayOfMonth"
          :key="d"
          :value="d"
        >
          {{ d }}
        </option>
      </select>
    </div>
    <div class="w-20">
      <p>({{ weekday }})</p>
    </div>
  </div>
</template>

<script lang="ts">
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth() + 1;
  const currentDay = currentTime.getDate();

  export default {}
</script>

<script setup lang="ts">
  import { useDateStore } from "@/store/dateStore"

  const dateStore = useDateStore()

  const props = defineProps({
    name: { type: String, required: true },
    defaultYear: { type: Number, default: currentYear },
    defaultMonth: { type: Number, default: currentMonth },
    defaultDay: { type: Number, default: currentDay },
  })

  const { defaultYear, defaultMonth, defaultDay } = toRefs(props)

  // console.log(name.value, defaultYear.value, defaultMonth.value, defaultDay.value)

  // if (props.defaultYear) {
  //   currentYear = props.defaultYear;
  // }
  // if (props.defaultMonth) {
  //   currentMonth = props.defaultMonth;
  // }
  // if (props.defaultDay) {
  //   currentDay = props.defaultDay;
  // }

  // TODO: account for contract end date where year is in the future
  const year = ref(defaultYear.value);
  const month = ref(defaultMonth.value);
  const day = ref(defaultDay.value);

  const totalDayOfMonth = computed(() => {
    return new Date(year.value, month.value, 0).getDate()
  });

  const weekday = computed(() => {
    const selectedDate = new Date(year.value, month.value - 1, day.value)
    const dayOfWeek = selectedDate.toDateString().substring(0, 3)
    return dayOfWeek
  });

  watch([year, month, day], () => {
    dateStore.setDate(props.name, year.value, month.value, day.value)
  })
</script>

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
          :v-model="valueYear + 5 - i"
        >
          {{ valueYear + 5 - i }}
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
  const valueYear = currentTime.getFullYear();
  const valueMonth = currentTime.getMonth() + 1;
  const valueDay = currentTime.getDate();

  export default {}
</script>

<script setup lang="ts">
  import dayName from "@/data/dayName.json"
  import { useDateStore } from "@/store/dateStore"

  const dateStore = useDateStore()

  const props = defineProps({
    name: { type: String, required: true },
    defaultYear: { type: Number, default: valueYear },
    defaultMonth: { type: Number, default: valueMonth },
    defaultDay: { type: Number, default: valueDay },
  })

  const { name, defaultYear, defaultMonth, defaultDay } = toRefs(props)

  console.log(name.value, defaultYear.value, defaultMonth.value, defaultDay.value)

  // if (props.defaultYear) {
  //   valueYear = props.defaultYear;
  // }
  // if (props.defaultMonth) {
  //   valueMonth = props.defaultMonth;
  // }
  // if (props.defaultDay) {
  //   valueDay = props.defaultDay;
  // }

  // TODO: account for contract end date where year is in the future
  const year = ref(defaultYear.value);
  const month = ref(defaultMonth.value);
  const day = ref(defaultDay.value);

  const totalDayOfMonth = computed(() => {
    return new Date(year.value, month.value, 0).getDate()
  });

  const weekday = computed(() => { // Get day of the week name. i.e. Mon, Tue etc
    const dayNumber = new Date(year.value, month.value - 1, day.value).getDay()
    return dayName[dayNumber].shortName
  });

  watch([year, month, day], () => {
    dateStore.setDate(props.name, year.value, month.value, day.value)
  })
</script>

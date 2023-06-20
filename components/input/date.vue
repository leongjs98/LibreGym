<template>
  <div class="flex items-center gap-4">
    <div class="flex w-20 justify-center items-center">
      <select
        name="year" 
        v-model="year"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
         <option v-for="y, i in 100" :v-model="currentYear - i">{{ currentYear - i }}</option>
      </select>
    </div>
    <div class="w-14">
      <select
        name="month"
        v-model="month"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
        <option v-for="m in 12" :value="m">{{ m }}</option>
      </select>
    </div>
    <div class="w-14">
      <select
        name="day"
        v-model="day"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
        <option v-for="d in totalDayOfMonth" :value="d">{{ d }}</option>
      </select>
    </div>
    <div class="w-20">
      <p>({{ weekday }})</p>
    </div>
   </div>
</template>

<script setup lang="ts">
  import dayName from "@/data/dayName.json"
  import { useDateStore } from "@/store/dateStore"

  const dateStore = useDateStore()

  const props = defineProps({
    name: { type: String, required: true },
  })

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth() + 1;
  const currentDay = currentTime.getDate();

  // TODO: account for contract end date where year is in the future
  const year = ref(currentYear);
  const month = ref(currentMonth);
  const day = ref(currentDay);

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

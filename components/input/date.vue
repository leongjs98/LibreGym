<template>
  <div class="flex items-center gap-4">
    <div class="flex w-20 justify-center items-center">
      <select
        name="inputYear" 
        v-model="inputYear"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
         <option v-for="y, i in 100" :v-model="currentYear - i">{{ currentYear - i }}</option>
      </select>
    </div>
    <div class="w-14">
      <select
        name="inputMonth"
        v-model="inputMonth"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
        <option v-for="m in 12" :value="m">{{ m }}</option>
      </select>
    </div>
    <div class="w-14">
      <select
        name="inputDate"
        v-model="inputDate"
        class="flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
      >
        <option v-for="d in inputTotalDayOfMonth" :value="d">{{ d }}</option>
      </select>
    </div>
    <div class="w-20">
      <p>({{ inputDOW }})</p>
    </div>
   </div>
</template>

<script setup lang="ts">
  import dayName from "@/data/dayName.json"

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth() + 1;
  const currentDate = currentTime.getDate();

  const inputYear = ref(currentYear);
  const inputMonth = ref(currentMonth);
  const inputDate = ref(currentDate);

  const inputTotalDayOfMonth = computed(() => {
    return new Date(inputYear.value, inputMonth.value, 0).getDate()
  });

  const inputDOW = computed(() => {
    return dayName[new Date(inputYear.value, inputMonth.value - 1, inputDate.value).getDay()].shortName
  });
</script>

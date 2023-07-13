<template>
  <div class="py-24 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <div class="container max-w-3xl mx-auto">
    <div class="flex flex-col w-full" style="cursor: auto;">
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full" style="cursor: auto;">
          <div class="mb-4 flex items-center text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Monthly Attendance</div>
          <div class="w-full container flex justify-center items-center">
            <ChartBar :data="monthlyAttendance" title="Attendance"/>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full" style="cursor: auto;">
          <div class="mb-4 flex items-center text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Daily Classes Attendance</div>
          <div class="w-full container flex justify-center items-center">
            <ChartBar :data="dailyAttendance" title="Attendance"/>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full" style="cursor: auto;">
          <div class="mb-4 flex items-center text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Classes popularity</div>
          <div class="container flex justify-center items-center">
            <ChartPie :data="classTypesJoined" title="Overall class type joined"/>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const monthlyAttendance = ref({
    'Jan': 10,
    'Feb': 20,
    'Mar': 30,
    'Apr': 35,
    'May': 38,
    'Jun': 42,
    'Jul': 48,
    'Aug': 55,
    'Sep': 48,
    'Oct': 57,
    'Nov': 70,
    'Dec': 75,
  })

  const dailyAttendance = ref({
    'Mon': 10,
    'Tue': 12,
    'Wed': 5,
    'Thu': 14,
    'Fri': 15,
    'Sat': 18,
    'Sun': 10,
  })

  const classTypesJoined = ref({
    'Gi BJJ': { color: '#41B883', value: 40 },
    'No Gi BJJ': { color: '#E46651', value: 20 },
    'Strength and Conditioning': { color: '#00D8FF', value: 80 },
  })
</script>

<style scoped>
</style>

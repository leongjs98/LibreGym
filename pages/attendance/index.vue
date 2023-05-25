<template>
  <div class="py-24 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <div class="container flex justify-center items-center">
      <ChartBar :labels="monthsArr" :data="monthlyDataArr" :jsonData="dailyAttendance" title="Monthly Attendance"/>
    </div>

    <div class="container flex justify-center items-center">
      <ChartBar :labels="daysArr" :data="dailyDataArr" :jsonData="monthlyAttendance" title="Daily Classes Attendance"/>
    </div>

    <div class="container flex justify-center items-center">
      <ChartPie :labels="daysArr" :data="dailyDataArr" :jsonData="monthlyAttendance" title="Classes attend"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  const monthsArr = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
  const monthlyDataArr = ref([10, 20, 30, 35, 38, 42, 48, 55, 48, 57, 70, 75])
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

  const daysArr = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  const dailyDataArr = ref([10, 12, 5, 14, 15, 18, 10])
  const dailyAttendance = ref({
    'Mon': 10,
    'Tue': 12,
    'Wed': 5,
    'Thu': 14,
    'Fri': 15,
    'Sat': 18,
    'Sun': 10,
  })

  console.log(monthlyAttendance)
  console.log(dailyAttendance)
</script>

<style scoped>
</style>

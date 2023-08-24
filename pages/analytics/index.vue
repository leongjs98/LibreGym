<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <div class="container max-w-3xl mx-auto">
      <div class="w-full" style="cursor: auto;">
        <div class="space-y-4 my-2 w-full">
          <div
            class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full">
            <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Total members:</div>
            <p class="text-2xl font-bold text-right">{{ getMemberDemographic.male + getMemberDemographic.female }}</p>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-4 max-w-72 w-full">
            <div class="flex items-center text-lg text-gray-900" style="cursor: auto;">Average
              members per session</div>
            <div class="space-y-4">
              <div v-for="c in avgMembersPerSession" class="grid grid-cols-2 mt-2 text-xl spacing-sm text-black">
                <p style="cursor: auto;">
                  {{ c.name }}:
                </p>
                <p class="text-2xl font-bold text-right">{{ c.value }}</p>
              </div>

            </div>
          </div>
          <div
            class="bg-white col-span-2 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
            style="cursor: auto;">
            <div class="mb-4 flex items-center text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Class
              Attendance</div>
            <div class="container flex justify-center items-center">
              <ChartBar :chartData="classAttendance" title="Class Attendance" />
            </div>
          </div>
          <div
            class="bg-white col-span-2 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
            style="cursor: auto;">
            <div class="mb-4 flex items-center text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Member
              Demographic</div>
            <div class="container flex justify-center items-center">
              <ChartPie :chartData="memberDemographic" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { data: getClassAttendance } = await useFetch('/api/attendances')
const { data: getMemberDemographic } = await useFetch('/api/attendances', {
  query: { memberDemographic: 'sex' }
})

console.log(getMemberDemographic.value.male + getMemberDemographic.value.female)

const memberDemographic = [
  {
    'name': 'female',
    'number': getMemberDemographic.value?.female,
    'color': 'rgb(253 164 175)'
  },
  {
    'name': 'male',
    'number': getMemberDemographic.value?.male,
    'color': 'rgb(56 189 248)'
  }
]

const classAttendanceArr: Object[] = []
const avgMembersPerSession: Object[] = []
for (let i = 0; i < getClassAttendance.value?.length; i++) {
  classAttendanceArr.push({
    "name": getClassAttendance.value[i].name,
    // "color": "#E46651",
    "value": getClassAttendance.value[i].number
  })

  const { data: getMembersPerSession } = await useFetch('/api/attendances', {
    query: { classId: getClassAttendance.value[i].id }
  })

  avgMembersPerSession.push({
    "name": getClassAttendance.value[i].name,
    "value": parseFloat(getMembersPerSession.value).toFixed(1)
  })
}

const classAttendance = ref(classAttendanceArr)

</script>

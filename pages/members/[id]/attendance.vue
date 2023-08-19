<template>
  <div class="py-16 max-w-4xl px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <div class="bg-white divide-y-2 w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Attendance: {{ getMember?.fullName }}
        </h2>
        <p class="text-sm text-gray-500">
          {{ getMember?.id }}
        </p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Total sessions:</div>
        <p class="text-xl font-bold text-right">{{ getAttendance?.totalSessionAttended }}</p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Avg sessions per week</div>
        <p class="text-xl font-bold text-right">{{ getAttendance?.avgAttendancePerWeek }}</p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">First attendance:</div>
        <p class="text-xl font-bold text-right">{{ formatDate(getAttendance?.firstSessDate) }}</p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Last attendance:</div>
        <p class="text-xl font-bold text-right">{{ formatDate(getAttendance?.lastSessDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const id = useRoute().params.id

const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

const { data: getMember, error: getMemberErr } = await useFetch(`/api/members/${id}`)

if (getMemberErr.value) {
  triggerToast({
    type: 'error',
    title: "Can't get the member's info",
    msg: getMemberErr.value?.message,
    showToast,
    toastType,
    toastTitle,
    toastMsg,
  })
}

const { data: getAttendance, error: getAttendanceErr } = await useFetch(`/api/members/attendance/${id}`)

if (!getMemberErr.value) {
  if (getAttendanceErr.value) {
    triggerToast({
      type: 'error',
      title: 'Something went wrong with the db',
      msg: getAttendanceErr.value?.message,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  }
}
</script>

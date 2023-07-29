<template>
  <div class="py-16 max-w-4xl px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <StickyAlert name="error" :title="errorAlert.title" :message="errorAlert.message" :color="errorAlert.color" />
    <div class="bg-white divide-y-2 w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Attendance: {{ getMember.fullName }}
        </h2>
        <p class="text-sm text-gray-500">
          {{ getMember.id }}
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
        <p class="text-xl font-bold text-right">{{ getAttendance?.avgAttendancePerWeek.toFixed(2) }}</p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">First attendance:</div>
        <p class="text-xl font-bold text-right">{{ formatDate(new Date(getAttendance?.firstSessDate)) }}</p>
      </div>
      <div
        class="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-full">
        <div class="text-lg text-gray-900 dark:text-gray-100" style="cursor: auto;">Last attendance:</div>
        <p class="text-xl font-bold text-right">{{ formatDate(new Date(getAttendance?.lastSessDate)) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateStore } from "@/store/dateStore"
import { useAlertStore } from "@/store/alertStore"
import { storeToRefs } from "pinia";

const dateStore = useDateStore()
const alertStore = useAlertStore()

const id = useRoute().params.id

const errorAlert = ref({
  show: false,
  title: '',
  message: '',
  color: 'red'
})

const { data: getMember, error: getMemberErr } = await useFetch(`/api/members/${id}`, {
  pick: ['fullName', 'id']
})

if (getMemberErr.value) {
  errorAlert.value.title = getMemberErr.value.name
  errorAlert.value.message = 'Failed to retrieve data' + getMemberErr.value.message
  alertStore.setAlert("error", true)
}

const { data: getAttendance, error: getAttendanceErr } = await useFetch(`/api/members/attendance/${id}`)

if (getAttendanceErr.value) {
  errorAlert.value.title = getAttendanceErr.value.name
  errorAlert.value.message = 'Failed to retrieve data' + getAttendanceErr.value.message
  alertStore.setAlert("error", true)
}
</script>

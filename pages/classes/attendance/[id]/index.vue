<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <StickyAlert name="success" :title="successAlert.title" :message="successAlert.message" :color="successAlert.color" />
    <StickyAlert name="error" :title="errorAlert.title" :message="errorAlert.message" :color="errorAlert.color" />
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Attendance: {{ getClass?.name }}
        </h2>
        <p class="text-sm text-gray-500">
          {{ getClass?.description }}
        </p>
      </div>
      <div>
        <div class="flex flex-col items-center space-y-5 p-4 border-b">
          <label for="classDates" class="block mb-2 font-medium text-gray-900 dark:text-white">Select class date</label>
          <select v-model="classDates" name="classDates" id="classDates" class="bg-gray-50 border border-gray-300 text-lg text-gray-900 text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/2 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option
              v-for="(d, i) in datesFromStartToNow"
              :key="i"
              :value="d.toLocaleString('en', { month: 'numeric', day: 'numeric', year: 'numeric' })"
            >
              {{ d.toLocaleString('en', { weekday: 'short' }) }}, {{ d.getDate() }} {{ d.toLocaleString('default', { month: 'long' }) }} {{ d.getFullYear() }}
            </option>
          </select>
          <div class="flex flex-col bg-white shadow-lg rounded space-y-4 md:w-1/2 w-full p-5">
            <div class="flex items-center">   
              <label for="simple-search" class="sr-only">Search and add member</label>
              <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search and add member">
              </div>
            </div>
            <div class="flex justify-end odd:bg-gray-50 font-semibold text-gray-800 p-3 rounded-md">
              <button class="flex items-center w-fit p-1 border-2 border-gray-500 rounded hover:bg-gray-100">
                <IconAddRounded /> 
              </button>
            </div>
            <div class="max-h-96 overflow-scroll">
              <div class="odd:bg-gray-50 flex gap-3 items-center font-semibold text-gray-800 p-3 hover:bg-gray-100 rounded-md">
                <div class="w-full flex justify-between items-end">
                  <div>
                    <div>
                      <span>1.</span> Rebecca Burke
                    </div>
                    <div class="text-gray-400 text-sm font-normal">
                      +1(227)-691-8675
                    </div>
                  </div>
                  <button class="flex items-center justify-center w-6 h-6 p-1/2 border-2 text-rose-400 border-rose-400 rounded hover:bg-rose-100">
                    <IconIonMinusRound />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAlertStore } from '@/store/alertStore';

  const classId = useRoute().params.id
  const alertStore = useAlertStore()

  const successAlert = ref({
    show: false,
    title: '',
    message: '',
    color: 'green'
  })

  const errorAlert = ref({
    show: false,
    title: '',
    message: '',
    color: 'red'
  })

  const { data: getClass, error: getClassError } = await useFetch(`/api/classes/${classId}`)

  if (getClassError.value) {
    errorAlert.value.title = getClassError.value?.name
    errorAlert.value.message = getClassError.value?.message
    alertStore.setAlert("error", true)
  }

  const { data: getAttendance, error: getAttendanceError } = await useFetch('/api/attendances')

  if (getAttendanceError.value) {
    errorAlert.value.title = getAttendanceError.value?.name
    errorAlert.value.message = getAttendanceError.value?.message
    alertStore.setAlert("error", true)
  }

  const datesFromStartToNow = getDatesFromRecentToStart(getClass.value?.startDate, getClass.value?.intervalDays)
  const classDates = ref(datesFromStartToNow[0].toLocaleString('en', { month: 'numeric', day: 'numeric', year: 'numeric' }))

  function getDatesFromRecentToStart(startDate: Date, intervalDays: number): Date[] {
    const dates: Date[] = []
    let startDateMs = new Date(startDate).getTime()
    const currentDateMs = new Date().getTime()

    while (startDateMs <= currentDateMs) {
      dates.unshift(new Date(startDateMs))
      startDateMs = startDateMs + (intervalDays * 24 * 60 * 60 * 1000)
    }

    return dates
  }

</script>

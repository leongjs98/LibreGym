<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <StickyAlert name="success" :title="successAlert.title" :message="successAlert.message" :color="successAlert.color" />
    <StickyAlert name="error" :title="errorAlert.title" :message="errorAlert.message" :color="errorAlert.color" />
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          {{ getSession?.name }}
        </h2>
        <p class="text-lg">
          <span class="text-md text-gray-600">Attendance on</span> {{ new Date(sessionDate).toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
        </p>
      </div>
      <div>
        <div class="flex flex-col items-center space-y-5 p-4 border-b">
          <!-- <label for="classDates" class="block mb-2 font-medium text-gray-900 dark:text-white">Select class date</label> -->
          <!-- <select v-model="sessionDate" name="classDates" id="classDates" class="bg-gray-50 border border-gray-300 text-lg text-gray-900 text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/2 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> -->
          <!--   <option -->
          <!--     v-for="(d, i) in datesFromStartToNow" -->
          <!--     :key="i" -->
          <!--     :value="d.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })" -->
          <!--   > -->
          <!--     {{ d.toLocaleString('en', { weekday: 'short' }) }}, {{ d.getDate() }} {{ d.toLocaleString('default', { month: 'long' }) }} {{ d.getFullYear() }} -->
          <!--   </option> -->
          <!-- </select> -->
          <div class="flex flex-col bg-white shadow-lg rounded space-y-4 md:w-1/2 w-full p-5">
            <div class="flex items-center">
              <label for="attendees-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="attendees-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search">
              </div>
            </div>
            <div class="flex justify-between items-center odd:bg-gray-50 font-semibold text-gray-800 p-3 rounded-md">
              <div class="flex items-center space-x-1 text-lg">
                <Icon name="material-symbols:person" size="24"/>
                <span>{{ getAttendees?.length }}</span>
              </div>
              <div class="flex space-x-2">
                <button @click="getAttendeesRefresh()" class="flex items-center w-fit p-1 border-2 border-gray-500 rounded hover:bg-gray-100">
                  <Icon name="ic:outline-refresh" size="24"/>
                </button>
                <button @click="openModal = true" class="flex items-center w-fit p-1 border-2 border-gray-500 rounded hover:bg-gray-100">
                  <IconAddRounded /> 
                </button>
              </div>
            </div>
            <ul class="max-h-96 overflow-auto">
              <li v-for="(attendee, i) in getAttendees" class="odd:bg-gray-50 flex gap-3 items-center font-semibold text-gray-800 p-3 hover:bg-gray-100 rounded-md">
                <div class="w-full flex justify-between items-end">
                  <div>
                    <div>
                      {{i+1}} {{ attendee.fullName }}
                    </div>
                    <div class="text-gray-400 text-sm font-normal">
                      {{ attendee.phoneNumber }}
                    </div>
                  </div>
                  <button @click="deleteAttendance(attendee.id)" class="flex items-center justify-center w-6 h-6 p-1/2 border-2 text-rose-400 border-rose-400 rounded hover:bg-rose-100">
                    <IconIonMinusRound />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden fixed justify-center items-center z-20 left-0 top-0 w-full h-full overflow-auto bg-slate-500/75" :style="openModal ? 'display: flex;' : ''">
      <div class="w-full md:w-2/3 max-w-2xl h-fit container flex flex-col items-center justify-center mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
        <div class="space-y-4 w-full px-4 py-5 border-b sm:px-6">
          <div class="flex justify-between w-full">
            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Add member's attedance
            </h3>
            <Icon @click="openModal = false" class="cursor-pointer" name="material-symbols:close" size="24" />
          </div>
          <div class="flex items-center">   
            <label for="non-attendees-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" id="non-attendees-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search">
            </div>
          </div>
        </div>
        <ul class="max-h-96 w-full overflow-auto divide-y-2">
          <li v-for="nonAttendees, i in getNonAttendees" class="flex gap-3 items-center font-semibold text-gray-800 px-4 sm:px-6 py-5 rounded-md">
            <div class="w-full flex justify-between">
              <div>
                <div>
                  {{ i+1 }} {{ nonAttendees.fullName }}
                </div>
                <div class="text-gray-400 text-sm font-normal">
                  {{ nonAttendees.phoneNumber }}
                </div>
              </div>
              <button @click="addAttendance(nonAttendees.id)" class="flex items-center justify-center w-6 h-6 p-1/2 border-2 text-emerald-400 border-emerald-400 rounded hover:bg-emerald-100">
                <IconAddRounded />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { useAlertStore } from '@/store/alertStore';

  const sessionId = useRoute().params.sessionId
  const sessionDate = useRoute().params.date
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

  const openModal = ref(false)

  const { data: getSession, error: getSessionError } = await useFetch(`/api/sessions/${sessionId}`)

  if (getSessionError.value) {
    errorAlert.value.title = getSessionError.value?.name
    errorAlert.value.message = getSessionError.value?.message
    alertStore.setAlert("error", true)
  }

  // const datesFromStartToNow = getDatesFromRecentToStart(getSession.value?.startDate, getSession.value?.intervalDays)
  // 'en-CA' returns YYYY-mm-dd
  // const sessionDate = ref(datesFromStartToNow[0].toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }))

  const { data: getAttendees, error: getAttendeesError, refresh: getAttendeesRefresh } = await useFetch(`/api/members`, {
    query: { sessionId, sessionDate }
  })

  const { data: getNonAttendees, error: getNonAttendeesError, refresh: getNonAttendeesRefresh } = await useFetch(`/api/members`, {
    query: { sessionId, sessionDate, exclude: true }
  })

  // function getDatesFromRecentToStart(startDate: Date, intervalDays: number): Date[] {
  //   const dates: Date[] = []
  //   let startDateMs = new Date(startDate).getTime()
  //   const currentDateMs = new Date().getTime()
  //
  //   while (startDateMs <= currentDateMs) {
  //     dates.unshift(new Date(startDateMs))
  //     startDateMs = startDateMs + (intervalDays * 24 * 60 * 60 * 1000)
  //   }
  //
  //   return dates
  // }

  async function addAttendance(attendeeId: string) {

    const { data: addAttedanceData, error: addAttedanceError } = await useFetch('/api/attendances', {
      method: "post",
      body: {
        attendeeId,
        sessionId,
        sessionDate
      }
    })

    if (addAttedanceData.value) {
      getAttendeesRefresh()
      getNonAttendeesRefresh()
    }

  }

  async function deleteAttendance(attendeeId: string) {

    const { data: singleAttendanceId } = await useFetch(`/api/attendances/`, {
      query: { sessionId, sessionDate, attendeeId }
    })

    if (singleAttendanceId.value) {
      const { data: deleteAttendance, error: deleteAttendanceError } = await useFetch(`/api/attendances/${singleAttendanceId.value}`, {
        method: "delete",
      })
      if (deleteAttendance.value) {
        getAttendeesRefresh()
        getNonAttendeesRefresh()
      } else if (deleteAttendanceError.value) {
        errorAlert.value.title = deleteAttendanceError.value?.name
        errorAlert.value.message = deleteAttendanceError.value?.message
        alertStore.setAlert("error", true)
      }
    }
  }

</script>

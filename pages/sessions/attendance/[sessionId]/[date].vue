<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          {{ getSession?.name }}
        </h2>
        <p class="text-lg">
          <span class="text-md text-gray-600">Attendance on </span>
          {{ new Date(sessionDate).toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }) }},
          {{ new Date(getSession?.startTime).toLocaleString('en-CA', { hour: '2-digit', minute: '2-digit' }) }}
          to
          {{ new Date(getSession?.endTime).toLocaleString('en-CA', { hour: '2-digit', minute: '2-digit' }) }}
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
            <div class="space-y-5">
              <label for="attendees-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input v-model="searchQueryAttend" type="text" id="attendees-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search">
              </div>
              <div class="flex gap-4 items-center text-lg">
                <span>
                  <Icon name="material-symbols:person" size="24" />:
                </span>
                {{ attendeesNumber }} out of {{ getMembers?.length }} attended
              </div>
            </div>
            <div class="flex justify-between items-center odd:bg-gray-50 font-semibold text-gray-800 p-3 rounded-md">
              <div class="w-full flex justify-between items-center">
                <div class="flex items-center">
                  <input v-model="attendeeFilter" value="attendees" id="attendee-filter" type="checkbox"
                    name="attendee-filter"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="attendee-filter"
                    class="w-full py-3 ml-2 font-medium text-gray-900 dark:text-gray-300">Attendees</label>
                </div>
                <div class="flex items-center">
                  <input v-model="nonAttendeeFilter" value="non-attendees" id="non-attendee-filter" type="checkbox"
                    name="non-attendee-filter"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="non-attendee-filter"
                    class="w-full py-3 ml-2 font-medium text-gray-900 dark:text-gray-300">Non-attendees</label>
                </div>
              </div>
              <!-- <div class="flex space-x-2"> -->
              <!--   <button @click="getAttendeesRefresh()" -->
              <!--     class="flex items-center w-fit p-1 border-2 border-gray-500 rounded hover:bg-gray-100"> -->
              <!--     <Icon name="ic:outline-refresh" size="24" /> -->
              <!--   </button> -->
              <!--   <button @click="openModal = true" -->
              <!--     class="flex items-center w-fit p-1 border-2 border-gray-500 rounded hover:bg-gray-100"> -->
              <!--     <IconAddRounded /> -->
              <!--   </button> -->
              <!-- </div> -->
            </div>
            <ul class="grid grid-cols-1 gap-3 max-h-96 overflow-auto">
              <li v-for="(member, i) in filteredMembers"
                class="odd:bg-gray-50 flex gap-3 items-center font-semibold text-gray-800 p-3 hover:bg-gray-100 rounded-md"
                :class="member.attended ? 'border-green-500 border-2' : ''">
                <div class="w-full flex justify-between items-center">
                  <div>
                    <div>
                      {{ i + 1 }} {{ member.fullName }} {{ member.attended ? '(present)' : '' }}
                    </div>
                    <div class="text-gray-400 text-sm font-normal">
                      {{ member.phoneNumber }}
                    </div>
                  </div>
                  <button v-if="member.attended" @click="deleteAttendance(member.id)"
                    class="flex items-center justify-center w-6 h-6 p-1/2 border-2 text-rose-400 border-rose-400 rounded hover:bg-rose-100">
                    <IconIonMinusRound />
                  </button>
                  <button v-else @click="addAttendance(member.id)"
                    class="flex items-center justify-center w-6 h-6 p-1/2 border-2 text-emerald-400 border-emerald-400 rounded hover:bg-emerald-100">
                    <IconAddRounded />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="hidden fixed justify-center items-center z-20 left-0 top-0 w-full h-full overflow-auto bg-slate-500/75" -->
    <!--   :style="openModal ? 'display: flex;' : ''"> -->
    <!--   <div -->
    <!--     class="w-full md:w-2/3 max-w-2xl h-fit container flex flex-col items-center justify-center mx-auto bg-white rounded-lg shadow dark:bg-gray-800"> -->
    <!--     <div class="space-y-4 w-full px-4 py-5 border-b sm:px-6"> -->
    <!--       <div class="flex justify-between w-full"> -->
    <!--         <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white"> -->
    <!--           Add member's attedance -->
    <!--         </h3> -->
    <!--         <Icon @click="openModal = false" class="cursor-pointer" name="material-symbols:close" size="24" /> -->
    <!--       </div> -->
    <!--       <div class="flex items-center"> -->
    <!--         <label for="non-attendees-search" class="sr-only">Search</label> -->
    <!--         <div class="relative w-full"> -->
    <!--           <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"> -->
    <!--             <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" -->
    <!--               xmlns="http://www.w3.org/2000/svg"> -->
    <!--               <path fill-rule="evenodd" -->
    <!--                 d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" -->
    <!--                 clip-rule="evenodd"></path> -->
    <!--             </svg> -->
    <!--           </div> -->
    <!--           <input v-model="searchQueryNonAttend" type="text" id="non-attendees-search" -->
    <!--             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" -->
    <!--             placeholder="Search"> -->
    <!--         </div> -->
    <!--       </div> -->
    <!--     </div> -->
    <!--     <ul class="max-h-96 w-full overflow-auto divide-y-2"> -->
    <!--       <li v-for="nonAttendees, i in filteredNonAttendees" -->
    <!--         class="flex gap-3 items-center font-semibold text-gray-800 px-4 sm:px-6 py-5 rounded-md"> -->
    <!--         <div class="w-full flex justify-between"> -->
    <!--           <div> -->
    <!--             <div> -->
    <!--               {{ i + 1 }} {{ nonAttendees.fullName }} -->
    <!--             </div> -->
    <!--             <div class="text-gray-400 text-sm font-normal"> -->
    <!--               {{ nonAttendees.phoneNumber }} -->
    <!--             </div> -->
    <!--           </div> -->
    <!--           <button @click="addAttendance(nonAttendees.id)" -->
    <!--             class="flex items-center justify-center w-6 h-6 p-1/2 border-2 text-emerald-400 border-emerald-400 rounded hover:bg-emerald-100"> -->
    <!--             <IconAddRounded /> -->
    <!--           </button> -->
    <!--         </div> -->
    <!--       </li> -->
    <!--     </ul> -->
    <!--   </div> -->
    <!-- </div> -->

  </div>
</template>

<script setup lang="ts">

const sessionId = useRoute().params.sessionId
const sessionDate = useRoute().params.date

const searchQueryAttend = ref('')
// const searchQueryNonAttend = ref('')
const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

const attendeeFilter = ref(false)
const nonAttendeeFilter = ref(false)

// const openModal = ref(false)

const { data: getSession, error: getSessionError } = await useFetch(`/api/sessions/${sessionId}`)

if (getSessionError.value) {
  triggerToast({
    type: 'error',
    title: getSessionError.value?.name,
    msg: getSessionError.value?.message,
    showToast,
    toastType,
    toastTitle,
    toastMsg,
  })
}

const { data: getMembers, error: getMembersError, refresh: getMembersRefresh } = await useFetch(`/api/members`, {
  query: { sessionId, sessionDate }
})

const attendeesNumber = ref(0)

if (getMembers.value) {
  let counter = 0
  for (let i = 0; i < getMembers.value.length; i++) {
    if(getMembers.value[i].attended)
    counter++
  }
  attendeesNumber.value = counter
}

// const { data: getAttendees, error: getAttendeesError, refresh: getAttendeesRefresh } = await useFetch(`/api/members`)

const filteredMembers = computed(() => {
  const returnMembers = []
  if (getMembers.value) {
    for (let i = 0; i < getMembers.value.length; i++) {
      const member = getMembers.value[i]
      const matchedFullName = (member.fullName.toLowerCase()).includes(searchQueryAttend.value.toLowerCase())
      const matchedBirthday = (member.birthday.toLowerCase()).includes(searchQueryAttend.value.toLowerCase())
      const matchedSex = member.sex.toLowerCase() == (searchQueryAttend.value.toLowerCase())
      const matchedBelt = (member.belt.toLowerCase()).includes(searchQueryAttend.value.toLowerCase())
      const matchedStatus = (member.status.toLowerCase()).includes(searchQueryAttend.value.toLowerCase())
      if (matchedFullName || matchedBirthday || matchedSex || matchedBelt || matchedStatus) {
        if ((attendeeFilter.value && nonAttendeeFilter.value) || (!attendeeFilter.value && !nonAttendeeFilter.value))
          returnMembers.push(member)
        else if (attendeeFilter.value && member.attended)
          returnMembers.push(member)
        else if (nonAttendeeFilter.value && !member.attended)
          returnMembers.push(member)
      }
    }

    return returnMembers
  }
  return []
})

if (getMembersError.value) {
  triggerToast({
    type: 'error',
    title: getMembersError.value?.name,
    msg: getMembersError.value?.message,
    showToast,
    toastType,
    toastTitle,
    toastMsg,
  })
}

// const { data: getNonAttendees, error: getNonAttendeesError, refresh: getNonAttendeesRefresh } = await useFetch(`/api/members`, {
//   query: { sessionId, sessionDate, exclude: true }
// })

// const filteredNonAttendees = computed(() => {
//   const returnNonAttendees = []
//   if (getNonAttendees.value) {
//     for (let i = 0; i < getNonAttendees.value.length; i++) {
//       const matchedFullName = (getNonAttendees.value[i].fullName.toLowerCase()).includes(searchQueryNonAttend.value.toLowerCase())
//       const matchedBirthday = (getNonAttendees.value[i].birthday.toLowerCase()).includes(searchQueryNonAttend.value.toLowerCase())
//       const matchedSex = getNonAttendees.value[i].sex.toLowerCase() == (searchQueryNonAttend.value.toLowerCase())
//       const matchedBelt = (getNonAttendees.value[i].belt.toLowerCase()).includes(searchQueryNonAttend.value.toLowerCase())
//       const matchedStatus = (getNonAttendees.value[i].status.toLowerCase()).includes(searchQueryNonAttend.value.toLowerCase())
//       if (matchedFullName || matchedBirthday || matchedSex || matchedBelt || matchedStatus) {
//         returnNonAttendees.push(getNonAttendees.value[i])
//       }
//     }
//     return returnNonAttendees
//   }
//   return []
// })

// if (getNonAttendeesError.value) {
//   triggerToast({
//     type: 'error',
//     title: getNonAttendeesError.value?.name,
//     msg: getNonAttendeesError.value?.message,
//     showToast,
//     toastType,
//     toastTitle,
//     toastMsg,
//   })
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
    triggerToast({
      type: 'success',
      title: 'Added attendance',
      msg: `Added attendance, ${addAttedanceData.value.id}`,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
    getMembersRefresh()
    attendeesNumber.value++
    
    // getNonAttendeesRefresh()
  } else if (addAttedanceError.value) {
    triggerToast({
      type: 'error',
      title: addAttedanceError.value?.name,
      msg: addAttedanceError.value?.message,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  }

}

async function deleteAttendance(attendeeId: string) {

  const { data: attendanceId, error: getAttendanceIdErr } = await useFetch(`/api/attendances/`, {
    query: { sessionId, sessionDate, attendeeId }
  })

  if (getAttendanceIdErr.value) {
    triggerToast({
      type: 'error',
      title: getAttendanceIdErr.value?.name,
      msg: getAttendanceIdErr.value?.message,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  }

  if (attendanceId.value) {
    const { data: deleteAttendance, error: deleteAttendanceError } = await useFetch(`/api/attendances/${attendanceId.value}`, {
      method: "delete",
    })
    if (deleteAttendance.value) {
      triggerToast({
        type: 'success',
        title: 'Removed attendance',
        msg: `Removed attendance, ${deleteAttendance.value.id}.`,
        showToast,
        toastType,
        toastTitle,
        toastMsg,
      })
      getMembersRefresh()
      attendeesNumber.value--
      // getNonAttendeesRefresh()
    } else if (deleteAttendanceError.value) {
      triggerToast({
        type: 'error',
        title: deleteAttendanceError.value?.name,
        msg: deleteAttendanceError.value?.message,
        showToast,
        toastType,
        toastTitle,
        toastMsg,
      })
    }
  }
}

</script>

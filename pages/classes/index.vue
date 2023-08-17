<template>
  <div
    class="max-w-md sm:max-w-5xl md:max-w-6xl py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <transition name="toast">
      <toast @click="showToast = false" v-if:="showToast" :type="toastType" :title="toastTitle" :message="toastMsg" />
    </transition>
    <div class="w-full space-y-4">
      <ClassLinks />
      <div v-if="noClass" class="w-full space-y-8">
        There's no class for your gym yet. Go create <NuxtLink to="/classes/create" class="underline"> new classes
        </NuxtLink>
      </div>
      <div v-else-if="noSession" class="w-full space-y-8">
        There's no sessions for your class yet. Create some <NuxtLink to="/sessions/create" class="underline">new sessions
        </NuxtLink>
      </div>
      <template v-else>
        <div class="w-full flex justify-between">
          <button class="py-1.5 px-3 border-gray-500 border-2" @click="getPrevWeek()">Previous week</button>
          <button class="py-1.5 px-3 border-gray-500 border-2" @click="getNextWeek()">Next week</button>
        </div>
        <div v-for="(date, i) in datesOfWeek" :key="i" class="md:flex justify-start">
          <div class="w-44 min-w-max flex items-center pl-3 pb-3 md:p-0 rounded text-lg font-semibold">
            {{ getDayOfWeek(date) }}, {{ getFormattedDate(date) }}
          </div>
          <div class="flex gap-4 flex-wrap">
            <template v-for="(session, j) in sessionsSortedByDOW[i]" :key="session.id">
              <div class="min-w-max relative">
                <div class="flex justify-center items-start py-3 pl-3 border border-gray-300">
                  {{ session.name }} <br>
                  {{ getTime(session.startTime) }} - {{ getTime(session.endTime) }}
                  <label @click="session.optionsVisible = !session.optionsVisible" :for="'option-' + i + '-' + j"
                    class="ml-3 hover:cursor-pointer">
                    <IconMore2Line />
                  </label>
                </div>
                <!-- <input type="checkbox" name="" class="hidden peer" :id="'option-' + i + '-' + j"> -->
                <div v-if="session.optionsVisible"
                  class="peer-checked:block absolute top-0 -right-32 z-10 w-32 p-2 rounded border border-gray-500 bg-gray-100">
                  <NuxtLink
                    :to="`/sessions/attendance/${session.id}/${date.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}`"
                    class="flex items-center gap-1">
                    <IconRoundMoreHoriz size="18px" />
                    Attendance
                  </NuxtLink>
                  <NuxtLink :to="`/sessions/edit/${session.id}`" class="flex items-center gap-1">
                    <IconEdit size="18px" />
                    Edit
                  </NuxtLink>
                  <label :for="`delete-${i}-${j}`" class="flex items-center gap-1 cursor-pointer">
                    <IconDeleteForeverSharp size="18px" />
                    Delete
                  </label>
                  <input type="checkbox" class="hidden peer" :id="`delete-${i}-${j}`">
                  <div
                    class="hidden peer-checked:flex flex-col justify-between items-center fixed top-1/2 left-1/2 w-72 h-64 -ml-36 -mt-32 rounded-lg bg-white p-8 shadow-2xl">
                    <p class="text-lg font-bold">
                      Delete this session of {{ session.name }} ({{ getTime(session.startTime) }} - {{
                        getTime(session.endTime) }} {{ getDayOfWeek(date) }}) permanently?
                    </p>

                    <div class="mt-4 flex gap-2">
                      <button @click="deleteClass(session.id)" :for="`delete-${i}-${j}`" type="button"
                        class="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                        Yes, I'm sure
                      </button>

                      <label :for="`delete-${i}-${j}`"
                        class="cursor-pointer rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                        No, go back
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">

const currentDate = new Date()
const currentDayOfWeek = currentDate.getDay()

const datesOfWeek: Ref<Date[]> = ref([])
const sessionsSortedByDOW = ref([[], [], [], [], [], [], []])  // DOW = day of week

function isArrayOnlyEmptyArrays(arr: any[]): boolean {
  return arr.every(subArray => Array.isArray(subArray) && subArray.length === 0);
}

const noClass = ref(false)
const noSession = ref(false)
const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('default title')
const toastMsg = ref('default message')

for (let i = 0; i < 7; i++) {
  const tempDOW = new Date()
  tempDOW.setDate(currentDate.getDate() + (i - currentDayOfWeek))
  datesOfWeek.value.push(tempDOW)
}

// E.g. Jul 03 2023
function getFormattedDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }
  return date.toLocaleDateString('en-US', options).replace(',', '')
}

// E.g. Mon
function getDayOfWeek(date: Date): string {
  return date.toLocaleString('en', { weekday: 'short' })
}

// E.g. 06:09 PM
function getTime(inputTime: Date | string): string {
  const time = new Date(inputTime)
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const { data: classes } = await useFetch("/api/classes")

if (classes.value && classes.value.length === 0)
  noClass.value = true

const { data: sessions, error: getError, refresh: refetchSessions } = await useFetch("/api/sessions")

if (getError.value) {
  triggerToast({
    type: 'error',
    title: 'Something went wrong with the db',
    msg: getError.value?.message,
    showToast,
    toastType,
    toastTitle,
    toastMsg,
  })
}

async function sortClasses() {
  sessionsSortedByDOW.value = [[], [], [], [], [], [], []]
  if (sessions.value) {
    for (var i = 0; i < sessions.value.length; i++) {
      const currentClass = sessions.value[i]
      sessions.value[i].optionsVisible = false
      sessionsSortedByDOW.value[currentClass.dayOfWeek].push(currentClass)
    }
  }

  if (isArrayOnlyEmptyArrays(sessionsSortedByDOW.value))
    noSession.value = true
}

async function deleteClass(sessionId: String) {
  const { data: deleteClass, error: deleteError } = await useFetch(`/api/sessions/${sessionId}`, {
    method: "delete"
  })

  if (deleteClass.value) {
    triggerToast({
      type: 'info',
      title: 'Deleted session',
      msg: `A session of ${deleteClass.value?.name} has been deleted.`,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
    await refetchSessions()
    await sortClasses()
  } else if (deleteError.value) {
    triggerToast({
      type: 'error',
      title: deleteError.value?.name,
      msg: deleteError.value?.message,
      showToast,
      toastType,
      toastTitle,
      toastMsg,
    })
  }
}

sortClasses()

function getPrevWeek() {
  for (let i = 0; i < 7; i++) {
    const tempDate = new Date()
    datesOfWeek.value[i] = new Date(tempDate.setDate(datesOfWeek.value[i].getDate() - 7))
  }
}

function getNextWeek() {
  for (let i = 0; i < 7; i++) {
    const tempDate = new Date()
    datesOfWeek.value[i] = new Date(tempDate.setDate(datesOfWeek.value[i].getDate() + 7))
  }
}

</script>

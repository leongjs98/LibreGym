<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
    <StickyAlert name="info" :title="infoAlert.title" :message="infoAlert.message" :color="infoAlert.color" />
    <StickyAlert name="error" :title="errorAlert.title" :message="errorAlert.message" :color="errorAlert.color" />
    <div>
      <div class="w-full flex justify-end">
        <NuxtLink to="/classes/create" class="flex items-center w-fit px-4 py-2 mb-8 border-2 border-gray-500 rounded">
          <Icon name="material-symbols:add-rounded" size="24"/>
          New class
        </NuxtLink>
      </div>
      <div v-for="(date, i) in datesOfThisWeek" :key="i" class="flex mb-5">
        <div class="flex flex-col justify-center rounded bg-gray-100 w-fit p-3">
          <div>
            {{ getFormattedDate(date) }}<br>
          </div>
          <div>
            {{ getDayOfWeek(date) }}
          </div>
        </div>
        <div v-for="(classToDisplay, j) in classesSortedByDOW[i]" :key="classToDisplay.id" class="flex">
          <div class="relative flex justify-center items-start py-3 pl-3 border border-gray-300">
            <div>
              <div>
                {{ classToDisplay.name }}
              </div>
              <div>
                {{ getTime(classToDisplay.startTime) }} - {{ getTime(classToDisplay.endTime) }}
              </div>
            </div>
            <label :for="'option-'+i+'-'+j" class="ml-3 hover:cursor-pointer">
              <Icon name="mingcute:more-2-line" size="24" />
            </label>
            <input type="checkbox" name="" class="hidden peer" :id="'option-'+i+'-'+j">
            <div class="hidden peer-checked:block absolute z-10 -right-20 p-2 ml-5 rounded border border-gray-500 bg-gray-100">
              <!-- <button class="flex items-center gap-1"> -->
              <!--   <Icon name="ic:round-more-horiz" size="18"/> -->
              <!--   more -->
              <!-- </button> -->
              <NuxtLink :to="`/classes/edit/${classToDisplay.id}`" class="flex items-center gap-1">
                <Icon name="material-symbols:edit" size="18"/>
                Edit
              </NuxtLink>
              <label :for="`delete-${i}-${j}`" class="flex items-center gap-1 cursor-pointer">
                <Icon name="material-symbols:delete-forever-sharp" size="18"/>
                Delete
              </label>
              <input type="checkbox" class="hidden peer" :id="`delete-${i}-${j}`">
              <div class="hidden peer-checked:block fixed top-1/2 left-1/2 w-72 h-64 -ml-36 -mt-32 rounded-lg bg-white p-8 shadow-2xl">
                <h2 class="text-lg font-bold">
                  Are you sure you want to delete {{ classToDisplay.name }} permanently?
                </h2>

                <p class="mt-2 text-sm text-gray-500">
                  Doing this will delete the class permanently, are you 100% sure it's OK?
                </p>

                <div class="mt-4 flex gap-2">
                  <button
                    @click="deleteClass(classToDisplay.id)"
                    :for="`delete-${i}-${j}`"
                    type="button"
                    class="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                  >
                    Yes, I'm sure
                  </button>

                  <label
                    :for="`delete-${i}-${j}`"
                    class="cursor-pointer rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                  >
                    No, go back
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ------------ -->

      <div class="mt-10 flex gap-10">
        <h3 class="w-28 font-semibold text-gray-900 dark:text-white">Attendance</h3>
          <div class="flex flex-col bg-white shadow-lg rounded lg:w-1/3  md:w-1/2 w-full p-5">
            <div class="odd:bg-gray-50 flex gap-3 items-center font-semibold text-gray-800 p-3 hover:bg-gray-100 rounded-md hover:cursor-pointer">
              <div class="flex flex-col">
                <div>
                  <span>1.</span> Rebecca Burke
                </div>
                <!-- <div class="text-gray-400 text-sm font-normal"> -->
                <!--   +1(227)-691-8675 -->
                <!-- </div> -->
              </div>
            </div>
              <!-- Item 2 -->
            <div class="odd:bg-gray-50 flex gap-3 items-center font-semibold text-gray-800 p-3 hover:bg-gray-100 rounded-md hover:cursor-pointer">
               <div class="flex flex-col">
                 <div>
                  <span>2.</span> Connor Bell
                 </div>
                 <!-- <div class="text-gray-400 text-sm font-normal"> -->
                 <!--   +1(579)-416-9946 -->
                 <!-- </div> -->
               </div>
            </div>
              <!-- Item 3 -->
            <div class="odd:bg-gray-50 flex gap-3 items-center font-semibold text-gray-800 p-3 hover:bg-gray-100 rounded-md hover:cursor-pointer">
               <div class="flex flex-col">
                 <div>
                   <span>3.</span> Lee Fields
                 </div>
                 <!-- <div class="text-gray-400 text-sm font-normal"> -->
                 <!--   +1(737)-996-6407 -->
                 <!-- </div> -->
               </div>
            </div>
              <!-- Item 4 -->
              <div class="odd:bg-gray-50 flex gap-3 items-center font-semibold text-gray-800 p-3 hover:bg-gray-100 rounded-md hover:cursor-pointer">
                <div class="flex flex-col">
                  <div>
                   <span>4.</span> Marie Cole
                  </div>
                  <!-- <div class="text-gray-400 text-sm font-normal"> -->
                  <!--   +1(924)-106-8494 -->
                  <!-- </div> -->
                </div>
              </div>
              <!-- Item 5 -->
              <div class="odd:bg-gray-50 flex gap-3 items-center font-semibold text-gray-800 p-3 hover:bg-gray-100 rounded-md hover:cursor-pointer">
                <div class="flex flex-col">
                  <div>
                    <span>5.</span> Penny Foster
                  </div>
                  <!-- <div class="text-gray-400 text-sm font-normal"> -->
                  <!--   +1(040)-121-3669 -->
                  <!-- </div> -->
                </div>
              </div>

              <div class="flex justify-end odd:bg-gray-50 font-semibold text-gray-800 p-3 rounded-md hover:cursor-pointer">
                <button class="flex items-center w-fit p-1 border-2 border-gray-500 rounded hover:bg-gray-100">
                  <Icon name="material-symbols:add-rounded" size="24"/>
                </button>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/store/alertStore';
const alertStore = useAlertStore()

const currentDate = new Date()
const currentDayOfWeek = currentDate.getDay()

const datesOfThisWeek: Date[] = []
const classesSortedByDOW = ref([ [], [], [], [], [], [], [] ])  // DOW = day of week

const infoAlert = ref({
  show: false,
  title: '',
  message: '',
  color: 'blue'
})

const errorAlert = ref({
  show: false,
  title: '',
  message: '',
  color: 'red'
})

for (let i=0; i<7; i++) {
  const tempDOW = new Date()
  tempDOW.setDate(currentDate.getDate() + (i - currentDayOfWeek))
  datesOfThisWeek.push(tempDOW)
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
function getTime(inputTime: Date|string): string {
  const time = new Date(inputTime)
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const { data: classes, error: getError, refresh: refetchAPI } = await useFetch("/api/classes")

if (getError.value) {
  errorAlert.value.title = getError.value?.name
  errorAlert.value.message = getError.value?.message
  alertStore.setAlert("error", true)
}

async function sortClasses() {
  classesSortedByDOW.value = [ [], [], [], [], [], [], [] ]
  for (var i = 0; i < classes.value.length; i++) {
    const currentClass = classes.value[i]
    classesSortedByDOW.value[currentClass.dayOfWeek].push(currentClass)
  }
}

async function deleteClass(classId: String) {
  const { data: deleteClass, error: deleteError } = await useFetch(`/api/classes/${classId}`, {
    method: "delete"
  })

  if (deleteClass.value) {
    infoAlert.value.title = 'Deleted member'
    infoAlert.value.message = `${deleteClass.value?.name} has been permanently deleted.`
    alertStore.setAlert("info", true)
    await refetchAPI()
    await sortClasses()
  } else if (deleteError.value) {
    errorAlert.value.title = deleteError.value?.name
    errorAlert.value.message = deleteError.value?.message
    alertStore.setAlert("error", true)
  }
}

sortClasses()
</script>

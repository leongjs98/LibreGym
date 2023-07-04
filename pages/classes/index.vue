<template>
  <div class="py-16 px-5 mx-auto justify-center items-center h-full flex flex-col gap-10">
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
        <!-- <div class="flex"> -->
        <div v-for="displayClass in classesSortedByDOW[i]" :key="displayClass.id" class="flex">
          <div class="flex justify-center items-start py-3 pl-3 border border-gray-300">
            <div>
              <div>
                {{ displayClass.name }}
              </div>
              <div>
                {{ getTime(displayClass.startTime) }} - {{ getTime(displayClass.endTime) }}
              </div>
            </div>
            <button class="ml-3">
              <Icon name="mingcute:more-2-line" size="24" />
            </button>
          </div>
          <!-- <div class="flex justify-center items-start py-3 pl-3 border border-gray-300"> -->
          <!--   <div> -->
          <!--     <div> -->
          <!--       BJJ -->
          <!--     </div> -->
          <!--     <div> -->
          <!--       18:30 - 19:30 -->
          <!--     </div> -->
          <!--   </div> -->
          <!--   <button class="ml-3"> -->
          <!--     <Icon name="mingcute:more-2-line" size="24" /> -->
          <!--   </button> -->
          <!-- </div> -->
        </div>
      </div>
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
const currentDate = new Date()
const currentDayOfWeek = currentDate.getDay()

const datesOfThisWeek: Date[] = []

for (let i=0; i<7; i++) {
  const tempDOW = new Date()
  tempDOW.setDate(currentDate.getDate() + (i - currentDayOfWeek))
  datesOfThisWeek.push(tempDOW)
}

// const startOfWeek = datesOfThisWeek[0]
// const endOfWeek = datesOfThisWeek[datesOfThisWeek.length - 1]

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

interface Class {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
  intervalDays: number;
}

const classesSortedByDOW: Array<object> = [] // DOW = day of week

for (let i = 0; i < 7; i++) {
  const { data: singleClass } = await useFetch("/api/classes", {
    query: { dayofweek: i }
  })
  classesSortedByDOW.push(singleClass.value)
}
</script>

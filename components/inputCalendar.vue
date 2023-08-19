<template>
  <div class="max-w-sm w-full shadow-lg">
    <div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
      <div class="px-4 flex items-center justify-between">
        <span tabindex="0" class="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">{{ monthYYYY
        }}</span>
        <div class="flex items-center">
          <button aria-label="calendar backward"
            class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24"
              height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
          <button aria-label="calendar forward"
            class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24"
              height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between pt-12 overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th>
                <div class="w-full flex justify-center">
                  <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                    Su
                  </p>
                </div>
              </th>
              <th>
                <div class="w-full flex justify-center">
                  <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                    Mo
                  </p>
                </div>
              </th>
              <th>
                <div class="w-full flex justify-center">
                  <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                    Tu
                  </p>
                </div>
              </th>
              <th>
                <div class="w-full flex justify-center">
                  <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                    We
                  </p>
                </div>
              </th>
              <th>
                <div class="w-full flex justify-center">
                  <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                    Th
                  </p>
                </div>
              </th>
              <th>
                <div class="w-full flex justify-center">
                  <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                    Fr
                  </p>
                </div>
              </th>
              <th>
                <div class="w-full flex justify-center">
                  <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                    Sa
                  </p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in dateArr.length">
              <td v-for="j in dateArr[i - 1].length" :class="i - 1 == 0 ? 'pt-6' : ''">
                <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                  <p class="text-base text-gray-500 dark:text-gray-100" :class=" dateArr[i - 1][j - 1].today ? 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full' : ''">
                    {{ dateArr[i - 1][j - 1].date }}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentDate = new Date()

const year = currentDate.getFullYear()
const month = currentDate.getMonth()
const monthYYYY = currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

// For comparing dates and find today in loop
currentDate.setHours(0);
currentDate.setMinutes(0);
currentDate.setSeconds(0);
currentDate.setMilliseconds(0);

const dateArr: Array<Array<{ date: number | undefined, dayOfWeek: number, today: boolean }>> = [[], [], [], [], [], []]

for (let i = 0, j = 0; i < lastDayOfMonth; i++) {
  const currentLoopDate = new Date(year, month, i + 1)

  // Pad the start of month
  if (i === 0) {
    for (let k = 0; k < currentLoopDate.getDay(); k++) {
      dateArr[0].push({
        date: undefined,
        dayOfWeek: k,
        today: false
      })
    }
  }

  if (currentLoopDate.getDay() == 0)
    j++

  dateArr[j].push({
    date: currentLoopDate.getDate(),
    dayOfWeek: currentLoopDate.getDay(),
    today: currentDate.getTime() === currentLoopDate.getTime()
  })

}

console.log(dateArr)
</script>

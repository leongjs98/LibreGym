<template>
  <div class="max-w-sm w-full shadow-lg">
    <div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
      <div class="flex items-center justify-between">
        <span class="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">
          {{ monthYYYY }}
        </span>
        <div tabindex="0"
          class="flex items-center gap-2 focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">
          <span>{{ displayState }}</span>
          <div class="w-6 h-6 flex justify-center items-center border-2 rounded"
            :class="{ 'border-gray-400': state == PaymentState.na, 'border-green-400': state == PaymentState.paid, 'border-red-400': state == PaymentState.due }">
            <button @dblclick="cycleState" type="button" class="w-4 h-4 rounded"
              :class="{ 'bg-gray-400': state == PaymentState.na, 'bg-green-400': state == PaymentState.paid, 'bg-red-400': state == PaymentState.due }"></button>
          </div>
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
              <td v-for="j in dateArr[i - 1].length" :class="(i - 1 == 0) ? 'pt-6' : ''">
                <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                  <p class="text-base text-gray-500 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center font-medium rounded-md"
                    :class="dateArr[i - 1][j - 1].attendance ? 'focus:ring-green-700 focus:bg-green-500 hover:bg-green-500 w-6 h-6 text-white bg-green-600' : ''">
                  <div
                    :class="dateArr[i - 1][j - 1].today ? 'flex justify-center item-center w-7 h-7 border-2 border-black' : ''">
                    {{ dateArr[i - 1][j - 1].date }}
                  </div>
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
interface Props {
  year: number
  month: number
}

const props = defineProps<Props>()

const date = new Date(props.year, props.month)

const year = date.getFullYear()
const month = date.getMonth()
const monthYYYY = date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

const currentDate = new Date()

// For comparing dates and find today in loop
currentDate.setHours(0, 0, 0, 0);

const id = useRoute().params.id
const { data: monthlyAttendance } = await useFetch(`/api/attendances/`, {
  query: {
    attendeeId: id,
    year: props.year,
    month: props.month
  }
})

// if 1st of X month starts at the last day of week
// pad 6 days in front
// most days in a month is 31
// total number of date = 31+6 
// each inner array takes 7 days max
// 6 inner arrays cover up to 42 days
const dateArr: Array<
  Array<{
    date: number | undefined,
    dayOfWeek: number,
    attendance: boolean,
    today: boolean,
  }>
> = [[], [], [], [], [], []]

for (let day = 0, week = 0; day < lastDayOfMonth; day++) {
  const currentLoopDate = new Date(year, month, day + 1)

  if (currentLoopDate.getDay() == 0 && day != 0)
    week++

  let attendance = false
  if (monthlyAttendance.value[day]) {
    attendance = true
  }

  dateArr[week].push({
    date: currentLoopDate.getDate(),
    dayOfWeek: currentLoopDate.getDay(),
    attendance,
    today: currentDate.getTime() === currentLoopDate.getTime()
  })
}

// Pad the start of month for UI
for (let k = dateArr[0][0].dayOfWeek - 1; k >= 0; k--) {
  dateArr[0].unshift({
    date: undefined,
    dayOfWeek: k,
    attendance: false,
    today: false
  })
}

enum PaymentState {
  paid,
  due,
  na
}

const state = ref(PaymentState.na)
const displayState = ref('N/A')

function cycleState() {
  if (state.value == PaymentState.paid) {
    state.value = PaymentState.due
    displayState.value = 'Due'
  } else if (state.value == PaymentState.due) {
    state.value = PaymentState.na
    displayState.value = 'N/A'
  } else if (state.value == PaymentState.na) {
    state.value = PaymentState.paid
    displayState.value = 'Paid'
  }
}
</script>

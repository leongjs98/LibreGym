<template>
  <div v-if="!pending" class="max-w-sm w-full shadow-lg md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
    <div class="flex justify-between">
      <div class="w-fit">
        <span class="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">
          {{ monthYYYY }}
        </span>
      </div>
    </div>
    <form v-if="memberJoinedMonth <= new Date(year, month, 1)" @submit.prevent="updatePaymentState"
      class="flex items-end flex-col gap-2">
      <div tabindex="0"
        class="w-fit flex items-center gap-2 focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">
        <select v-model="state"
          class="w-fit px-1 text-center flex-1 appearance-none border border-gray-500 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
          <option value="na">N/A</option>
          <option value="paid">Paid</option>
          <option value="due">Due</option>
        </select>
        <div class="w-6 h-6 flex justify-center items-center border-2 rounded"
          :class="{ 'border-gray-400': state == 'na', 'border-green-400': state == 'paid', 'border-red-400': state == 'due' }">
          <span type="button" class="w-4 h-4 rounded"
            :class="{ 'bg-gray-400': state == 'na', 'bg-green-400': state == 'paid', 'bg-red-400': state == 'due' }"></span>
        </div>
      </div>
      <div class="w-full h-8 flex gap-4 justify-end items-center">
        <InputPaidDate v-if="state == 'paid'" :is-required="true" @date-changed="(e) => updateDate(e)" name="paid-date"
          :default-date="paidDate" />
        <button type="submit"
          class="text-white disabled:text-blue-300 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1.5 disabled:dark:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
      </div>
    </form>
    <div v-if="memberJoinedMonth <= new Date(year, month, 1)"
      class="flex items-center justify-between pt-8 overflow-x-auto">
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
</template>

<script setup lang="ts">
interface Props {
  memberJoinedDate: Date
  year: number
  month: number
}

const props = defineProps<Props>()

// const emit = defineEmits<{
//   toast: [type: string, title: string, msg: string]
//   // (e: 'toast', type: string, title: string, msg: string): void
// }>()

const emit = defineEmits(['toast'])

const date = new Date(props.year, props.month)

const year = date.getFullYear()
const month = date.getMonth()
const monthYYYY = date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

const currentDate = new Date()

// For comparing dates and find today in loop
currentDate.setHours(0, 0, 0, 0);

const id = useRoute().params.id
const { data: monthlyAttendance, pending } = await useFetch(`/api/attendances/`, {
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

const { data: payment } = await useFetch(`/api/payment/${id}/${year}/${month}`)

const paidDate = ref(new Date())
if (payment.value?.date) {
  paidDate.value = new Date(payment.value?.date)
}

const state = ref(payment.value?.state)
if (payment.value?.state == undefined) {
  state.value = 'na'
}
const displayState = ref('')

if (state.value == 'due') {
  displayState.value = 'Due'
} else if (state.value == 'na' || !state.value) {
  state.value = 'na'
  displayState.value = 'N/A'
} else if (state.value == 'paid') {
  displayState.value = 'Paid'
}

watch(state, () => {
  if (state.value == 'due') {
    displayState.value = 'Due'
  } else if (state.value == 'na' || !state.value) {
    state.value = 'na'
    displayState.value = 'N/A'
  } else if (state.value == 'paid') {
    displayState.value = 'Paid'
  }
})

// const disableSave = ref(true)
// watch(state, (newState, oldState) => {
//   if (newState != oldState) {
//     disableSave.value = false
//   }
// })

async function updatePaymentState() {
  const { data: updatedPayment, error: updatePaymentError } = await useFetch('/api/payment', {
    method: 'POST',
    body: {
      memberId: id, year, month, state: state.value, date: paidDate.value
    }
  })

  if (updatedPayment.value) {
    emit('toast', {
      type: 'success',
      title: `Updated payment for ${monthYYYY}`,
      msg: `${monthYYYY} payment has been updated to *${displayState.value}*`,
    })
  } else if (updatePaymentError.value) {
    emit('toast', {
      type: 'error',
      title: updatePaymentError.value?.name,
      msg: updatePaymentError.value?.message,
    })
  }

}

function updateDate(e: { name: string, date: Date }) {
  if (e.name == 'paid-date')
    paidDate.value = e.date
}

const memberJoinedMonth = new Date(props.memberJoinedDate)
memberJoinedMonth.setDate(1)
</script>

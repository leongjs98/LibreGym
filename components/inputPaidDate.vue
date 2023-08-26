<template>
  <div class="flex items-center gap-4">
    <div class="w-fit text-gray-700">
      <p>({{ weekday }})</p>
    </div>
    <div class="flex w-fit justify-center items-center">
      <select v-model="year" name="year"
        class="flex-1 text-center appearance-none border disabled:border-0 border-gray-300 py-1 px-2 bg-white disabled:text-gray-500 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
        <option v-for="y, i in 100" :key="i" :v-model="currentYear + 5 - i">
          {{ currentYear + 5 - i }}
        </option>
      </select>
    </div>
    <div class="w-fit">
      <select v-model="month" name="month"
        class="flex-1 text-center appearance-none border disabled:border-0 border-gray-300 py-1 px-2 bg-white disabled:text-gray-500 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
        <option v-for="m in 12" :key="m" :value="m">
          {{ m }}
        </option>
      </select>
    </div>
    <div class="w-fit">
      <select v-model="day" name="day"
        class="flex-1 text-center appearance-none border disabled:border-0 border-gray-300 py-1 px-2 bg-white disabled:text-gray-500 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
        <option v-for="d in totalDayOfMonth" :key="d" :value="d">
          {{ d }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
const currentTime = new Date()
const currentYear = currentTime.getFullYear()

export default {}
</script>

<script setup lang="ts">

const emit = defineEmits(['dateChanged'])

const props = defineProps({
  name: { type: String, required: true },
  defaultDate: { type: Date, required: true },
  isRequired: { type: Boolean, required: true },
})

// TODO: account for contract end date where year is in the future
const year = ref(props.defaultDate.getFullYear());
const month = ref(props.defaultDate.getMonth() + 1);
const day = ref(props.defaultDate.getDate());

const totalDayOfMonth = computed(() => {
  return new Date(year.value, month.value, 0).getDate()
});

const weekday = computed(() => {
  const selectedDate = new Date(year.value, month.value - 1, day.value)
  const dayOfWeek = selectedDate.toLocaleString('en', { weekday: 'short' });
  return dayOfWeek
});

watch([year, month, day], () => {
  const yyyy = year.value
  const mm = month.value < 10 ? `0${month.value}` : month.value
  const dd = day.value < 10 ? `0${day.value}` : day.value

  emit('dateChanged', {
    name: props.name,
    date: new Date(`${yyyy}-${mm}-${dd}T00:00:00.000Z`)
  })
})
</script>

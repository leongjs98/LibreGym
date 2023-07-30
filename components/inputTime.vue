<template>
  <div class="p-3 flex space-x-3 w-fit bg-white rounded-lg shadow-xl">
    <select v-model="hours" name="hours" class="bg-transparent text-xl appearance-none outline-none">
      <option v-for="n in 23" :key="n" :value="n">
        {{ n }}
      </option>
    </select>
    <span class="text-xl">:</span>
    <select v-model="mins" name="minutes" class="bg-transparent text-xl appearance-none outline-none">
      <option value="0">00</option>
      <option value="15">15</option>
      <option value="30">30</option>
      <option value="45">45</option>
    </select>
    <!-- <select v-model="amPm" name="ampm" class="bg-transparent text-xl appearance-none outline-none"> -->
    <!--   <option value="pm"> -->
    <!--     PM -->
    <!--   </option> -->
    <!--   <option value="am"> -->
    <!--     AM -->
    <!--   </option> -->
    <!-- </select> -->
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['timeChanged'])

const props = defineProps({
  name: { type: String, required: true },
  defaultTime: { type: Date, required: true },
})

const hours = ref(props.defaultTime.getHours())
const mins = ref(props.defaultTime.getMinutes())

watch([hours, mins], () => {
  const hh = hours.value < 10 ? `0${hours.value}` : hours.value
  const mm = mins.value < 10 ? `0${mins.value}` : mins.value

  emit('timeChanged', {
    name: props.name,
    time: new Date(`2023-07-05T${hh}:${mm}:00.000Z`),
  })
})

</script>

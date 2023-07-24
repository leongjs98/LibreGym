<template>
  <div class="p-3 w-36 bg-white rounded-lg shadow-xl">
    <div class="flex">
      <select
        v-model="hours"
        name="hours"
        class="bg-transparent text-xl appearance-none outline-none"
      >
        <option
          v-for="n in 12"
          :key="n"
          :value="n"
        >
          {{ n }}
        </option>
      </select>
      <span class="text-xl mr-3">:</span>
      <select
        v-model="minutes"
        name="minutes"
        class="bg-transparent text-xl appearance-none outline-none mr-4"
      >
        <option value="0">00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
      <select
        v-model="amPm"
        name="ampm"
        class="bg-transparent text-xl appearance-none outline-none"
      >
        <option value="pm">
          PM
        </option>
        <option value="am">
          AM
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTimeStore } from "@/store/timeStore"

  const timeStore = useTimeStore()

  const props = defineProps({
    name: { type: String, required: true },
    defaultHours: { type: Number, default: 4 },
    defaultMinutes: { type: Number, default: 30 },
    defaultAmPm: { type: String, default: "am" }
  })

  const hours = ref(props.defaultHours)
  const minutes = ref(props.defaultMinutes)
  const amPm = ref(props.defaultAmPm)

  watch([hours, minutes, amPm], () => {
    timeStore.setTime(props.name, hours.value, minutes.value, amPm.value)
  })
</script>

<template>
  <div>
    <client-only placeholder="Loading...">
      <Pie :data="data" :options="options" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  title: { type: String },
  labels: { type: Array, required: true },
  data: { type: Array, required: true },
})

const data = ref({
  labels: ['Gi BJJ', 'No Gi BJJ', 'Strength and Conditioning'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: [40, 20, 80]
    }
  ]
})

const options = ref({
  responsive: true
})
</script>

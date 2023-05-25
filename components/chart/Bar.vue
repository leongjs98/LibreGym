<template>
  <div>
    <client-only placeholder="Loading...">
      <Bar :data="data" :options="options" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  title: { type: String },
  labels: { type: Array, required: true },
  data: { type: Array, required: true },
  jsonData: { type: Object, required: true },
})
console.log(props.jsonData)

const data = ref({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      label: props.title
    }
  ]
})

const options = ref({
  responsive: true
})
</script>

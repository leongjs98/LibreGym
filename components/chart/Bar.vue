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
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = defineProps({
  title: { type: String },
  data: { type: Object, required: true },
})

const labelsArr: Array<any> = [];
const dataArr: Array<any> = [];

for (let key in props.data) {
  if (props.data.hasOwnProperty(key)) {
    labelsArr.push(key)
    dataArr.push(props.data[key])
  }
}

const data = ref({
  labels: labelsArr,
  datasets: [
    {
      data: dataArr,
      label: props.title
    }
  ]
})

const options = ref({
  responsive: true
})
</script>

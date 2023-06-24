<template>
  <div>
    <client-only placeholder="Loading...">
      <Bar
        :data="data"
        :options="options"
      />
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
  title: { type: String, default: "" },
  chartData: { type: Object, required: true },
})

const labelsArr: Array<any> = [];
const dataArr: Array<any> = [];

for (const key in props.chartData) {
  if (Object.prototype.hasOwnProperty.call(props.chartData, key)) {
    labelsArr.push(key)
    dataArr.push(props.chartData[key])
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

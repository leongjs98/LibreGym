<template>
  <div class="w-full">
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
  chartData: { type: Array, required: true },
})

const labelsArr: Array<any> = [];
const dataArr: Array<any> = [];

for (let i = 0; i < props.chartData.length; i++) {
  labelsArr.push(props.chartData[i]?.name)
  dataArr.push(props.chartData[i]?.value)
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
  responsive: true,
  indexAxis: 'y'
})
</script>

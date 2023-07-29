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
  title: { type: String, default: "" },
  chartData: { type: Array, required: true },
})

const labelsArr: Array<any> = [];
const colorArr: Array<any> = [];
const dataArr: Array<any> = [];

for (let i = 0; i < props.chartData.length; i++) {
  labelsArr.push(props.chartData[i]?.name)
  colorArr.push(props.chartData[i]?.color)
  dataArr.push(props.chartData[i]?.number)
}

const data = ref({
  labels: labelsArr,
  datasets: [
    {
      backgroundColor: colorArr,
      data: dataArr,
    }
  ]
})

const options = ref({
  responsive: true
})
</script>

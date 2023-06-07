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
  data: { type: Object, required: true },
})

const labelsArr: Array<any> = [];
const colorArr: Array<any> = [];
const dataArr: Array<any> = [];

for (let key in props.data) {
  if (props.data.hasOwnProperty(key)) {
    labelsArr.push(key)
    dataArr.push(props.data[key].value)
    colorArr.push(props.data[key].color)
  }
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

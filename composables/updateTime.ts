import { Ref } from 'vue'

interface funcArgs {
  event: { name: string, time: Date };
  startTime: Ref<Date>;
  endTime: Ref<Date>;
  validTime: Ref<boolean>
}

export default function({ event, startTime, endTime, validTime }: funcArgs) {
  if (event.name == 'startTime') {
    startTime.value = new Date(event.time)
  } else if (event.name == 'endTime') {
    endTime.value = new Date(event.time)
  }

  if (startTime.value.getTime() >= endTime.value.getTime()) {
    validTime.value = false
  } else {
    validTime.value = true
  }
}

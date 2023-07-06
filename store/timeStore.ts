import { defineStore } from 'pinia'

export const useTimeStore = defineStore('timeStore', () => {

  const times: Ref<{ startTime: string; endTime: string }> = ref({
    startTime: "2023-07-05T00:00:00.000Z",
    endTime: "2023-07-05T01:00:00.000Z",
  })

  function setTime(propName: string, hours: number, minutes: number, amPm: String) {
    const TIME_IS_AM = amPm.toLowerCase() == 'am'
    const TIME_IS_PM = amPm.toLowerCase() == 'pm'

    let hh = hours
    if (TIME_IS_AM && hours == 12) {
      hh = 0
    } 
    else if (TIME_IS_PM && hours < 12) {
      hh += 12
    }
    hh = hh < 10 ? `0${hh}` : hh

    const mm = minutes < 10 ? `0${minutes}` : minutes

    // TODO: test propName and value validity
    times.value[propName] = `2023-07-05T${hh}:${mm}:00.000Z`
  }

  return { times, setTime }
});

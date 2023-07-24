export default function (dateStr: string | undefined) {
  if (dateStr === undefined) {
    return null
  }

  const date = new Date(dateStr)
  let hours = date.getHours()
  const mins = date.getMinutes()
  let am = true

  if (hours >= 12) {
    hours -= 12
    am = false
  }

  return { hours, mins, am }
}

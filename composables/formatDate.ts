// E.g. Jul 03 2023
export default function(date: string | Date | null | undefined): string {
  if (!date) {
    return ''
  }

  const dateObj = new Date(date)

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }

  return dateObj.toLocaleDateString('en-US', options).replace(',', '')
}

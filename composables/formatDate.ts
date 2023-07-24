export default function(date: Date): string {
  // E.g. Jul 03 2023
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }
  return date.toLocaleDateString('en-US', options).replace(',', '')
}

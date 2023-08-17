export default function(str: string | undefined): boolean {
  if (typeof (str) === 'string')
    return str.trim().length === 0
  else
    return false
}

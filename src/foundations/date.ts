const formatDate = (date: Date) => {
  if (!(date instanceof Date)) {
    return ''
  }
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1)
  const day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate()
  const hour = (date.getUTCHours() < 10 ? '0' : '') + date.getUTCHours()
  const min = (date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes()
  return `${year}/${month}/${day} ${hour}:${min}`
}
export { formatDate }

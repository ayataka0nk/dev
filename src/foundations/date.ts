const formatDate = (date: Date) => {
  if (!(date instanceof Date)) {
    return ''
  }
  const year = date.getFullYear()
  const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
  const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  return `${year}/${month}/${day} ${hour}:${min}`
}
export { formatDate }

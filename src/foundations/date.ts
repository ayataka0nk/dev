const formatDate = (date: Date) => {
  if (!(date instanceof Date)) {
    return ''
  }
  const str = date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  return str.slice(0, -3)
}
export { formatDate }

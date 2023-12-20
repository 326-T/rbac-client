export const decodeDate = (src: Date) => {
  const date = new Date(src)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = ('0' + date.getHours()).slice(-2)
  const min = ('0' + date.getMinutes()).slice(-2)
  const sec = ('0' + date.getSeconds()).slice(-2)
  return `${year}/${month}/${day} ${hour}:${min}:${sec}`
}

function padLeftZero(str) {
  return (`00${str}`).substr(str.length)
}
export default function formatDate(time, fmt) {
  const date = new Date(time)
  let format
  if (/(y+)/.test(fmt)) {
    format = fmt.replace(RegExp.$1, date.getFullYear())
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  Object.keys(o).forEach((key) => {
    if (new RegExp(`(${key})`).test(fmt)) {
      const str = `${o[key]}`
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  })
  return format
}

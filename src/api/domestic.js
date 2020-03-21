import service from '../util/request'
import params from '../util/config'

// 获取国内
export default function getDomestic() {
  return service.get('/ncovcity/index', { params })
}

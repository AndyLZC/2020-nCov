import service from '../util/request'
import params from '../util/config'

// 获取谣言
export default function getRumour() {
  return service.get('/rumour/index', { params })
}

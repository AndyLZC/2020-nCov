import service from '../util/request'
import params from '../util/config'

// 获取国外疫情数据
export default function getAbroad() {
  return service.get('/ncovabroad/index', { params })
}

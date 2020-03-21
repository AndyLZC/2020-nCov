import service from '../util/request'
import params from '../util/config'

// 获取新闻
export default function getNews() {
  return service.get('/ncov/index', { params })
}

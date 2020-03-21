import axios from 'axios'

const service = axios.create({
  baseURL: 'txapi',
})

export default service

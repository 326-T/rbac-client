import axios from 'axios'

export const indexMethods = () => {
  return axios.get('/rbac-service/v1/methods')
}

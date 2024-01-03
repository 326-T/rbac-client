import axios from 'axios'

export const indexAccessPrivileges = async (namespaceId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/access-privileges`)
}

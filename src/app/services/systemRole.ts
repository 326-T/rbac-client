import axios from 'axios'

export const indexSystemRoles = (namespaceId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/system-roles`)
}

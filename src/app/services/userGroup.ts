import axios from 'axios'

export const indexUserGroups = (namespaceId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/user-groups`)
}

export const insertUserGroup = (namespaceId: number, name: string) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/user-groups`, {
    name: name,
  })
}

export const updateUserGroup = (namespaceId: number, userGroupId: number, name: string) => {
  return axios.put(`/rbac-service/v1/${namespaceId}/user-groups/${userGroupId}`, {
    name: name,
  })
}

export const deleteUserGroup = (namespaceId: number, userGroupId: number) => {
  return axios.delete(`/rbac-service/v1/${namespaceId}/user-groups/${userGroupId}`)
}

import axios from 'axios'

export const indexRoles = (namespaceId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/roles`)
}

export const findRolesByUserGroupId = (namespaceId: number, userGroupId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/roles?user-group-id=${userGroupId}`)
}

export const insertRole = (namespaceId: number, name: string) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/roles`, {
    name: name,
  })
}

export const updateRole = (namespaceId: number, roleId: number, name: string) => {
  return axios.put(`/rbac-service/v1/${namespaceId}/roles/${roleId}`, {
    name: name,
  })
}

export const deleteRole = (namespaceId: number, roleId: number) => {
  return axios.delete(`/rbac-service/v1/${namespaceId}/roles/${roleId}`)
}

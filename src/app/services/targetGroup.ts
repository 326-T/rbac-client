import axios from 'axios'

export const indexTargetGroups = (namespaceId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/target-groups`)
}

export const insertTargetGroup = (namespaceId: number, name: string) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/target-groups`, {
    name: name,
  })
}

export const updateTargetGroup = (namespaceId: number, targetGroupId: number, name: string) => {
  return axios.put(`/rbac-service/v1/${namespaceId}/target-groups/${targetGroupId}`, {
    name: name,
  })
}

export const deleteTargetGroup = (namespaceId: number, targetGroupId: number) => {
  return axios.delete(`/rbac-service/v1/${namespaceId}/target-groups/${targetGroupId}`)
}

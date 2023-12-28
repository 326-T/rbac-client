import axios from 'axios'

export const indexTargets = (namespaceId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/targets`)
}

export const findTargetsByTargetGroupId = (namespaceId: number, targetGroupId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/targets?target-group-id=${targetGroupId}`)
}

export const insertTarget = (namespaceId: number, objectIdRegex: string) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/targets`, {
    objectIdRegex: objectIdRegex,
  })
}

export const updateTarget = (namespaceId: number, targetId: number, objectIdRegex: string) => {
  return axios.put(`/rbac-service/v1/${namespaceId}/targets/${targetId}`, {
    objectIdRegex: objectIdRegex,
  })
}

export const deleteTarget = (namespaceId: number, targetId: number) => {
  return axios.delete(`/rbac-service/v1/${namespaceId}/targets/${targetId}`)
}

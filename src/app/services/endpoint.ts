import axios from 'axios'

export const indexEndpoints = (namespaceId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/endpoints`)
}

export const findEndpointsByRoleId = (namespaceId: number, roleId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/endpoints?role-id=${roleId}`)
}

export const insertEndpoint = (
  namespaceId: number,
  method: string,
  pathId: number,
  targetGroupId: number,
) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/endpoints`, {
    method: method,
    pathId: pathId,
    targetGroupId: targetGroupId,
  })
}

export const deleteEndpoint = (namespaceId: number, endpointId: number) => {
  return axios.delete(`/rbac-service/v1/${namespaceId}/endpoints/${endpointId}`)
}

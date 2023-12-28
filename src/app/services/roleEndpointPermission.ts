import axios from 'axios'

export const insertRoleEndpointPermission = (
  namespaceId: number,
  roleId: number,
  endpointId: number,
) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/role-endpoint-permissions`, {
    roleId: roleId,
    endpointId: endpointId,
  })
}

export const deleteRoleEndpointPermission = (
  namespaceId: number,
  roleId: number,
  endpointId: number,
) => {
  return axios.delete(
    `/rbac-service/v1/${namespaceId}/role-endpoint-permissions?role-id=${roleId}&endpoint-id=${endpointId}`,
  )
}

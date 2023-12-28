import axios from 'axios'

export const insertUserSystemRolePermission = (
  namespaceId: number,
  systemRoleId: number,
  userId: number,
) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/user-system-role-permissions`, {
    systemRoleId: systemRoleId,
    userId: userId,
  })
}

export const deleteUserSystemRolePermission = (
  namespaceId: number,
  systemRoleId: number,
  userId: number,
) => {
  return `/rbac-service/v1/${namespaceId}/user-system-role-permissions?system-role-id=${systemRoleId}&user-id=${userId}`
}

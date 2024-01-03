import axios from 'axios'

export const insertGroupRoleAssignment = (
  namespaceId: number,
  userGroupId: number,
  roleId: number,
) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/group-role-assignments`, {
    userGroupId: userGroupId,
    roleId: roleId,
  })
}

export const deleteGroupRoleAssignment = (
  namespaceId: number,
  userGroupId: number,
  roleId: number,
) => {
  return axios.delete(
    `/rbac-service/v1/${namespaceId}/group-role-assignments?user-group-id=${userGroupId}&role-id=${roleId}`,
  )
}

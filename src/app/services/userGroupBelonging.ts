import axios from 'axios'

export const insertUserGroupBelonging = (
  namespaceId: number,
  userId: number,
  userGroupId: number,
) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/user-group-belongings`, {
    userId: userId,
    userGroupId: userGroupId,
  })
}

export const deleteUserGroupBelonging = (
  namespaceId: number,
  userId: number,
  userGroupId: number,
) => {
  return axios.delete(
    `/rbac-service/v1/${namespaceId}/user-group-belongings?user-group-id=${userGroupId}&user-id=${userId}`,
  )
}

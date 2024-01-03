import axios from 'axios'

export const indexUsers = () => {
  return axios.get('/rbac-service/v1/users')
}

export const findUsersByUserGroupId = (userGroupId: number) => {
  return axios.get(`/rbac-service/v1/users?user-group-id=${userGroupId}`)
}

export const findUsersBySystemRoleId = (systemRoleId: number) => {
  return axios.get(`/rbac-service/v1/users/system?system-role-id=${systemRoleId}`)
}

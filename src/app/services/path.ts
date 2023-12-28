import axios from 'axios'

export const indexPaths = (namespaceId: number) => {
  return axios.get(`/rbac-service/v1/${namespaceId}/paths`)
}

export const insertPath = (namespaceId: number, regex: string) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/paths`, {
    regex: regex,
  })
}

export const updatePath = (namespaceId: number, pathId: number, regex: string) => {
  return axios.put(`/rbac-service/v1/${namespaceId}/paths/${pathId}`, {
    regex: regex,
  })
}

export const deletePath = (namespaceId: number, pathId: number) => {
  return axios.delete(`/rbac-service/v1/${namespaceId}/paths/${pathId}`)
}

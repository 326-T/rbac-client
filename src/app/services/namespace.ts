import axios from 'axios'

export const indexNamespace = () => {
  return axios.get('/rbac-service/v1/namespaces')
}

export const insertNamespace = (name: string) => {
  return axios.post('/rbac-service/v1/namespaces', { name: name })
}

export const updateNamespace = (id: number, name: string) => {
  return axios.put(`/rbac-service/v1/namespaces/${id}`, {
    name: name,
  })
}

export const deleteNamespace = (id: number) => {
  return axios.delete(`/rbac-service/v1/namespaces/${id}`)
}

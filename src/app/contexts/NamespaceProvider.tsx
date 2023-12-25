'use client'
import { createContext, useEffect, useReducer } from 'react'
import { Namespace, namespaceInit } from '../types/Namespace'
import axios from 'axios'

export interface NamespaceState {
  list: Namespace[]
  selected: Namespace
}

type Actions = { type: 'SELECT'; payload: Namespace } | { type: 'SET'; payload: Namespace[] }

const namespaceStateInit: NamespaceState = {
  list: [],
  selected: namespaceInit,
}

const reducerForNamespace = (state: NamespaceState, action: Actions): NamespaceState => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        list: action.payload,
      }
    case 'SELECT':
      return {
        ...state,
        selected: action.payload,
      }
    default:
      return state
  }
}

export const NamespaceContext = createContext<{
  state: NamespaceState
  fetch: () => void
  select: (payload: Namespace) => void
  post: (name: string) => void
  deleteSelected: () => void
}>({
  state: namespaceStateInit,
  fetch: () => {},
  select: () => {},
  post: () => {},
  deleteSelected: () => {},
})

export function NamespaceProvider({ children }: { children: React.ReactNode }) {
  const savedId = localStorage.getItem('namespaceId')
  const [state, dispatch] = useReducer(reducerForNamespace, namespaceStateInit)
  const select = (payload: Namespace) => {
    localStorage.setItem('namespaceId', payload.id.toString())
    dispatch({ type: 'SELECT', payload })
  }
  const set = (payload: Namespace[]) => dispatch({ type: 'SET', payload })

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    if (savedId) {
      const savedNamespace = state.list.find((namespace) => namespace.id === Number(savedId))
      savedNamespace && select(savedNamespace)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.list, savedId])

  const fetch = async () => {
    axios.get('/rbac-service/v1/namespaces').then((res) => {
      set(res.data)
    })
  }

  const post = async (name: string) => {
    axios.post('/rbac-service/v1/namespaces', { name: name }).then(fetch)
  }

  const deleteSelected = async () => {
    axios.delete(`/rbac-service/v1/namespaces/${state.selected.id}`).then(fetch)
  }

  return (
    <NamespaceContext.Provider value={{ state, fetch, select, post, deleteSelected }}>
      {children}
    </NamespaceContext.Provider>
  )
}

import { useReducer } from 'react'

type Actions<T> =
  | { type: 'set'; value: T[] }
  | { type: 'push'; value: T }
  | { type: 'update'; id: number; value: T }
  | { type: 'delete by id'; value: number }
  | { type: 'clear' }

const listItemReducer = <T>(state: T[], action: Actions<T>) => {
  switch (action.type) {
    case 'set':
      return action.value
    case 'push':
      return [...state, action.value]
    case 'update':
      return state.map((item, i) => (i === action.id ? action.value : item))
    case 'delete by id':
      return state.filter((_, i) => i !== action.value)
    case 'clear':
      return []
    default:
      return state
  }
}

export const useListItem = <T>(initialState: T[] = []) => {
  const [state, dispatch] = useReducer(listItemReducer<T>, initialState)
  const set = (value: T[]) => dispatch({ type: 'set', value })
  const push = (value: T) => dispatch({ type: 'push', value })
  const update = (id: number, value: T) => dispatch({ type: 'update', id, value })
  const remove = (id: number) => dispatch({ type: 'delete by id', value: id })
  const clear = () => dispatch({ type: 'clear' })
  return { state, set, push, update, remove, clear }
}

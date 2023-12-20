import { useReducer } from 'react'

type Actions<T> =
  | { type: 'push'; value: T }
  | { type: 'pop' }
  | { type: 'delete by id'; value: number }
  | { type: 'clear' }

const quereReducer = <T>(state: T[], action: Actions<T>) => {
  switch (action.type) {
    case 'push':
      return [...state, action.value]
    case 'pop':
      return state.slice(1)
    case 'delete by id':
      return state.filter((_, i) => i !== action.value)
    case 'clear':
      return []
    default:
      return state
  }
}

export const useQueue = <T>(initialState: T[] = []) => {
  const [state, dispatch] = useReducer(quereReducer<T>, initialState)
  const push = (value: T) => dispatch({ type: 'push', value })
  const pop = () => {
    const last = state[0]
    dispatch({ type: 'pop' })
    return last
  }
  const remove = (id: number) => dispatch({ type: 'delete by id', value: id })
  const clear = () => dispatch({ type: 'clear' })
  return { state, push, pop, remove, clear }
}

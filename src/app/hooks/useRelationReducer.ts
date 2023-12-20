'use client'
import { useEffect, useMemo, useReducer } from 'react'

type State<T> = {
  all: T[]
  related: T[]
  pending: T[]
  removing: T[]
}

const stateInit = {
  all: [],
  related: [],
  pending: [],
  removing: [],
}

type Actions<T> =
  | { type: 'clear' }
  | { type: 'set all'; value: T[] }
  | { type: 'set related'; value: T[] }
  | { type: 'push pending'; value: T }
  | { type: 'remove pending'; value: number }
  | { type: 'push removing'; value: T }
  | { type: 'remove removing'; value: number }

const quereReducer = <T>(state: State<T>, action: Actions<T>) => {
  switch (action.type) {
    case 'clear':
      return { ...state, pending: [], removing: [] }
    case 'set all':
      return { ...state, all: action.value }
    case 'set related':
      return { ...state, related: action.value }
    case 'push pending':
      return { ...state, pending: [...state.pending, action.value] }
    case 'remove pending':
      return {
        ...state,
        pending: state.pending.filter((_, i) => i !== action.value),
      }
    case 'push removing':
      return { ...state, removing: [...state.removing, action.value] }
    case 'remove removing':
      return {
        ...state,
        removing: state.removing.filter((_, i) => i !== action.value),
      }
    default:
      return state
  }
}

export const useRelationReducer = <T>(equals: (one: T, another: T) => boolean) => {
  const [state, dispatch] = useReducer(quereReducer<T>, stateInit)
  const remaining: T[] = useMemo(
    () => state.related.filter((item) => !state.removing.find((one) => equals(one, item))),
    [state.related, state.removing],
  )
  const candidates: T[] = useMemo(
    () =>
      state.all
        .filter((item) => !state.pending.find((one) => equals(one, item)))
        .filter((item) => !remaining.find((one) => equals(one, item))),
    [state.all, state.pending, remaining],
  )

  const clear = () => dispatch({ type: 'clear' })
  const setAll = (value: T[]) => dispatch({ type: 'set all', value })
  const setRelated = (value: T[]) => dispatch({ type: 'set related', value })

  const remove = (one: T) => {
    const id: number = state.pending.findIndex((item) => equals(item, one))
    id !== -1
      ? dispatch({ type: 'remove pending', value: id })
      : dispatch({ type: 'push removing', value: one })
  }

  const add = (one: T) => {
    const id: number = state.removing.findIndex((item) => equals(item, one))
    id !== -1
      ? dispatch({ type: 'remove removing', value: id })
      : dispatch({ type: 'push pending', value: one })
  }

  return { state, remaining, candidates, clear, setAll, setRelated, remove, add }
}

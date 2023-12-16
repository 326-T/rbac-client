'use client'

import { createContext, useReducer } from 'react'

type Actions = { type: 'turn on' } | { type: 'turn off' }

const reducerForLoading = (state: boolean, action: Actions) => {
  switch (action.type) {
    case 'turn on':
      return true
    case 'turn off':
      return false
    default:
      return state
  }
}

export const LoadingContext = createContext<{
  state: boolean
  turnOn: () => void
  turnOff: () => void
}>({
  state: false,
  turnOn: () => {},
  turnOff: () => {},
})

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducerForLoading, false)

  const turnOn = () => dispatch({ type: 'turn on' })
  const turnOff = () => dispatch({ type: 'turn off' })

  return (
    <LoadingContext.Provider
      value={{
        state,
        turnOn,
        turnOff,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

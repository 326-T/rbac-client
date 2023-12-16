'use client'
import { createContext, useReducer } from 'react'

export interface ModalState {
  open: boolean
  component: React.ReactNode
}

type Actions =
  | { type: 'turn on' }
  | { type: 'turn off' }
  | { type: 'SET'; component: React.ReactNode }

const modalStateInit: ModalState = {
  open: false,
  component: null,
}

const reducerForModal = (state: ModalState, action: Actions): ModalState => {
  switch (action.type) {
    case 'turn on':
      return {
        ...state,
        open: true,
      }
    case 'turn off':
      return {
        ...state,
        open: false,
      }
    case 'SET':
      return {
        ...state,
        component: action.component,
      }
    default:
      return state
  }
}

export const ModalContext = createContext<{
  state: ModalState
  turnOn: () => void
  turnOff: () => void
  set: (component: React.ReactNode) => void
}>({
  state: modalStateInit,
  turnOn: () => {},
  turnOff: () => {},
  set: () => {},
})

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducerForModal, modalStateInit)

  const turnOn = () => dispatch({ type: 'turn on' })
  const turnOff = () => dispatch({ type: 'turn off' })
  const set = (component: React.ReactNode) => dispatch({ type: 'SET', component })

  return (
    <ModalContext.Provider
      value={{
        state,
        turnOn,
        turnOff,
        set,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

'use client'
import { createContext, useReducer } from 'react'

export interface DrawerState {
  open: boolean
  component: React.ReactNode
}

type Actions =
  | { type: 'turn on' }
  | { type: 'turn off' }
  | { type: 'SET'; component: React.ReactNode }

const drawerStateInit: DrawerState = {
  open: false,
  component: null,
}

const reducerForDrawer = (state: DrawerState, action: Actions): DrawerState => {
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

export const DrawerContext = createContext<{
  state: DrawerState
  turnOn: () => void
  turnOff: () => void
  set: (component: React.ReactNode) => void
}>({
  state: drawerStateInit,
  turnOn: () => {},
  turnOff: () => {},
  set: () => {},
})

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducerForDrawer, drawerStateInit)

  const turnOn = () => dispatch({ type: 'turn on' })
  const turnOff = () => dispatch({ type: 'turn off' })
  const set = (component: React.ReactNode) => dispatch({ type: 'SET', component })

  return (
    <DrawerContext.Provider
      value={{
        state,
        turnOn,
        turnOff,
        set,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

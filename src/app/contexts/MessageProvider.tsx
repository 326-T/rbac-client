'use client'

import { createContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { MessageContent } from '../types/MessageContent'

type Actions = { type: 'push'; payload: MessageContent } | { type: 'delete'; payload: string }

const reducerForMessages = (state: MessageContent[], action: Actions) => {
  switch (action.type) {
    case 'push':
      return [...state, action.payload]
    case 'delete':
      return state.filter((message: MessageContent) => message.id !== action.payload)

    default:
      return state
  }
}

export const MessageContext = createContext<{
  messages: MessageContent[]
  pushMessage: (message: MessageContent) => void
}>({
  messages: [],
  pushMessage: () => {},
})

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, dispatch] = useReducer(reducerForMessages, [])

  const pushMessage = (message: MessageContent) => {
    const id = uuidv4()
    dispatch({
      type: 'push',
      payload: { ...message, id: id },
    })
    const deleteTimer = setTimeout(() => {
      dispatch({
        type: 'delete',
        payload: id,
      })
    }, 10000)
    return () => {
      clearTimeout(deleteTimer)
    }
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        pushMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

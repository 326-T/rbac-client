"use client";

import { createContext, useReducer } from "react";
import { MessageContent } from "../types/MessageContent";

type Actions =
  | { type: "set"; payload: MessageContent }
  | { type: "remove"; payload: number }
  | { type: "clear" };

const reducerForMessages = (state: MessageContent[], action: Actions) => {
  switch (action.type) {
    case "set":
      return [...state, action.payload];
    case "remove":
      return state.filter(
        (message: MessageContent, index: number) => index !== action.payload
      );
    case "clear":
      return [];
    default:
      return state;
  }
};

export const MessageContext = createContext<{
  messages: MessageContent[];
  pushMessage: (message: MessageContent) => void;
}>({
  messages: [],
  pushMessage: () => {},
});

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, dispatch] = useReducer(reducerForMessages, []);

  const pushMessage = (message: MessageContent) => {
    dispatch({ type: "set", payload: message });
    setTimeout(() => {
      dispatch({ type: "remove", payload: 0 });
    }, 5000);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        pushMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

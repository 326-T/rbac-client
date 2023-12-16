"use client";
import { createContext, useReducer } from "react";
import { Namespace, namespaceInit } from "../types/Namespace";

export interface NamespaceState {
  namespace: Namespace;
}

type Actions = { type: "SET"; payload: Namespace };

const namespaceStateInit: NamespaceState = {
  namespace: namespaceInit,
};

const reducerForNamespace = (
  state: NamespaceState,
  action: Actions
): NamespaceState => {
  switch (action.type) {
    case "SET":
      return {
        namespace: action.payload,
      };
    default:
      return state;
  }
};

export const NamespaceContext = createContext<{
  state: NamespaceState;
  set: (payload: Namespace) => void;
}>({
  state: namespaceStateInit,
  set: () => {},
});

export function NamespaceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducerForNamespace, namespaceStateInit);

  const set = (payload: Namespace) => dispatch({ type: "SET", payload });

  return (
    <NamespaceContext.Provider value={{ state, set }}>
      {children}
    </NamespaceContext.Provider>
  );
}

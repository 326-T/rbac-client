"use client";
import { createContext, useReducer } from "react";

export interface ModalState {
  open: boolean;
  component: React.ReactNode;
}

type Actions = { type: "TOGGLE" } | { type: "SET"; component: React.ReactNode };

const modalStateInit: ModalState = {
  open: false,
  component: null,
};

const reducerForModal = (state: ModalState, action: Actions): ModalState => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        open: !state.open,
      };
    case "SET":
      return {
        ...state,
        component: action.component,
      };
    default:
      return state;
  }
};

export const ModalContext = createContext<{
  state: ModalState;
  toggle: () => void;
  set: (component: React.ReactNode) => void;
}>({
  state: modalStateInit,
  toggle: () => {},
  set: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducerForModal, modalStateInit);

  const toggle = () => dispatch({ type: "TOGGLE" });
  const set = (component: React.ReactNode) =>
    dispatch({ type: "SET", component });

  return (
    <ModalContext.Provider
      value={{
        state,
        toggle,
        set,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

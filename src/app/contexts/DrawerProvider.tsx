"use client";
import { createContext, useReducer } from "react";

export interface DrawerState {
  open: boolean;
  component: React.ReactNode;
}

type Actions = { type: "TOGGLE" } | { type: "SET"; component: React.ReactNode };

const drawerStateInit: DrawerState = {
  open: false,
  component: null,
};

const reducerForDrawer = (state: DrawerState, action: Actions): DrawerState => {
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

export const DrawerContext = createContext<{
  state: DrawerState;
  toggle: () => void;
  set: (component: React.ReactNode) => void;
}>({
  state: drawerStateInit,
  toggle: () => {},
  set: () => {},
});

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducerForDrawer, drawerStateInit);

  const toggle = () => dispatch({ type: "TOGGLE" });
  const set = (component: React.ReactNode) =>
    dispatch({ type: "SET", component });

  return (
    <DrawerContext.Provider
      value={{
        state,
        toggle,
        set,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

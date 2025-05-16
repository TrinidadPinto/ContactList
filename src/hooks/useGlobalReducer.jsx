import { useReducer, useContext, createContext } from "react";
import storeReducer, { initialStore, actions as storeActions } from "../store";

const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const actions = storeActions(() => store, dispatch);

  return (
    <Context.Provider value={{ store, dispatch, actions }}>
      {children}
    </Context.Provider>
  );
};

export default function useGlobalReducer() {
  return useContext(Context);
}

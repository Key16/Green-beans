import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

//stores the beans here
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    beans: [],
    // bean: "",
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

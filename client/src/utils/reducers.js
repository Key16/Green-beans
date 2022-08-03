import { useReducer } from "react";
import { UPDATE_BEANS } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_BEANS:
      console.log("state :>> ", state);
      console.log("action :>> ", action);
      return {
        beans: [...action.beans],
      };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}

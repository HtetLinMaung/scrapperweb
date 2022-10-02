import { createContext, useReducer } from "react";

export const appContext = createContext(null);

const initialState = {
  exporttype: "csv",
  exportas: "scrap_data.csv",
  loading: false,
  items: [],
  headers: [],
  url: "",
  columns: [
    {
      name: "",
      selector: "",
      attr: "",
      fillna: "",
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default function AppProvider({ children }) {
  return (
    <appContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </appContext.Provider>
  );
}

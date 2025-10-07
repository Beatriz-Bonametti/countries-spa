import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  query: { name: "", region: "", code: "" },
  status: "idle", 
  error: null,
  countries: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "FETCH_START":
      return { ...state, status: "loading", error: null };
    case "FETCH_SUCCESS":
      return { ...state, status: "success", countries: action.payload };
    case "FETCH_ERROR":
      return { ...state, status: "error", error: action.payload, countries: [] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}

import { useCallback } from "react";
import { useApp } from "../../contexts/AppContext";
import { fetchByName, fetchByRegion, fetchByCode } from "../services/restcountries";

export function useCountries() {
  const { state, dispatch } = useApp();

  const search = useCallback(async (query) => {
    dispatch({ type: "SET_QUERY", payload: query });
    dispatch({ type: "FETCH_START" });
    try {
      let data = [];
      if (query.code) data = await fetchByCode(query.code.trim());
      else if (query.name) data = await fetchByName(query.name.trim());
      else if (query.region) data = await fetchByRegion(query.region.trim());
      else throw new Error("Informe pelo menos um critério de busca.");
      dispatch({ type: "FETCH_SUCCESS", payload: Array.isArray(data) ? data : [data] });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, [dispatch]);

  return { ...state, search };
}

import { useCallback } from "react";
import { useApp } from "../../contexts/AppContext";

export function useCountries() {
  const { state, dispatch } = useApp();

  const search = useCallback(
    async (query) => {
      dispatch({ type: "SET_QUERY", payload: query });
      dispatch({ type: "FETCH_START" });

      try {
        const params = new URLSearchParams();

        if (query.name) params.append("name", query.name.trim());
        if (query.region) params.append("region", query.region.trim());
        if (query.code) params.append("code", query.code.trim());

        const response = await fetch(
          `http://localhost:3000/countries?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar países.");
        }

        const data = await response.json();

        dispatch({
          type: "FETCH_SUCCESS",
          payload: Array.isArray(data) ? data : [data],
        });
      } catch (err) {
        console.error("Erro ao buscar países:", err);
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    },
    [dispatch]
  );

  return { ...state, search };
}
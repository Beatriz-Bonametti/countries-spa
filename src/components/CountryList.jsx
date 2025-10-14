import { useMemo, useState } from "react";
import { useCountries } from "./hooks/useCountries";
import CountryCard from "./CountryCard";
import { Grid, TextField, MenuItem, Stack } from "@mui/material";

export default function CountryList() {
  const { countries } = useCountries();
  const [orderBy, setOrderBy] = useState("name");
  const [minPop, setMinPop] = useState("");

  const visible = useMemo(() => {
    let list = countries ?? [];
    if (minPop) list = list.filter(c => (c.population || 0) >= Number(minPop));
    return [...list].sort((a,b) => {
      if (orderBy === "population") return (b.population||0) - (a.population||0);
      return (a.name?.common || "").localeCompare(b.name?.common || "");
    });
  }, [countries, orderBy, minPop]);

  return (
    <>
      <Stack direction={{ xs:"column", sm:"row" }} spacing={2} sx={{ my: 2 }}>
        <TextField
          select
          label="Ordenar por"
          value={orderBy}
          onChange={(e)=>setOrderBy(e.target.value)}
          sx={{ width: { xs:"100%", sm: 220 } }}
        >
          <MenuItem value="name">Nome</MenuItem>
          <MenuItem value="population">População</MenuItem>
        </TextField>

        <TextField
          label="População mínima"
          type="number"
          value={minPop}
          onChange={(e)=>setMinPop(e.target.value)}
          sx={{ width: { xs:"100%", sm: 220 } }}
        />
      </Stack>

      <Grid container spacing={2}>
        {visible.map(c => (
          <Grid key={c.cca3} item xs={12} sm={6} md={4} lg={3}>
            <CountryCard country={c} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

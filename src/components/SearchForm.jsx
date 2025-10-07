import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCountries } from "../hooks/useCountries";
import { Stack, TextField, MenuItem, Button, Alert } from "@mui/material";

const schema = yup.object({
  name: yup.string().trim(),
  region: yup.string().oneOf(["Africa","Americas","Asia","Europe","Oceania","Antarctic",""]).optional(),
  code: yup.string().trim().max(3),
}).test("one-required", "Informe nome, região ou código (alpha-2/alpha-3).", (v) =>
  Boolean(v?.name) || Boolean(v?.region) || Boolean(v?.code)
);

export default function SearchForm() {
  const { status, error, search } = useCountries();
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name:"", region:"", code:"" }
  });

  const onSubmit = (data) => search(data);
  const isLoading = status === "loading";

  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="flex-start"
      >
        <TextField
          label="Nome do país"
          fullWidth
          placeholder="Ex: brazil"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Código"
          {...register("code")}
          error={!!errors.code}
          helperText={errors.code?.message}
          sx={{ width: { xs: "100%", sm: 220 } }}
        />
        <TextField
          label="Região"
          select
          defaultValue=""
          {...register("region")}
          error={!!errors.region}
          sx={{ width: { xs: "100%", sm: 220 } }}
        >
          <MenuItem value="">—</MenuItem>
          {["Africa","Americas","Asia","Europe","Oceania","Antarctic"].map(r => (
            <MenuItem key={r} value={r}>{r}</MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoading}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </Button>
      </Stack>

      {(errors?.root?.message || error) && (
        <Alert severity={error ? "error" : "warning"} sx={{ mt: 2 }}>
          {errors?.root?.message || error}
        </Alert>
      )}
    </>
  );
}

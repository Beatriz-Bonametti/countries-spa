import {
  Card, CardHeader, CardContent, Avatar, Typography, Stack, Divider
} from "@mui/material";

export default function CountryCard({ country }) {
  const flag = country.flags?.svg || country.flags?.png;

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        avatar={<Avatar alt={country.name?.common} src={flag} />}
        title={
          <Typography variant="h6" fontWeight={700}>
            {country.name?.common}
          </Typography>
        }
        subheader={country.region}
      />
      <Divider />
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="body2">
            <strong>Capital:</strong> {country.capital?.[0] ?? "—"}
          </Typography>
          <Typography variant="body2">
            <strong>População:</strong> {country.population?.toLocaleString() ?? "—"}
          </Typography>
          <Typography variant="body2">
            <strong>Códigos:</strong> {country.cca2}/{country.cca3}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

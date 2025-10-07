import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";

export default function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" fontWeight={800} gutterBottom>
        Countries Explorer
      </Typography>

      <Box sx={{ mb: 2 }}>
        <SearchForm />
      </Box>

      <CountryList />
    </Container>
  );
}

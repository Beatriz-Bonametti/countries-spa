import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./contexts/AppContext.jsx";
import "./index.css";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c4dff" },
    secondary: { main: "#00e5ff" },
  },
  shape: { borderRadius: 10 },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);

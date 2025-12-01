import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import countryRoutes from "./src/routes/countryRoutes.js";
import { initDb } from "./src/config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API está rodando" });
});

app.use("/auth", authRoutes);
app.use("/countries", countryRoutes);

initDb()
  .then(() => {
    console.log("✅ Banco inicializado com sucesso.");
    app.listen(PORT, () => {
      console.log(`Servidor na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao inicializar o banco:", err);
  });

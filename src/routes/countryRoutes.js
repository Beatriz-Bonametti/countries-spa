import express from "express";
import { CountryModel } from "../models/CountryModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { name, region, code } = req.query;

  try {
    console.log("[COUNTRIES] Busca:", { name, region, code });

    const countries = await CountryModel.findAll({ name, region, code });
    res.json(countries);
  } catch (err) {
    console.error("[COUNTRIES] Erro ao buscar países:", err);
    res.status(500).json({ message: "Erro ao buscar países." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, code, region, capital, population } = req.body;

    if (!name || !code) {
      console.log("[COUNTRIES] Criação falhou: nome/código ausentes");
      return res
        .status(400)
        .json({ message: "Nome e código do país são obrigatórios." });
    }

    const created = await CountryModel.createCountry({
      name,
      code,
      region: region || null,
      capital: capital || null,
      population: population || 0,
    });

    console.log("[COUNTRIES] País criado:", created);

    res.status(201).json(created);
  } catch (err) {
    console.error("[COUNTRIES] Erro ao criar país:", err);
    res.status(500).json({ message: "Erro ao criar país." });
  }
});

export default router;

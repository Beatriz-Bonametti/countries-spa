import express from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

function validateEmail(email) {
  return typeof email === "string" && email.includes("@") && email.length >= 5;
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("[AUTH] Registro falhou: campos obrigatórios ausentes");
      return res
        .status(400)
        .json({ message: "Nome, e-mail e senha são obrigatórios." });
    }

    if (!validateEmail(email)) {
      console.log("[AUTH] Registro falhou: email inválido", email);
      return res.status(400).json({ message: "E-mail inválido." });
    }

    if (password.length < 4) {
      console.log("[AUTH] Registro falhou: senha fraca");
      return res
        .status(400)
        .json({ message: "Senha deve ter pelo menos 4 caracteres." });
    }
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      console.log("[AUTH] Registro falhou: email já cadastrado", email);
      return res.status(409).json({ message: "E-mail já cadastrado." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.createUser({
      name,
      email,
      password: passwordHash,
    });

    console.log("[AUTH] Usuário registrado com sucesso:", email);

    res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("[AUTH] Erro ao registrar usuário:", err);
    res.status(500).json({ message: "Erro interno ao registrar usuário." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("[AUTH] Login falhou: campos obrigatórios ausentes");
      return res
        .status(400)
        .json({ message: "E-mail e senha são obrigatórios." });
    }

    if (!validateEmail(email)) {
      console.log("[AUTH] Login falhou: email inválido", email);
      return res.status(400).json({ message: "E-mail inválido." });
    }

    const user = await UserModel.findByEmail(email);

    if (!user) {
      console.log("[AUTH] Login falhou: usuário não encontrado", email);
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("[AUTH] Login falhou: senha incorreta", email);
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    console.log("[AUTH] Login bem-sucedido para:", email);

    res.json({
      message: "Login bem-sucedido.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("[AUTH] Erro ao fazer login:", err);
    res.status(500).json({ message: "Erro interno ao fazer login." });
  }
});

export default router;

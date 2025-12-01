import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "..", "..", "database.sqlite");

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao banco:", err);
  } else {
    console.log("✅ Conectado ao banco: database.sqlite");
  }
});

export function initDb() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )
      `,
        (err) => {
          if (err) {
            console.error("Erro ao criar tabela users:", err);
            return reject(err);
          }
          console.log("Tabela 'users' verificada/criada.");
        }
      );

      db.run(
        `
        CREATE TABLE IF NOT EXISTS countries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          code TEXT NOT NULL,
          region TEXT,
          capital TEXT,
          population INTEGER DEFAULT 0
        )
      `,
        (err) => {
          if (err) {
            console.error("Erro ao criar tabela countries:", err);
            return reject(err);
          }
          console.log("Tabela 'countries' verificada/criada.");
          resolve(); 
        }
      );
    });
  });
}

import { db } from "../config/db.js";

export class CountryModel {
  static findAll({ name, region, code } = {}) {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM countries WHERE 1=1`;
      const params = [];

      if (name) {
        query += ` AND name LIKE ?`;
        params.push(`%${name}%`);
      }

      if (region) {
        query += ` AND region = ?`;
        params.push(region);
      }

      if (code) {
        query += ` AND code LIKE ?`;
        params.push(`${code}%`);
      }

      db.all(query, params, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  static createCountry({ name, code, region, capital, population }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO countries (name, code, region, capital, population)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(
        query,
        [name, code, region, capital, population],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: this.lastID,
            name,
            code,
            region,
            capital,
            population,
          });
        }
      );
    });
  }
}

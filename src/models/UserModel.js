import { db } from "../config/db.js";

export class UserModel {
  static createUser({ name, email, password }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;

      db.run(query, [name, email, password], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: this.lastID,
          name,
          email,
        });
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = ?`;

      db.get(query, [email], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row || null);
      });
    });
  }
}

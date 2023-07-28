const connection = require("../models/db");

const existing = {
  email: (email) => {
    console.log(email)
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE email = ?`,
        email,
        (err, result) => {
          if (err) reject(err);
          else resolve(result.length === 0 ? null : result[0]);
        }
      );
    });
  },

  userName: (userName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE userName = ?`,
        userName,
        (err, result) => {
          if (err) reject(err);
          else resolve(result.length === 0 ? null : result[0]);
        }
      );
    });
  },
};

module.exports = existing;

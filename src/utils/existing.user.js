const connection = require("../models/db");

const existing = {
  email: (email) => {
    console.log(email);
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (err, result) => {
          if (err) reject(err);
          else {
            const userExists = result.rows.length > 0;
            resolve(userExists ? result.rows[0] : null);
          }
        }
      );
    });
  },

  userName: (userName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE userName = $1`,
        [userName],
        (err, result) => {
          if (err) reject(err);
          else {
            const userExists = result.rows.length > 0;
            resolve(userExists ? result.rows[0] : null);
          }
        }
      );
    });
  },
};

module.exports = existing;

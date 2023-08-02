const pool = require("./db");

const userModel = {
  addUser: async (user) => {
    try {
      const query =
        "INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING id";
      const values = [user.userName, user.email, user.password];

      const result = await pool.query(query, values);
      const insertedUserId = result.rows[0].id;
      console.log(`User with ID ${insertedUserId} successfully added.`);
      return insertedUserId;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateUser: (userName, id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE users SET userName = $1 WHERE id = $2`,
        [userName, id],
        (err, results) => {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM users WHERE id = $1`, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = userModel;

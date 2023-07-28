const connection = require("./db");

const userModel = {
  addUser: (user) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO users SET ?`, user, (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateUser: (newData,id, userId) => {
    console.log(newData)
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE users SET ? WHERE id = ? AND userId = ?`,
        [newData, id,userId],
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

  deleteUser: (id, userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM users WHERE id = ? AND userId = ?`,
        [id,userId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};

module.exports = userModel;

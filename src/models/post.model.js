const pool = require("./db");

const postModel = {
  createPost: (userId, title, blog, private) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO posts (userId, title, blog, private) VALUES ($1, $2, $3, $4)";
      const values = [userId, title, blog, private];
      pool.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getAllPost: (private) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM posts WHERE PRIVATE = false`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(result), resolve(result);
        }
      });
    });
  },

  updatePost: (userId, id, title, blog, private) => {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE posts SET userId = $1, title = $2, blog = $3, private = $4 WHERE id = $5";
      const values = [userId, title, blog, private, id];
      pool.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deletePost: (id, userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM posts WHERE id = $1 AND userId = $2`,
        [id, userId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = postModel;

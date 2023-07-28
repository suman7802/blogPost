const connection = require("./db");

const postModel = {
  createPost: (post) => {
    console.log(post);
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO POSTS SET ?`, post, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getAllPost: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM POSTS`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  updatePost: (post, id, userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE POSTS SET ? WHERE id = ? AND userId = ?`,
        [post, id, userId],
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

  deletePost: (id, userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM POSTS WHERE id = ? AND userId = ?`,
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

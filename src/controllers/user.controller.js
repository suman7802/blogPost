const userModel = require("../models/user.model");

const userController = {
  getAllUsers: (req, res) => {
    userModel
      .getAllUsers()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({error: "Error fetching users."});
      });
  },

  updateUser: (req, res) => {
    const id = req.user.id;
    const userName = req.body.userName;

    userModel
      .updateUser(userName, id)
      .then((result) => {
        if (result) {
          return res.json({message: "User updated successfully."});
        } else {
          return res.status(404).json({error: "User not found."});
        }
      })
      .catch((err) => {
        return res.status(500).json({error: err});
      });
  },

  deleteUser: (req, res) => {
    const id = req.user.id;
    userModel
      .deleteUser(id)
      .then((result) => {
        if (result) {
          return res.json({message: "User deleted successfully."});
        } else {
          return res.status(404).json({error: "User not found."});
        }
      })
      .catch((err) => {
        return res.status(500).json({error: "Error deleting user."});
      });
  },
};

module.exports = userController;

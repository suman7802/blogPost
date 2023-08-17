require("dotenv").config();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const userModel = require("../models/user.model");
const existing = require("../utils/existing.user");

const authenticationController = {
  registration: async (req, res) => {
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await existing.email(email);
    const nickname = await existing.userName(userName);

    if (user) {
      return res.status(404).json({error: "email already exist"});
    }

    if (nickname) {
      return res.status(404).json({error: "user name is already Taken"});
    }

    if (!user && !nickname) {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      };

      userModel
        .addUser(newUser)
        .then((userId) => {
          return res
            .status(201)
            .json({message: "User added successfully.", userId: userId});
        })
        .catch((err) => {
          return res.status(500).json({error: err});
        });
    }
  },

  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await existing.email(email);

    if (!user) {
      return res.status(404).json({error: "user not found"});
    }

    let passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({error: "Invalid credentials"});
    }

    const accessToken = JWT.sign(user.email, process.env.JWT_SECRET);

    try {
      return res
        .cookie("access-token-03", accessToken, {
          secure: false,
          Path: "*",
        })
        .status(200)
        .json({message: "Login successful"});
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  },
};

module.exports = authenticationController;

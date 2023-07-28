const express = require("express");
const authenticationRouter = express.Router();

const authenticationController = require("../controllers/authentication.controller");

authenticationRouter.post("/login", authenticationController.login);
authenticationRouter.post("/registration",authenticationController.registration);

module.exports = authenticationRouter;

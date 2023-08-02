const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/post.controller");

postRouter.post("/", postController.addPost); // complete
postRouter.get("/", postController.getAllPost); // complete
postRouter.put("/", postController.updatePost); // complete
postRouter.delete("/", postController.deletePost);

module.exports = postRouter;

const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/post.controller");

postRouter.post("/", postController.addPost);
postRouter.get("/", postController.getAllPost);
postRouter.put("/", postController.updatePost);
postRouter.delete("/", postController.deletePost);

module.exports = postRouter;

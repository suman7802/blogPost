const postModel = require("../models/post.model");

const postController = {
  addPost: (req, res) => {
    const userId = req.user.id;
    const title = req.body.title;
    const blog = req.body.blog;
    const private = req.body.private;

    postModel
      .createPost(userId, title, blog, private)
      .then((result) => {
        return res.status(201).json({result});
      })
      .catch((err) => {
        return res.status(400).json({err});
      });
  },

  getAllPost: (req, res) => {
    postModel
      .getAllPost()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json({err});
      });
  },

  updatePost: (req, res) => {
    const userId = req.user.id;

    const id = req.body.id;
    const title = req.body.title;
    const blog = req.body.blog;
    const private = req.body.private;

    postModel
      .updatePost(userId, id, title, blog, private)
      .then((result) => {
        res.status(200).json({result});
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({err});
      });
  },

  deletePost: (req, res) => {
    const id = req.body.id;
    const userId = req.user.id;

    postModel
      .deletePost(id, userId)
      .then((result) => {
        res.status(200).json({result});
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({err});
      });
  },
};

module.exports = postController;

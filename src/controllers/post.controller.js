const postModel = require("../models/post.model");

const postController = {
  addPost: (req, res) => {
    const newPost = {
      userId: req.user.id,
      ...req.body,
    };

    postModel
      .createPost(newPost, userId)
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
    const id = req.body.id;
    const userId = req.user.id;

    const newPost = {
      title: req.body.title,
      blog: req.body.blog,
      private: req.body.private,
    };
    postModel
      .updatePost(newPost, id, userId)
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

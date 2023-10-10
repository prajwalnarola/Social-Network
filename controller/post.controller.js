const postServices = require("../services/post.services");

exports.addPost = (req, res, next) => {
  const data = {
    description: req.body.description,
    imageOrVideoURL: req.file.filename,
    likesCount: req.body.likesCount,
    commentsCount: req.body.commentsCount,
    shareCount: req.body.shareCount,
    visibility: req.body.visibility,
    tags: req.body.tags,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    userId: req.body.userId,
    isTestdata: req.body.isTestdata,
  };
  postServices.addPost(data, (error, result) => {
    if (error) {
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Posted successfully",
      data: result,
    });
  });
};

exports.getPost = (req, res, next) => {
    const data = {
      userId: req.query.userId
    };
    postServices.getPost(data, (error, result) => {
      if (error) {
        return res.status(400).send({ status: 0, data: "Bad Request" });
      }
      return res.status(200).send({
        status: 1,
        message: "Post Available",
        data: result,
      });
    });
  };

  exports.likePost = (req, res, next) => {
    const data = {
        postId: req.body.postId
    };
    postServices.likePost(data, (error, result) => {
      if (error) {
        return res.status(400).send({ status: 0, data: "Bad Request" });
      }
      return res.status(200).send({
        status: 1,
        message: "Like count updated",
        data: result,
      });
    });
  };

  exports.deletePost = (req, res, next) => {
    const data = {
        postId: req.query.postId
    };
    postServices.deletePost(data, (error, result) => {
      if (error) {
        return res.status(400).send({ status: 0, data: "Bad Request" });
      }
      return res.status(200).send({
        status: 1,
        message: "Post Deleted",
        data: result,
      });
    });
  };
  
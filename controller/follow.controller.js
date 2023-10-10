const followServices = require("../services/follow.services");

exports.followUser = (req, res, next) => {
  const data = {
    followerUserId: req.body.followerUserId,
    followingUserId: req.body.followingUserId,
    isTestdata: req.body.isTestdata,
  };
  followServices.followUser(data, (error, result) => {
    if (error) {
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Followed successfully",
      data: result,
    });
  });
};

exports.unFollowUser = (req, res, next) => {
  const data = {
    followerUserId: req.body.followerUserId,
    followingUserId: req.body.followingUserId
  };
  followServices.unFollowUser(data, (error, result) => {
    if (error) {
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Unfollowed successfully",
      data: result,
    });
  });
};

exports.getFollowerCount = (req, res, next) => {
  const data  = {
    userId: req.query.userId
  };
  followServices.getFollowerCount(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "FollowerCount Available",
      data: result
    });
  });
};

exports.getFollowingCount = (req, res, next) => {
  const data  = {
    userId: req.query.userId
  };
  followServices.getFollowingCount(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "FollowingCount Available",
      data: result
    });
  });
};

exports.getFollowers = (req, res, next) => {
  const data  = {
    userId: req.query.userId
  };
  followServices.getFollowers(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "FollowersInfo Available",
      data: result
    });
  });
};

exports.getFollowing = (req, res, next) => {
  const data  = {
    userId: req.query.userId
  };
  followServices.getFollowing(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "FollowingInfo Available",
      data: result
    });
  });
};
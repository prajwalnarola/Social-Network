const db = require("../config/db.config");

exports.followUser = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.followerUserId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from user where id = ?",
          [data.followingUserId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "insert into follow(followerUserId, followingUserId, isTestdata) values(?,?,?)",
                [data.followerUserId, data.followingUserId, data.isTestdata],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null, results[0]);
                  }
                }
              );
            } else {
              return callback(null, "User does not exists");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};

exports.unFollowUser = (data, callback) => {
  db.query(
    "select * from follow where followerUserId = ?",
    [data.followerUserId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from follow where followingUserId = ?",
          [data.followingUserId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "update follow set isDelete = 1 where followerUserId = ? and followingUserId = ?",
                [data.followerUserId, data.followingUserId],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null);
                  }
                }
              );
            } else {
              return callback(null, "User does not exists");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};

exports.getFollowerCount = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      if (results.length > 0) {
        db.query(
          "select * from follow where followingUserId = ? ",
          [data.userId],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "select count(followerUserId) as followerUserIdCount from follow where followingUserId = ? and isDelete = ?",
                [data.userId, 0],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null, results[0]);
                  }
                }
              );
            } else {
              return callback(null, "following userId not present");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};

exports.getFollowingCount = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from follow where followerUserId = ? ",
          [data.userId],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "select count(followingUserId) as followingUserIdCount from follow where followerUserId = ? and isDelete = ?",
                [data.userId, 0],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null, results[0]);
                  }
                }
              );
            } else {
              return callback(null, "follower userId not present");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};

exports.getFollowers = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      if (results.length > 0) {
        db.query(
          "select * from follow where followingUserId = ? ",
          [data.userId],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "select fullName from userProfile inner join follow on followerUserId = userId where followerUserId in (select followerUserId from follow where followingUserId = ? and isDelete = ?)",
                [data.userId, 0],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null, results);
                  }
                }
              );
            } else {
              return callback(null, "following userId not present");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};

exports.getFollowing = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      if (results.length > 0) {
        db.query(
          "select * from follow where followingUserId = ? ",
          [data.userId],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "select fullName from userProfile inner join follow on followingUserId = userId where followingUserId in (select followingUserId from follow where followerUserId = ? and isDelete = ?)",
                [data.userId, 0],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null, results);
                  }
                }
              );
            } else {
              return callback(null, "following userId not present");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};
const db = require("../config/db.config");

exports.putSavedPost = (data, callback) => {
  db.query(
    "select * from user where id = ? and isDelete = 0",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from post where id = ?  and isDelete = 0",
          [data.postId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "insert into savedPost(postId, userId, isTestdata) values(?,?,?) ",
                [data.postId, data.userId, data.isTestdata],

                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null);
                  }
                }
              );
            } else {
              return callback(null, "post does not exists");
            }
          }
        );
      } else {
        return callback(null, "user does not exists");
      }
    }
  );
};

exports.getSavedPost = (data, callback) => {
  db.query(
    "select * from user where id = ? and isDelete = 0",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      if (results.length > 0) {
        db.query(
          "select * from savedPost where userId = ? and isDelete = 0",
          [data.userId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, results);
            }
          }
        );
      } else {
        return callback(null, "user does not exists");
      }
    }
  );
};

exports.getSavedPostCount = (data, callback) => {
  db.query(
    "select * from user where id = ? and isDelete = 0",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      if (results.length > 0) {
        db.query(
          "select count(*)  as savedPostCount from savedPost where userId = ? and isDelete = 0",
          [data.userId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, results);
            }
          }
        );
      } else {
        return callback(null, "user does not exists");
      }
    }
  );
};

exports.removeSavedPost = (data, callback) => {
  db.query(
    "select * from user where id = ? and isDelete = 0",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      if (results.length > 0) {
        db.query(
          "select * from savedPost where userId =?",
          [data.userId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "SELECT * FROM `savedPost` WHERE postId = ?",
                [data.postId],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  }
                  if (results.length > 0) {
                    db.query(
                      "update savedPost set isDelete = 1 where userId = ? and postId = ?",
                      [data.userId, data.postId],

                      (error, results, fields) => {
                        if (error) {
                          return callback(error);
                        } else {
                          return callback(null);
                        }
                      }
                    );
                  } else {
                    return callback(null, "post does not exists in savedPost");
                  }
                }
              );
            } else {
              return callback(null, "userId does not exists in savedPost");
            }
          }
        );
      } else {
        return callback(null, "user does not exists");
      }
    }
  );
};

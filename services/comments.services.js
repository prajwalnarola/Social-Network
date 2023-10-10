const db = require("../config/db.config");

exports.addComment = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from post where id = ?",
          [data.postId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "insert into comment(comment, postId, userId, isTestdata) values(?,?,?,?)",
                [data.comment, data.postId, data.userId, data.isTestdata],

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

exports.getComment = (data, callback) => {
  db.query(
    "select * from post where id = ?",
    [data.postId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from comment where postId = ? and isDelete = ?",
          [data.postId,0],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "select * from comment where postId = ? and isDelete = ? ",
                [data.postId,0],

                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null, results);
                  }
                }
              );
            }else{
                return callback(null, "postId not present in comment")
            }
          }
        );
      } else {
        return callback(null, "post does not exists");
      }
    }
  );
};

exports.getCommentCount = (data, callback) => {
    db.query(
      "select * from post where id = ?",
      [data.postId],
  
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        if (results.length > 0) {
          db.query(
            "select * from comment where postId = ? and isDelete = ?",
            [data.postId,0],
  
            (error, results, fields) => {
              if (error) {
                return callback(error);
              }
              if (results.length > 0) {
                db.query(
                  "select count(comment) as commentCount from comment where postId = ? and isDelete = ?",
                  [data.postId,0],
  
                  (error, results, fields) => {
                    if (error) {
                      return callback(error);
                    } else {
                      return callback(null, results);
                    }
                  }
                );
              }else{
                  return callback(null, "postId not present in comment")
              }
            }
          );
        } else {
          return callback(null, "post does not exists");
        }
      }
    );
  };

  exports.updateComment = (data, callback) => {
    db.query(
      "select * from post where id = ?",
      [data.postId],
  
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        if (results.length > 0) {
          db.query(
            "select comment from comment where postId = ? and userId =?",
            [data.postId, data.userId],
  
            (error, results, fields) => {
              if (error) {
                return callback(error);
              }
              if (results.length > 0) {
                db.query(
                  "update comment set comment = ? where id = ? and postId = ? and userId = ?",
                  [data.comment, data.id, data.postId, data.userId],
  
                  (error, results, fields) => {
                    if (error) {
                      return callback(error);
                    } else {
                      return callback(null);
                    }
                  }
                );
              }else{
                  return callback(null, "postId not present in comment")
              }
            }
          );
        } else {
          return callback(null, "post does not exists");
        }
      }
    );
  };

  exports.deleteComment = (data, callback) => {
    db.query(
      "select * from post where id = ?",
      [data.postId],
  
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        if (results.length > 0) {
          db.query(
            "select comment from comment where postId = ? and userId =?",
            [data.postId, data.userId],
  
            (error, results, fields) => {
              if (error) {
                return callback(error);
              }
              if (results.length > 0) {
                db.query(
                  "update comment set isDelete = ? where id = ? and postId = ? and userId = ?",
                  [1, data.id, data.postId, data.userId],
  
                  (error, results, fields) => {
                    if (error) {
                      return callback(error);
                    } else {
                      return callback(null);
                    }
                  }
                );
              }else{
                  return callback(null, "postId not present in comment");
              }
            }
          );
        } else {
          return callback(null, "post does not exists");
        }
      }
    );
  };

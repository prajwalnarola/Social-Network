const db = require("../config/db.config");

exports.addPost = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      if (results.length > 0) {
        db.query(
          "insert into post(description, imageOrVideoURL, likesCount, commentsCount, shareCount, visibility, tags, latitude, longitude, userId, isTestdata) values(?,?,?,?,?,?,?,?,?,?,?)",
          [
            data.description,
            data.imageOrVideoURL,
            data.likesCount,
            data.commentsCount,
            data.shareCount,
            data.visibility,
            data.tags,
            data.latitude,
            data.longitude,
            data.userId,
            data.isTestdata,
          ],
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
};


exports.getPost = (data, callback) => {
    db.query(
      "select * from user where id = ?",
      [data.userId],
  
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
  
        if (results.length > 0) {
          db.query(
            "select * from post where userId =? and isDelete = 0",
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
          return callback(null, "User does not exists");
        }
      }
    );
  };

  exports.likePost = (data, callback) => {
    db.query(
      "select * from post where id = ?",
      [data.postId],
  
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
  
        if (results.length > 0) {
          db.query(
            "update post set likesCount = likesCount + 1 where id = ?",
            [data.postId],
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
  };

  exports.deletePost = (data, callback) => {
    db.query(
      "select * from post where id = ?",
      [data.postId],
  
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
  
        if (results.length > 0) {
          db.query(
            "update post set isDelete = 1 where id = ?",
            [data.postId],
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
  };
  
const db = require("../config/db.config");

exports.addChat = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.user1Id],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from user where id = ? ",
          [data.user2Id],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "insert into chat(user1Id, user2Id, isGroupChat, isTestdata) values(?,?,?,?) ",
                [data.user1Id, data.user2Id, data.isGroupChat, data.isTestdata],

                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null, results);
                  }
                }
              );
            } else {
              return callback(null, "user2 does not exists");
            }
          }
        );
      } else {
        return callback(null, "user1 does not exists");
      }
    }
  );
};

exports.sendMessage = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.senderUserId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from user where id = ?",
          [data.recieverUserId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length > 0) {
              db.query(
                "select * from chat where id = ?",
                [data.chatId],

                (error, results, fields) => {
                  if (results.length > 0) {
                    if(data.senderUserId != data.recieverUserId){
                        db.query(
                            "insert into message(content, chatId, senderUserId, recieverUserId, isRead, isTestdata) values(?,?,?,?,?,?)",
                            [
                              data.content,
                              data.chatId,
                              data.senderUserId,
                              data.recieverUserId,
                              data.isRead,
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
                    }else{
                        return callback(null, "senderUserId and recieverUserId cannot be same");
                    }                    
                  }else{
                    return callback(null, "chat does not exists");
                  }
                }
              );
            } else {
              return callback(null, "recieveruserId does not exists");
            }
          }
        );
      } else {
        return callback(null, "senderUserId does not exists");
      }
    }
  );
};


exports.retrieveMessage = (data, callback) => {
    db.query(
      "select * from user where id = ?",
      [data.senderUserId],
  
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        if (results.length > 0) {
          db.query(
            "select * from user where id = ?",
            [data.recieverUserId],
  
            (error, results, fields) => {
              if (error) {
                return callback(error);
              }
              if (results.length > 0) {
                db.query(
                  "select * from chat where id = ?",
                  [data.chatId],
  
                  (error, results, fields) => {
                    if (results.length > 0) {
                      if(data.senderUserId != data.recieverUserId){
                          db.query(
                              "select * from message where chatId = ? and senderUserId=? and recieverUserId=?",
                              [
                                data.chatId,
                                data.senderUserId,
                                data.recieverUserId
                              ],
        
                              (error, results, fields) => {
                                if (error) {
                                  return callback(error);
                                } else {
                                  return callback(null, results);
                                }
                              }
                            );
                      }else{
                          return callback(null, "senderUserId and recieverUserId cannot be same");
                      }                    
                    }else{
                      return callback(null, "chat does not exists");
                    }
                  }
                );
              } else {
                return callback(null, "recieveruserId does not exists");
              }
            }
          );
        } else {
          return callback(null, "senderUserId does not exists");
        }
      }
    );
  };
  
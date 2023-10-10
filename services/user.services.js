const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

exports.register = (data, callback) => {
  db.query(
    "select * from user where email = ?",
    [data.email],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      console.log(results);
      if (results.length < 1) {
        if (data.password.length > 0) {
          bcrypt.hash(data.password, 10, (hashError, hashPassword) => {
            if (hashError) {
              return callback(error);
            }

            db.query(
              "insert into user(userName, email, password, accountStatus, isTestdata) values(?,?,?,?,?)",
              [
                data.userName,
                data.email,
                hashPassword,
                data.accountStatus,
                data.isTestdata,
              ],

              (insertError, insertResults, insertFields) => {
                if (insertError) {
                  return callback(insertError);
                }
                console.log(insertResults);
                return callback(null);
              }
            );
          });
        } else {
          return callback(null, "Empty password");
        }
      } else {
        return callback(null, "User already exists");
      }
    }
  );
};

exports.login = (data, callback) => {
  db.query(
    "select * from user where email = ?",
    [data.email],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results[0].isDelete == 1) {
        return callback(null, "No user found");
      }
      console.log(results[0].password);
      console.log(data.password);
      if (data.password.length > 0) {
        bcrypt
          .compare(data.password, results[0].password)
          .then((isMatch) => {
            if (!isMatch) {
              return callback("error");
            }
            delete results[0].password;
            return callback(null, results[0]);
          })
          .catch((error) => {
            // Handle any errors that occurred during the password comparison
            return callback(error);
          });
      } else {
        return callback(null, "Empty password");
      }
    }
  );
};

exports.forgotPassword = (data, callback) => {
  console.log(data);
  db.query(
    "SELECT * FROM user where email = ?",
    [data.email],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      console.log(results);
      if (results.length > 0) {
        const newPassword = randomstring.generate(10);
        bcrypt.hash(newPassword, 10, (hashError, hashPassword) => {
          if (hashError) {
            return callback(error);
          }
          db.query("UPDATE user SET password = ? WHERE id = ?", [
            hashPassword,
            results[0].id,
          ]);
        });
        const emailResult = sendPasswordResetEmail(data.email, newPassword);
        if (!emailResult) {
          return callback("Email sending error", null);
        }
        return callback(null);
      } else {
        console.log(results);
        return callback(null, "User not exist");
      }
    }
  );
};

function sendPasswordResetEmail(email, newPassword) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mobiletrainees2023@gmail.com",
      pass: "gxlfsykqhwtaqikp",
    },
  });

  const mailOptions = {
    from: "mobiletrainees2023@gmail.com",
    to: email,
    subject: "Social Network App Password Reset Request",
    text: `Your new password is: ${newPassword}`,
  };

  const emailResult = transporter.sendMail(mailOptions);
  return emailResult;
}

exports.profileInfo = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      console.log(results);
      if (results.length > 0) {
        db.query(
          "select * from userProfile where userId = ?",
          [data.userId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            if (results.length < 1) {
              db.query(
                "insert into userProfile(fullName, profilePicture, bio, dateOfBirth, followersCount, followingCount, status, userId, isTestdata) values(?,?,?,?,?,?,?,?,?)",
                [
                  data.fullName,
                  data.profilePicture,
                  data.bio,
                  data.dateOfBirth,
                  data.followersCount,
                  data.followingCount,
                  data.status,
                  data.userId,
                  data.isTestdata,
                ],

                (insertError, insertResults, insertFields) => {
                  if (insertError) {
                    return callback(insertError);
                  }
                  console.log(insertResults);
                  return callback(null);
                }
              );
            } else {
              return callback(null, "Profile already exists");
            }
          }
        );
      } else {
        return callback(null, "User not exists");
      }
    }
  );
};

exports.getProfileInfo = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from userProfile where userId = ?",
          [data.userId],
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
};

exports.updateFullname = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from userProfile where userId = ?",
          [data.userId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            console.log(results);
            if (results.length > 0) {
              db.query(
                "update userProfile set fullName = ? where userId = ?",
                [data.fullName, data.userId],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null);
                  }
                }
              );
            } else {
              return callback(null, "profile does not exists");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};

exports.updateProfilePicture = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from userProfile where userId = ?",
          [data.userId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            console.log(results);
            if (results.length > 0) {
              db.query(
                "update userProfile set profilePicture = ? where userId = ?",
                [data.profilePicture, data.userId],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null);
                  }
                }
              );
            } else {
              return callback(null, "Profile does not exists");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};

exports.updateBio = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from userProfile where userId = ?",
          [data.userId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            console.log(results);
            if (results.length > 0) {
              db.query(
                "update userProfile set bio = ? where userId = ?",
                [data.bio, data.userId],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    return callback(null);
                  }
                }
              );
            } else {
              return callback(null, "Profile does not exists");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};

exports.changePassword = (data, callback) => {
  console.log(data);
  db.query(
    "SELECT * FROM user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      console.log(results);
      if (results.length > 0) {
        console.log(data.password);
        const newPassword = data.password;
        bcrypt.hash(newPassword, 10, (hashError, hashPassword) => {
          if (hashError) {
            return callback(error);
          }
          db.query("UPDATE user SET password = ? WHERE id = ?", [
            hashPassword,
            results[0].id,
          ]);
        });
        if (error) {
          return callback(error);
        }
        return callback(null);
      } else {
        return callback(null, "User not exist");
      }
    }
  );
};

exports.deleteProfile = (data, callback) => {
  db.query(
    "select * from user where id = ?",
    [data.userId],

    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        db.query(
          "select * from userProfile where userId = ?",
          [data.userId],

          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            console.log(results);
            if (results.length > 0) {
              db.query(
                "update userProfile set isDelete = ? where userId = ?",
                [1, data.userId],
                (error, results, fields) => {
                  if (error) {
                    return callback(error);
                  } else {
                    db.query(
                      "update user set isDelete = ? where Id = ?",
                      [1, data.userId],
                      (error, results, fields) => {
                        if (error) {
                          return callback(error);
                        } else {
                          return callback(null);
                        }
                      }
                    );
                  }
                }
              );
            } else {
              return callback(null, "Profile does not exists");
            }
          }
        );
      } else {
        return callback(null, "User does not exists");
      }
    }
  );
};



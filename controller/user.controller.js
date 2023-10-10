const userServices = require("../services/user.services");

exports.register = (req, res, next) => {
  const data = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    accountStatus: req.body.accountStatus,
    isTestdata: req.body.isTestdata,
  };

  userServices.register(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "User registreted sucessfully",
      data: result,
    });
  });
};

exports.login = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  };

  userServices.login(data, (error, result) => {
    if(error){
      console.log(error)
      return res.status(400).send({status: 0, data: "Invalid credentials"});
    }
    return res.status(200).send({
      status: 1,
      message: "Login Successfully",
      data: result
    })
  });
};

exports.forgotPassword = (req, res, next) => {
  const data = {
    email: req.body.email
  };

  userServices.forgotPassword(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Password reset email sent",
      data: result,
    });
  });
};

exports.profileInfo = (req, res, next) => {
  const data = {
    fullName: req.body.fullName,
    profilePicture: req.file.filename,
    bio: req.body.bio,
    dateOfBirth: req.body.dateOfBirth,
    followersCount: req.body.followersCount,
    followingCount: req.body.followingCount,
    status: req.body.status,
    userId: req.body.userId,
    isTestdata: req.body.isTestdata
  }
  userServices.profileInfo(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Profile inserted sucessfully",
      data: result,
    });
  });
};

exports.getProfileInfo = (req, res, next) => {
  const data = {
    userId: req.query.userId
  }
  userServices.getProfileInfo(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Data Available",
      data: result,
    });
  });
};

exports.updateFullname = (req, res, next) => {
  const data  = {
    userId: req.body.userId,
    fullName: req.body.fullName
  };
  userServices.updateFullname(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "fullName updated successfully",
      data: result
    });
  });
};

exports.updateProfilePicture = (req, res, next) => {
  const data  = {
    userId: req.body.userId,
    profilePicture: req.file.filename
  };
  userServices.updateProfilePicture(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "ProfilePicture updated successfully",
      data: result
    });
  });
};

exports.updateBio = (req, res, next) => {
  const data  = {
    userId: req.body.userId,
    bio: req.body.bio
  };
  userServices.updateBio(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Bio updated successfully",
      data: result
    });
  });
};

exports.changePassword = (req, res, next) => {
  const data  = {
    userId: req.query.userId,
    password: req.query.password
  };
  userServices.changePassword(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Password changed successfully",
      data: result
    });
  });
};

exports.deleteProfile = (req, res, next) => {
  const data  = {
    userId: req.body.userId
  };
  userServices.deleteProfile(data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ status: 0, data: "Bad Request" });
    }
    return res.status(200).send({
      status: 1,
      message: "Profile deleted successfully",
      data: result
    });
  });
};


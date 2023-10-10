const savedPostServices = require("../services/savedPosts.services");

exports.putSavedPost = (req, res, next) => {
    const data = {
        postId: req.body.postId,
        userId: req.body.userId,
        isTestdata: req.body.isTestdata
    };
    savedPostServices.putSavedPost(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Post saved successfully",
            data: result
        });
    });
};

exports.getSavedPost = (req, res, next) => {
    const data = {
        userId: req.query.userId,
    };
    savedPostServices.getSavedPost(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Post Available",
            data: result
        });
    });
};

exports.getSavedPostCount = (req, res, next) => {
    const data = {
        userId: req.query.userId,
    };
    savedPostServices.getSavedPostCount(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Post Count Available",
            data: result
        });
    });
};

exports.removeSavedPost = (req, res, next) => {
    const data = {
        userId: req.query.userId,
        postId: req.query.postId
    };
    savedPostServices.removeSavedPost(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Post removed successfully",
            data: result
        });
    });
};
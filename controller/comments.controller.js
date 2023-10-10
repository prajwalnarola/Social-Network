const commentServices = require("../services/comments.services");

exports.addComment = (req, res, next) => {
    const data = {
        comment: req.body.comment,
        postId: req.body.postId,
        userId: req.body.userId,
        isTestdata: req.body.isTestdata
    };
    commentServices.addComment(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Commented Successfully",
            data: result
        });
    });
};

exports.getComment = (req, res, next) => {
    const data = {
        postId: req.body.postId
    };
    commentServices.getComment(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Comments available",
            data: result
        });
    });
};

exports.getCommentCount = (req, res, next) => {
    const data = {
        postId: req.body.postId
    };
    commentServices.getCommentCount(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "CommentCount available",
            data: result
        });
    });
};

exports.updateComment = (req, res, next) => {
    const data = {
        id: req.body.id,
        comment: req.body.comment,
        postId: req.body.postId,
        userId: req.body.userId
    };
    commentServices.updateComment(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Comment updated successfully",
            data: result
        });
    });
};

exports.deleteComment = (req, res, next) => {
    const data = {
        id: req.body.id,
        comment: req.body.comment,
        postId: req.body.postId,
        userId: req.body.userId
    };
    commentServices.deleteComment(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Comment updated successfully",
            data: result
        });
    });
};
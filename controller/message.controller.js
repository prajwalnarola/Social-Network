const messageServices = require("../services/message.services");

exports.addChat = (req, res, next) => {
    const data = {
        user1Id: req.body.user1Id,
        user2Id: req.body.user2Id,
        isGroupChat: req.body.isGroupChat,
        isTestdata: req.body.isTestdata
    };
    messageServices.addChat(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Chat added successfully",
            data: result
        });
    });
};

exports.sendMessage = (req, res, next) => {
    const data = {
        content: req.body.content,
        chatId: req.body.chatId,
        senderUserId: req.body.senderUserId,
        recieverUserId: req.body.recieverUserId,
        isRead: req.body.isRead,
        isTestdata: req.body.isTestdata
    };
    messageServices.sendMessage(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Message added successfully",
            data: result
        });
    });
};

exports.retrieveMessage = (req, res, next) => {
    const data = {
        chatId: req.body.chatId,
        senderUserId: req.body.senderUserId,
        recieverUserId: req.body.recieverUserId,
    };
    messageServices.retrieveMessage(data, (error, result) =>{
        if(error){
            return res.status(400).send({ status: 0, data: "Bad Request" });
        }
        return res.status(200).send({
            status: 1,
            message: "Message retrieved successfully",
            data: result
        });
    });
};
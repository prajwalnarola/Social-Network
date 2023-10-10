const messageController = require("../controller/message.controller");

const express = require("express");

const router = express.Router();

router.post("/addChat", messageController.addChat);
router.post("/sendMessage", messageController.sendMessage);
router.get("/retrieveMessage", messageController.retrieveMessage);


module.exports = router;

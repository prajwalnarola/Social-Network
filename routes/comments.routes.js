const commentContoller = require("../controller/comments.controller");

const express = require("express");

const router = express.Router();

router.post("/addComment", commentContoller.addComment);
router.get("/getComment", commentContoller.getComment);
router.get("/getCommentCount", commentContoller.getCommentCount);
router.put("/updateComment", commentContoller.updateComment);
router.put("/deleteComment", commentContoller.deleteComment);

module.exports = router;



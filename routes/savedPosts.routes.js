const savedPostController = require("../controller/savedPosts.controller");

const express  = require("express");

const router = express.Router();

router.post("/putSavedPost", savedPostController.putSavedPost);
router.get("/getSavedPost", savedPostController.getSavedPost);
router.get("/getSavedPostCount", savedPostController.getSavedPostCount);
router.put("/removeSavedPost", savedPostController.removeSavedPost);


module.exports = router;
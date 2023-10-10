const followController = require("../controller/follow.controller");

var express = require("express");

const router = express.Router();

router.post("/followUser", followController.followUser);
router.put("/unFollowUser", followController.unFollowUser);
router.get("/getFollowerCount", followController.getFollowerCount);
router.get("/getFollowingCount", followController.getFollowingCount);
router.get("/getFollowers", followController.getFollowers);
router.get("/getFollowing", followController.getFollowing);


module.exports = router;

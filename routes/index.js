const express = require("express");
const router = express.Router();
const cleanBody = require("../middleware/cleanbody");
const User = require("../model/user");
const AuthController = require("../controller/user.controller");
const ActivateController = require("../controller/activate.controller");
const UpdateController = require("../controller/update.controller");
const AllChannelController = require("../controller/channels.controller");
const SingleChannelController = require("../controller/singlechannel.controller");
const FollowController = require("../controller/follow.controller");
const UnfollowController = require("../controller/follow.controller");
const CheckfollowController = require("../controller/checkfollowing");
const CountController = require("../controller/countdata");



//Define endpoints
router.post("/signup", cleanBody, AuthController.Signup);
router.post("/activate", cleanBody, ActivateController.Activate);
router.put("/:id", cleanBody, UpdateController.Update);
router.get('/allchannel', cleanBody, AllChannelController.AllChannel);
router.post('/singlechannel', cleanBody, SingleChannelController.SingleChannel);
router.patch("/follow", cleanBody, FollowController.Follow);
router.patch("/unfollow", cleanBody, UnfollowController.Unfollow);
router.post("/checkfollow", cleanBody, CheckfollowController.Check);
router.post("/count", cleanBody, CountController.Count);



router.get("/ping", (req, res) => {
    return res.send({
      error: false,
      message: "Server is healthy",
    });
  });



  module.exports = router;
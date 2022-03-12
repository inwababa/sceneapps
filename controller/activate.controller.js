require("dotenv").config();
const User = require("../model/user");


exports.Activate = async (req, res) => {
    try {
      const { phone, code } = req.body;
      if (!phone || !code) {
        return res.json({
          error: true,
          status: 400,
          message: "Please make a valid request",
        });
      }
      const user = await User.findOne({
        phone: phone,
        smsToken: code
      });
      if (!user) {
        return res.status(400).json({
          error: true,
          message: "Invalid details",
        });
      } else {
        if (user.active)
          return res.json({
            error: true,
            message: "Account already activated",
            status: 400,
          });
        user.smsToken = code;
        user.active = true;
        await user.save();
        return res.status(200).json({
            user,
          success: true,
          message: "Account activated.",
        });
      }
    } catch (error) {
      console.error("activation-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };
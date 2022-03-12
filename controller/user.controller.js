require("dotenv").config();
const User = require("../model/user")
const jwt = require("jsonwebtoken");


exports.Signup = async (req, res) => {
    try {
        const{ country, phone } = req.body;

        // check duplicate phone Number
        const phoneExist = await User.findOne({ phone });

        if (phoneExist) {
            return res.json({
                error: true,
                message: "Phone Number already exist",
            });
        }

            // Create user in our database
            const user = await User.create({
                country, phone
            });

            // Create token
            const token = jwt.sign(
                { user_id: user._id, phone, },
                process.env.TOKEN_KEY,
                {
                expiresIn: "24h",
                }
            );
        // save user token
        user.token = token;
        await user.save();

        //create OTP
        const code = Math.floor(100000 + Math.random() * 900000);  //Generate random 6 digit code.
                
        //save OTP
                user.smsToken = code;
                await user.save();

        // return new user
        return res.status(200).json({
            user,
            success: true,
            message: "Registration Success",
          });
    } 
    catch (error) {
        console.error("signup-error", error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
    }
};
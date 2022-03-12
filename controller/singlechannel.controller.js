const User = require("../model/user");

exports.SingleChannel = async (req, res) => {
    try {
        const{ username } = req.body;
        const channel = await User.findOne({username});
        if (!channel) {
            res.status(404).json({ message: "No channel found with the username"  });
            
        } else {
          return  res.status(200).json(channel);
        }
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error retrieving channel with username=" + channel });
    }
}
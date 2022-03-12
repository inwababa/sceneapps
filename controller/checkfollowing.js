const User = require("../model/user");

exports.Check = async (req, res) => {
    try {
        const { followersId } = req.body

        const follows = await User.find( { followers: [ followersId ] } );

        if(follows.length > 0 ) {
            return res.status(200).json({
                success: true,
                message: "You already followed this user"
              });
        } else {
            return res.status(202).json({ message: "No user found"});
        }
    
    } catch (error) {
        res.status(400).json({ message: "Cannot Check" })
    }
}


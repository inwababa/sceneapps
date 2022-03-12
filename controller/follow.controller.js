//const Follow = require("../model/follow");
const User = require("../model/user");

exports.Follow = async (req, res) => {
    try {

        const { followerId, followingId } = req.body;

        if (followerId === followingId) {
            return res.status(400).json({ message : "You cannot follow yourself"})
        } 

        const whomFollowed = await User.findByIdAndUpdate({ _id: followerId},
            { $push: { following: followingId } }
        );
        const whoFollowedMe = await User.findByIdAndUpdate({ _id: followingId },
            { $push: { followers: followerId } }
        )
        return res.status(200).json({ bool:"true", message: "You followed this user"});

        
    } catch (error) {
        res.status(400).json({ message: "Cannot follow user" })
    }
}

exports.Unfollow = async (req, res) => {
    try {

        const { followerId, followingId } = req.body;

        const whomUnFollowed = await User.findByIdAndUpdate({ _id: followerId },
            { $pull: { following: followingId } }
        );
        const whoUnFollowedMe = await User.findByIdAndUpdate({ _id: followingId },
            { $pull: { followers: followerId } }
        )
        return res.status(200).json({ bool:"true", message: "You unfollowed this user"});
    } catch (error) {
        return res.status(500).json({ message: "User UnFollow Failed" });
    }
};
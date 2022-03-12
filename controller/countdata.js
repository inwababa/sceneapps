const User = require("../model/user");

exports.Count = async (req, res) => {
    try {
        const { id } = req.body

        const followers = await User.find( { followers: [ id ] } ).count();

        const following = await User.find( { followers: [ id ] } ).count();

            return res.status(200).json({ followers, following});
    
    } catch (error) {
        res.status(400).json({ message: "Cannot Check" })
    }
}
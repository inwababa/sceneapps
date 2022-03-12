const User = require("../model/user");

exports.AllChannel = async (req, res) => {
    try{
        const data = await User.find();
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  }
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    
    video: {type: String, required: true}
    // You can also have a userId to store the id of the user whose this tweet belongs to
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const Posts = mongoose.model("posts", postSchema);
module.exports = Posts;
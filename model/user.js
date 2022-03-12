const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: { type: String, sparse:true },
    last_name: { type: String, sparse:true },
    username: { type:String, sparse:true },
    country: { type: String },
    phone: { type: String, index:true, unique:true},
    dob: { type: String, sparse:true },
    active: { type: Boolean, default: false },
    smsToken: { type: String },
    token: { type: String },
    following: {type: Array}, // Store all user id of the people that this user is following in an array.
    followers: {type: Array},
    posts: {
      type: Schema.Types.ObjectId, // Store all posts by this user in an object.
      ref: "Posts" // Link to Post Schema
  } 
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const User = mongoose.model("user", userSchema);
module.exports = User;
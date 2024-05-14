const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },

  username: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepicture: {
    type: String,
    required: false,
  },
  createAt: { type: Date, default: Date.now },
});


module.exports=mongoose.model("User",User);
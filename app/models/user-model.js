const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "the name field is required"],
  },
  email: {
    type: String,
    required: [true, "the email field is required"],
    unique: [true, "this email already exist"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "the password field is required"],
    minlength: [8, "password must be greater than 8 charachter"],
    maxlength: [124, "password must be less than 124 charachter"],
    match: [/^(?=.*\d).*/, "password must include at least one number"],
    match: [
      /^(?=.*[a-z]).*$/,
      "password must include at least one lowercase charachter",
    ],
    match: [
      /^(?=.*[A-Z]).*$/,
      "password must include at least one uppercase charachter",
    ],
    match: [
      /^(?=.*\W).*$/,
      "password must include at least one symbol like (!,%,$,£,@,...)",
    ],
  },
  role: {
    type: String,
    enum: ["client", "owner", "admin"],
    default: "client",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("users", schema);

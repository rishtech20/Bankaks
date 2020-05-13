const mongoose = require("mongoose");
const secret = require("../../config").secret;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: [true, "Phone Number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is a required field"],
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  contacts: [
    {
      name: {
        type: String,
        required: true,
      },
      mob_number: {
        type: Number,
        require: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, secret);

  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

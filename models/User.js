import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  createdAt: {
    type: Number,
    required: true,
  },
});

userSchema.methods.getSignedJwtToken = function () {
  const token = jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;

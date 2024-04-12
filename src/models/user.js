import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: String,
  email: {
    type: String,
    unique: true,
  },
  profileImage: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model("User", userSchema);
export default User;

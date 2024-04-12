import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: Date,
  updatedAt: Date,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  photo: String,
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: Date,
  updatedAT: Date,
});

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;

import express from "express";
import { getTweets, createTweet, createComment, getTweet } from "../controllers/tweetController";

const tweetRouter = express.Router();

tweetRouter.get("", getTweets);
tweetRouter.get("/:tweetId", getTweet);
tweetRouter.post("/create", createTweet);
tweetRouter.post("/:tweetId/create", createComment);

export default tweetRouter;

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import Tweet from "./../models/tweets";
import Comment from "./../models/comments";

//트윗 생성하기
export const createTweet = async (req, res) => {
  const {
    session: { user },
    file,
    body: { formData: content },
  } = req;

  console.log(user);

  try {
    // 1.
    // 이미지 저장(firebase firestore)
    // 저장 후 이미지 url 받음
    if (file) {
      const locationRef = ref(storage, `tweets/${Date.now()}`);
      const metadata = {
        contentType: file.mimetype,
      };
      const snapshot = await uploadBytesResumable(locationRef, file.buffer, metadata);
      // 업로드 된 url
      const url = await getDownloadURL(snapshot.ref);

      // 2.
      // mongoDB에는 이미지url,content저장
      const data = await Tweet.create({
        content,
        writer: user.id,
        photo: url,
        createdAt: Date.now(),
      });
      // 3.
      // ok 리액트에게 result 보내줌
      res.send({ result: true, data });
    }
  } catch (error) {
    console.log(error);
  }
};

// 트윗 불러오기
export const getTweets = async (req, res) => {
  try {
    const data = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "writer",
        select: "avatar username email",
      })
      .populate({
        path: "comments",
        populate: {
          path: "writer",
          select: "avatar username email",
        },
      });

    res.send({ result: true, data });
  } catch (error) {
    console.log(error);
  }
};

//트윗 1개만 불러오기
export const getTweet = async (req, res) => {
  try {
    const {
      params: { tweetId },
    } = req;
    console.log(tweetId);
  } catch (error) {
    console.log(error);
  }
};

//댓글 생성하기
export const createComment = async (req, res) => {
  try {
    const {
      body: { comments },
      params: { tweetId },
      session: {
        user: { id: userId },
      },
    } = req;

    const data = await Comment.create({
      comment: comments,
      writer: userId,
      createdAt: Date.now(),
    });

    await Tweet.findByIdAndUpdate(tweetId, { $push: { comments: data._id } }, { new: true });
    res.send({ result: true, data });
  } catch (error) {
    console.log(error);
  }
};

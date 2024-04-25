import "dotenv/config";
import "./db";
import express from "express";
import userRouter from "./routers/userRouter";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import tweetRouter from "./routers/tweetRouter";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  method: ["GET", "POST"],
};
const PORT = process.env.PORT;
// express 인스턴스 생성
const app = express();

// 미들웨어
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(
  session({
    name: "Session ID",
    secret: "secret",
    resave: false, // 세션이 변경되지 않아도 항상 저장하도록 설정
    saveUninitialized: false, // 초기화되지 않은 세션을 저장소에 저장하지 않도록 설정
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true, // javascript에서 사용이 안되게 하는 옵션
      secure: false, // https를 통해서만 세션 쿠키를 전송하도록 설정
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL + "/yj4-express",
    }),
  })
);

app.use(express.static("build"));

// 라우터
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.use("/users", userRouter);
app.use("/tweets", upload.single("file"), tweetRouter);

// 서버 리스닝
app.listen(PORT, () => console.log(`Server is Listening on http://localhost:${PORT}`));

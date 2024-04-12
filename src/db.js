import mongoose from "mongoose";

// mongodb://localhost:27017 (local)
mongoose.connect(`${process.env.DB_URL}/yj4-tweets`);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected on DB"));

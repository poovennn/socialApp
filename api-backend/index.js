const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/user");
const userAuth = require("./routes/auth");
const userPost = require("./routes/post");
const userConversation = require("./routes/conversation");
const userMessages = require("./routes/messages");

const app = express();
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongoose");
  }
);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/post", userPost);
app.use("/api/conversations", userConversation);
app.use("/api/messages", userMessages);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("backend end is ready");
});

require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");

const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");
const authenticationRouter = require("./routes/authentication.route");
const validateToken = require("./middleware/validateToken");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(parser.urlencoded({extended: true}));

app.use("/api/users", validateToken, userRouter);
app.use("/api/posts", validateToken, postRouter); 
app.use("/", authenticationRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}..`);
});

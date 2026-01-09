console.log("Hello World")

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const authRouter = require("./src/routers/authRouter")
const userProfileRouter = require("./src/routers/userProfileRouter");
const onboardingRouter = require("./src/routers/onboardingRouter");

const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.log("Database not connected ===", error.message)
});

app.use("/api/auth", authRouter);
app.use("/api/user-profile", userProfileRouter);
app.use("/api/activities", onboardingRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Hello from the server" });
});

app.listen(process.env.PORT, () => {
  console.log("listening...")
});
console.log("Hello World")

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
  credentials: true
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
});

const authRouter = require("./src/routers/authRouter")
const userProfileRouter = require("./src/routers/userProfileRouter");
const onboardingRouter = require("./src/routers/onboardingRouter");
const challengeRouter = require("./src/routers/challengeRouter");
const productRouter = require("./src/routers/productRouter");

app.use("/api/auth", authRouter);
app.use("/api/user-profile", userProfileRouter);
app.use("/api/activities", onboardingRouter);
app.use("/api/challenges", challengeRouter);
app.use("/api/products", productRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.log("Database not connected ===", error.message)
});

app.get("/", (req, res) => {
  res.json({ message: "Server is live" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is live
Local: http://localhost:${PORT}
Mobile/Wi-Fi: http://YOUR_COMPUTER_IP:${PORT}`);
});
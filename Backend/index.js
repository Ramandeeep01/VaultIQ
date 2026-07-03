require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./Routes/user");
const vaultRoutes = require("./Routes/vault");
const documentRoutes = require("./Routes/document");
const aiRoutes = require("./Routes/ai");
const chatRoutes = require("./Routes/chat");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/vault", vaultRoutes);
app.use("/document", documentRoutes);
app.use("/ai", aiRoutes);
app.use("/chat", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on PORT ${process.env.PORT} 🚀`
  );
});
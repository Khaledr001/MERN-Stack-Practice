const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routers/api/userRouter");
const connectDB = require("./config/db");

require("dotenv").config();
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Check if api connection is established
app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

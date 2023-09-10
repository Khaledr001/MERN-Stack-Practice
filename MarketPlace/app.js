const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routs/api/userRouts");
const fileRouter = require("./routs/api/file");
const productRoute = require("./routs/api/productRouts");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/file", fileRouter);
app.use("/api/product", productRoute);

module.exports = app;

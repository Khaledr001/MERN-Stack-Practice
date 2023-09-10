const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/User.js");

userRouter.get("/test", (req, res) => {
  res.status(200).send({
    message: "hello",
  });
});

// Create an user
userRouter.post(
  "/add",
  [
    body("fname", "First Name is required").notEmpty(),
    body("lname", "Last Name is required").notEmpty(),
    body("email", "Please enter a valid email").notEmpty().isEmail(),
    body("password", "Enter a minimum 6 length password")
      .notEmpty()
      .isLength({ min: 6 }),
    body("type", "Type is required").notEmpty(),
    body("type", "User type must be admin ar customer").isIn(["admin", "customer"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error(errors.message);
        return res.status(404).json({ errors: errors });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const userObj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        type: req.body.type
      };

      const user = await User(userObj);
      await user.save();
      res.status(200).json({ user: user });
    } catch (error) {
      console.error(error.toString());
    }
  }
);

// Get all user details
userRouter.get("/alluser", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(err.toString());
  }
});

// Login an user
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password, type, refreshToken } = req.body;
    if (!type) {
      return res.status(401).json({ message: "Type is not defined" });
    }
    if (type == "email") {
      await handleEmailLogin(res, email, password);
    } else {
      await handleRefreshLogin(refreshToken, res);
    }
  } catch (err) {
    console.log("hi");
    res.status(500).json({ message: "Something went wrong with your login" });
  }
});

async function handleEmailLogin(res, email, password) {
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    console.log(user);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid Password" });
    } else {
      getUserToken(user, res);
    }
  }
}

async function handleRefreshLogin(refreshToken, res) {
  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      res.status(401).json({ message: "Unothorized" });
    } else {
      const id = payload.id;
      console.log(id);
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        console.log(user);
        getUserToken(user, res);
      }
    }
  });
}

async function getUserToken(user, res) {
  const accessToken = jwt.sign(
    { email: user.email, id: user.id, type: user.type },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  // let userObj = JSON.stringify(user);

  const userObj = user.toJSON();
  console.log(user.id);
  userObj["accessToken"] = accessToken;
  userObj["refreshToken"] = refreshToken;

  res.status(200).json(userObj);
}

module.exports = userRouter;

const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/User");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const authenticateToken = require("../../middleware/auth");
const {body, validationResult} = require("express-validator");


// get a user profile

userRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(err.toString());
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
    // console.log(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(err.toString());
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(err.toString());
  }
});

userRouter.post(
  "/add",
  [
    body('fname', 'First Name is required').notEmpty(),
    body('lname', 'Last Name is required').notEmpty(),
    body('email', 'Please enter a valid email').notEmpty().isEmail(),
    body('age', 'Age is Optional').optional().isNumeric(),
    body('password', 'Minimum length of password is 6').isLength({min: 6}),

  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      console.error(errors.message);
      return res.status(400).json({ errors: errors });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const password = hashedPassword;
    // const password = req.body.password;
    const userObj = await {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      age: req.body.age,
      password: password,
    };

    const user = await UserModel(userObj);
    await user.save();
    res.status(201).json({ user: user });
  } catch (err) {
    console.error(err.toString());
  }
}); 

// Login user

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid password" });
      } else {
        const token = jwt.sign({ email: user.email, id: user._id }, "shhhh");
        const userObj = user.toJSON();
        userObj["accessToken"] = token;
        res.status(200).json(userObj);
      }
    }
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ message: "Something went wrong with your login" });
  }
});

// userRouter.get("")

userRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userBody = req.body;
    const user = await UserModel.findByIdAndUpdate(id, userBody, { new: true });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.toString());
  }
  res.status(200).json({ message: "Updated user" });
});

// Delet an user
userRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: "User Deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.toString());
  }
});

module.exports = userRouter;

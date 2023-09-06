const express = require("express");
const taskRouter = express.Router();
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task");
const authencateToken = require("../middleware/auth");

taskRouter.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello there" });
});

taskRouter.post(
  "/addtask",
  [authencateToken, [body("title", "Title is required").notEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      const id = req.user.id;
      const taskObj = {
        title: req.body.title,
        desc: req.body.desc ?? "",
        userId: id,
        status: "to-do",
      };
      const task = new Task(taskObj);
      await task.save();
      res.status(200).json({ message: "Task added successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

taskRouter.get("/alltask", authencateToken, async (req, res) => {
  try {
    const id = req.user.id;
    const tasks = await Task.find({ userId: id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRouter.put(
  "/status/:id",
  [authencateToken, [body("status", "status is required").notEmpty()],
  [body("status", "status value is not valid").isIn(['to-do', 'in-progress', 'done'])],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      const id = req.params.id;
      const userId = req.user.id;
      const status = req.body.status;
      const task = await Task.findOneAndUpdate(
        { _id: id, userId: userId },
        { status: status },
        {
          new: true,
        }
      );
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

taskRouter.put("/:id", authencateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const body = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: userId },
      body,
      {
        new: true,
      }
    );
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = taskRouter;

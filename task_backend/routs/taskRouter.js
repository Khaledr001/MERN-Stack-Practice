const express = require("express");
const taskRouter = express.Router();
const {body, validationResult} = require('express-validator');
const Task = require("../models/Task");
const authencateToken = require("../middleware/auth");

taskRouter.get('/test', (req, res) => {
    res.status(200).json({message: 'Hello there'});
});


taskRouter.post( 
    '/addtask',
    [
        authencateToken,
        [
            body('title', 'Title is required').notEmpty()
        ]
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array() });
        }
        const id = req.user.id;
        const taskObj = {
            title: req.body.title,
            desc: req.body.desc ?? "",
            userId: id,
            status: 'to-do'
        }
        const task = new Task(taskObj);
        await task.save();
        res.status(200).json({message: 'Task added successfully'});
        }
        catch(err) {
            res.status(500).json({message: err.message});
        }
    }
    
);


module.exports = taskRouter;
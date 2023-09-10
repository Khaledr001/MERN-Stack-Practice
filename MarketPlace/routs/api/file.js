// import express from 'express';
const express = require('express');
const { body, validationResule } = require('express-validator');
const fileRouter = express.Router();
const Product = require("../../models/File.js");
const multer = require('multer');

// const upload = multer({ dest: "./public/files" });

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) { 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });


fileRouter.get('/test', (req, res) => { 
    res.json({
        message: 'Hello file section!'
    });
});

fileRouter.post('/upload', upload.single('file'),async (req, res) => { 
    const fileObj = {
        name: req.file.filename,
        path: req.file.path,
    }
    const file = new File(fileObj);
    await file.save();

    res.status(200).json({ file });
});

module.exports = fileRouter; 

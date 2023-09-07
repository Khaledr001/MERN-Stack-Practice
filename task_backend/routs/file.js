// import express from 'express';
const express = require('express');
const { body, validationResule } = require('express-validator');
const fileRouter = express.Router();
const multer = require('multer');

// const upload = multer({ dest: "./public/files" });

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "./public/files");
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

fileRouter.post('/upload', upload.single('file'), (req, res) => {
    // storage;
    res.status(200).json({ message: 'Upload successful' });
});

module.exports = fileRouter; 

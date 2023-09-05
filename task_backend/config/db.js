const mongoose = require('mongoose');
const { mongodbLocalURL } = require('../secret');

const connectDB = async (options = {}) => {
    try {
        await mongoose.connect(mongodbLocalURL, options);
        console.log('Succesfully connected to db');
        mongoose.connection.on('error', (error) => {
            console.error('Db connection error: ', error);
        });
    }
    catch(error) {
        console.error('could not connect to db',error.toString());
    }
};


module.exports = connectDB;


const mongoose = require('mongoose');
const { mongoDbLocalUrl } = require('../secrete');


const connectDb = async (options = {}) => {
    try { 
        await mongoose.connect(mongoDbLocalUrl, options);
        console.log('Connected to MongoDB');
        mongoose.connection.on('error', (err) => {
            console.error('db connection error', err);
        });
    }
    catch (err) {
        console.error('could not connect to db', err.toString()); 
    }
}

module.exports = connectDb;
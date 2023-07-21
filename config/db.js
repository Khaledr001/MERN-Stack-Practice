const mongoose = require('mongoose');
require("dotenv").config();

const MongoDvUri = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MongoDvUri, {
            useNewUrlParser: true,
        });
        console.log('Connected to MongoDB ');
    } catch (err) {
        console.error(err.message);
    }
};


module.exports = connectDB;
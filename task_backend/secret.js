require('dotenv').config();

const serverPort = process.env.SERVER_PORT;

const mongodbLocalURL = process.env.MONGODB_LOCAL_URL;
 
module.exports = { serverPort, mongodbLocalURL };
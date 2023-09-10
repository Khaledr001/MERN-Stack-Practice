require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 3001;
const mongoDbLocalUrl = process.env.MONGODB_LOCAL_URL;

module.exports = { serverPort, mongoDbLocalUrl }; 
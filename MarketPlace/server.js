const app = require('./app.js');
const connectDb = require('./config/db.js');
const { serverPort } = require('./secrete.js');


app.listen(serverPort, async (req, res) => { 
    console.log(`Server is running on ${serverPort}`);
    await connectDb();
})  
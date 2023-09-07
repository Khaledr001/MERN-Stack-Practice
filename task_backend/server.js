const express = require("express");
const app = express();
const morgan = require("morgan");
const { serverPort } = require("./secret");
const userRouter = require("./routs/userRouter");
const connectDB = require("./config/db");
const taskRouter = require("./routs/taskRouter");
// import fileRouter from ("./routs/file");
const fileRouter = require("./routs/file");

app.use(morgan('dev'));
app.use(express.json());
 
app.use('/api/users', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/file', fileRouter)
  

app.listen(serverPort, async () => {
    console.log(`server is running at http://localhost:` + serverPort);
    await connectDB();
}); 

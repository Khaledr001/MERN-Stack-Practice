const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());


// API methods

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API!'
  })
})

let users = [];
let lastId = 0;

// API to create a new user

app.post('/users', (req, res) => {
  const user = req.body;
  user.id = lastId++;
  users.push(user);
  res.json(user);
})

// API to update an user

app.put('/userss/:id', (req, res) => {
  const id = req.params.id;
  const bodies = req.body;

  const user = users.find(user => user.id == id);
  if (user) {
    user.fname = bodies.fname;
    user.lname = bodies.lname;
    res.json(user);
  }
  else {
    res.status(404).json({message: "user not found"});
  }
});

// API to delete an user

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex(user => user.id == id);
  if (userIndex > -1) {
      // users = users.filter(user => user.id!= id);
      user.splice(userIndex, 1);
      res.json(user);
    }
  else {
      res.status(404).json({message: "user not found"});
    }
});

app.get('/users', (req, res) => {
  res.json(users);
})

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  if(user) {
    res.json(user);
  }
  else {
      res.sendStatus(404).json({message: "user not found"});
    }
})

const port = 6000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Dependencies
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Controllers
const { listUsers, createUser, listUserGoals } = require('./api/controllers/user')

// Constants
const PORT = 8080

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/d66', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get('/api/users', listUsers)
app.get('/api/users/:userFirstName', listUserGoals)

app.post('/api/users', createUser)


app.listen(PORT, function() {
  console.log(`App is running on Port ${PORT}`);
})


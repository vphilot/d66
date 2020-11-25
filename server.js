// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Controllers
const { listUsers, createUser, listUserGoals } = require('./api/controllers/user')

// Constants
const PORT = 8080
const app = express()

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/d66', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get('/api/users', listUsers)
app.get('/api/users/:userFirstName', listUserGoals)

app.post('/api/users', createUser)

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`)
})

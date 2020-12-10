// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

// Routes
const userRouter = require('./api/routes/users/userRoutes')
const goalRouter = require('./api/routes/goals/goalRoutes')

// Constants
const PORT = 8080
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/goals', goalRouter)

mongoose.connect('mongodb://localhost/d66', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`)
})

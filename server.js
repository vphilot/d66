// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// Routes
const userRouter = require('./api/routes/users/userRoutes')

// Constants
const PORT = 8080
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/users', userRouter)

mongoose.connect('mongodb://localhost/d66', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`)
})

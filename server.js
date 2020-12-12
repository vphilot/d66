// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

// Routes
const userRouter = require('./api/routes/users/userRoutes')
const goalRouter = require('./api/routes/goals/goalRoutes')
const entryRouter = require('./api/routes/entries/entryRoutes')
// TODO remove populate route
const populateRouter = require('./api/routes/populate/populateRoutes')

// Constants
const PORT = 8080
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/goals', goalRouter)
app.use('/api/entries', entryRouter)
app.use('/api/populate', populateRouter)

mongoose.connect('mongodb://localhost/d66', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`)
})

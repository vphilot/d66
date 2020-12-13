// Dependencies
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

// Routes
const userRouter = require('./api/routes/users/userRoutes')
const goalRouter = require('./api/routes/goals/goalRoutes')
const entryRouter = require('./api/routes/entries/entryRoutes')

// Constants
const DB_URI = process.env.DB_URI || 'mongodb://localhost/d66'
const PORT = process.env.PORT || '8080'
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/goals', goalRouter)
app.use('/api/entries', entryRouter)

mongoose.connect('mongodb://localhost/d66', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`)
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'))
  app.get('*', (req, res) => {
    console.log(path.join(`${__dirname}/build/index.html`))
    res.sendFile(path.join(`${__dirname}/build/index.html`))
  })
}

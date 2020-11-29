// Dependencies
const mongoose = require('mongoose')

// Models
const GoalSchema = require('../goals/goalModel')

// Constants
const { Schema } = mongoose

// Schemas
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  goals: [GoalSchema],
})

module.exports = mongoose.model('User', UserSchema)

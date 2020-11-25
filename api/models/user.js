// Dependencies
const mongoose = require('mongoose')

// Models
const GoalSchema = require('./goal')

// Constants
const { Schema } = mongoose

// Schemas
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  goals: [GoalSchema],
})

module.exports = mongoose.model('User', UserSchema)

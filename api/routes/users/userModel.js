// Dependencies
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Models
const GoalSchema = require('../goals/goalModel')

// Constants
const { Schema } = mongoose

// Schemas
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  goals: [GoalSchema],
})

// Pre Save Hooks
UserSchema.pre('save', async function (next) {
  const user = this
  try {
    if (user.isModified('password') || user.isNew) {
      user.password = await bcrypt.hash(user.password, 12)
    }
    next()
  } catch (error) {
    next(error)
  }
})

// Model Methods
UserSchema.methods.comparePassword = function (password) {
  const user = this

  return bcrypt.compare(password, user.password)
}

module.exports = mongoose.model('User', UserSchema)

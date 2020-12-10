// Dependencies
const mongoose = require('mongoose')

// Models
const EntrySchema = require('../entries/entryModel')

// Constants
const { Schema } = mongoose

// Schemas
const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  dateCreated: Date,
  entries: [EntrySchema],
})

const GoalModel = mongoose.model('Goal', GoalSchema)

module.exports = { GoalModel, GoalSchema }

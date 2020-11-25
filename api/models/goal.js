// Dependencies
const mongoose = require('mongoose')

// Models
const EntrySchema = require('./entry')

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

module.exports = GoalSchema

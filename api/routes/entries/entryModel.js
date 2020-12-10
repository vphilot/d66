// Dependencies
const mongoose = require('mongoose')

// Constants
const { Schema } = mongoose

// Schemas
const EntrySchema = new Schema({
  date: Date,
  state: {
    type: String,
    enum: ['bad', 'neutral', 'good'],
    default: 'neutral',
  },
})

module.exports = EntrySchema

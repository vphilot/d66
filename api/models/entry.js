// Dependencies
const mongoose = require('mongoose')

// Constants
const { Schema } = mongoose

// Schemas
const EntrySchema = new Schema({
  date: Date,
  state: 'bad'| 'neutral' | 'good',
})

module.exports = EntrySchema
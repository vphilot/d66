// Util
const moment = require('moment')

// Models
const User = require('../users/userModel')

// Controller methods
const getEntries = async (userId, goalId) => {
  try {
    const user = await User.findOne({ _id: userId })
    const goal = await user.goals.id(goalId)
    const { entries } = goal
    return entries
  } catch (err) {
    throw err
  }
}

const createEntry = async (userId, goalId, newEntry) => {
  // TODO why did I make everything a subdoc??
  try {
    const user = await User.findOne({ _id: userId })
    const goal = await user.goals.id(goalId)
    const { entries } = goal

    // using the Find method to discover if there's
    // an existing entry with the same date
    const existingEntryReference = entries.find((entry) => moment(entry.date).isSame(newEntry.date, 'day'))
    // if the New Entry is the same date as an existing one, update it
    if (existingEntryReference) {
      const existingEntry = await goal.entries.id(existingEntryReference._id)
      existingEntry.state = newEntry.state
      await user.save()
      return
    }
    console.log('hit this route')
    // otherwise, proceed with creating new entry
    entries.push(newEntry)
    await user.save()
    return
  } catch (err) {
    throw err
  }
}
module.exports = { getEntries, createEntry }

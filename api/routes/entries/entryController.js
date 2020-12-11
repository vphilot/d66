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

const createEntry = async (newGoal) => {
  try {
    const user = await User.findOne({ _id: newGoal.user })
    user.goals.push(newGoal)
    const updated = await user.save()
    return updated
  } catch (err) {
    throw err
  }
}

const deleteEntry = async (existingGoal) => {
  try {
    const user = await User.findOne({ _id: existingGoal.user })
    // pull is a mongoose method
    user.goals.pull({ _id: existingGoal.id })
    await user.save()
  } catch (err) {
    throw err
  }
}

module.exports = { getEntries, createEntry, deleteEntry }

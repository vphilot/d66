// Models
const User = require('../users/userModel')

// Controller methods
const getUserGoals = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId })
    return user.goals
  } catch (err) {
    throw err
  }
}

const createGoal = async (newGoal) => {
  try {
    const user = await User.findOne({ _id: newGoal.user })
    user.goals.push(newGoal)
    const updated = await user.save()
    return updated
  } catch (err) {
    throw err
  }
}

module.exports = { createGoal, getUserGoals }

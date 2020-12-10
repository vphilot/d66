// Models
const { GoalModel } = require('./goalModel')

// Controller methods
const getGoalsByUSer = async (userId) => {
  try {
    const goals = await GoalModel
      .find({ user: userId })
      .populate({ path: 'user', select: 'firstName lastName' })
    return goals
  } catch (err) {
    throw err
  }
}

const createGoal = async (data) => {
  try {
    console.log(data)
    const newGoal = new GoalModel(data)
    const goal = await newGoal.save()
    return goal.id
  } catch (err) {
    throw err
  }
}

module.exports = { getGoalsByUSer, createGoal }

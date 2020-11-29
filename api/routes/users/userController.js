const User = require('./userModel')

const listUsers = async () => {
  const users = User.find()
  return users
}

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  goals = [],
}) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    goals,
  })
  const user = await newUser.save()
  return user
}

const listUserGoals = async (firstName) => {
  try {
    const user = await User.findOne({ firstName })
      .populate({
        path: 'goals.user',
        model: 'User',
      })
    const userGoals = user.goals
    return userGoals
  } catch (e) {
    throw e
  }
}

module.exports = { listUsers, createUser, listUserGoals }

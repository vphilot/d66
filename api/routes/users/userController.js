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
  } catch (err) {
    throw err
  }
}

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email })
    return user
  } catch (err) {
    throw err
  }
}

const findUserById = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (err) {
    throw err
  }
}

module.exports = {
  listUsers,
  createUser,
  listUserGoals,
  findUserByEmail,
  findUserById,
}

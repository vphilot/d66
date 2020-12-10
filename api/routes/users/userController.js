// Models
const User = require('./userModel')

// Controller Methods
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
  createUser,
  findUserByEmail,
  findUserById,
}

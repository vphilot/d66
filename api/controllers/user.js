const User = require('../models/user')

const listUsers = (req, res) => {
  User.find()
    .then((records) => (
      res.send(records)
    ))
}

const createUser = (req, res, next) => {
  const user = new User(req.body)
  user.save()
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err))
}

const listUserGoals = async (req, res) => {
  const { userFirstName } = req.params
  const user = await User.findOne({ firstName: userFirstName })
    .populate({
      path: 'goals.user',
      model: 'User',
    })
  const userGoals = user.goals
  res.send(userGoals)
}

module.exports = { listUsers, createUser, listUserGoals }

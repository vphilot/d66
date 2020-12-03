// Dependencies
const express = require('express')

// Controllers
const {
  listUsers,
  createUser,
  listUserGoals,
  findUserByEmail,
} = require('./userController')

// Helpers
const validateInput = (input) => {
  if (input && input !== ' ') {
    return true
  }
  return false
}

const checkForExistingEmail = async (email) => {
  return await findUserByEmail(email)
}

// Constants
const router = express.Router()

// Routes
router.route('/')
  .get(async (req, res) => {
    const users = await listUsers()
    res.json({ data: users })
  })

router.route('/:firstName')
  .get(async (req, res) => {
    try {
      const goals = await listUserGoals(req.params.firstName)
      res.send({ data: { goals } })
    } catch (e) {
      res.status(400).json({ message: `user ${req.params.firstName} not found` })
    }
  })

router.route('/')
  // double verification on the back end, already validating on the UI
  .post(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body

    if (
      validateInput(firstName)
      && validateInput(lastName)
      && validateInput(email)
      && validateInput(password)
    ) {
      try {
        // check if the email is already in use
        if (checkForExistingEmail) {
          res.status(400).json({message: 'email already in use'})
          return
        }
        // if not in use, procceed with user creation
        const user = await createUser({ ...req.body })
        res.json({ data: { id: user._id } })
      } catch (e) {
        // 500 = database error
        res.status(500).json({message: 'internal server error'})
      }
    }
    // TODO return falsy route
  })

module.exports = router

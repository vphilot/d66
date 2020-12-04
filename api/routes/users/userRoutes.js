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
      return res.send({
        data: { goals },
      })
    } catch (e) {
      return res.status(400).json({ 
        message: `user ${req.params.firstName} not found`,
      })
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
        const isEmailAlreadyUsed = await findUserByEmail(email)
        if (isEmailAlreadyUsed) {
          return res.status(400).json({
            message: 'email already in use',
          })
        }
        // if not in use, procceed with user creation
        const user = await createUser({ ...req.body })
        return res.json({ data: { id: user._id } })
      } catch (e) {
        // 500 = database error
        return res.status(500).json({
          message: 'internal server error',
        })
      }
    }
    // validation failed
    return res.status(400).json({
      messsage: 'input validation failed',
    })
  })

router.route('/login')
  .post(async (req, res) => {
    const {
      email,
      password,
    } = req.body

    if (
      validateInput(email)
      && validateInput(password)
    ) {
      try {
        const user = await findUserByEmail(email)
        // user not found in DB
        if (!user) {
          return res.status(400).json({
            message: 'password and email do not match',
          })
        }
        const isPasswordMatch = await user.comparePassword(password)
        // password match failed
        if (!isPasswordMatch) {
          return res.status(400).json({
            message: 'password and email do not match',
          })
        }
        // TODO implement token validation
        res.status(200).json({
          message: 'logged in successfully',
        })
      } catch (e) {
        console.log(e)
      }
    }
    // validation failed
    return res.status(400).json({
      messsage: 'input validation failed',
    })
  })

module.exports = router

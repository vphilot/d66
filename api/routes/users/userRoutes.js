// Dependencies
const express = require('express')

// Controllers
const { listUsers, createUser, listUserGoals } = require('./userController')

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
  .post(async (req, res) => {
    const user = await createUser({ ...req.body })
    res.json({ data: { id: user._id } })
  })

module.exports = router

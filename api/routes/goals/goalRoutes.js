// Dependencies
const express = require('express')

// Middleware
const verifyToken = require('../../middleware/verifyToken')

// Controllers
const { createGoal, getUserGoals, deleteGoal } = require('./goalController')

// Helpers

// Constants
const router = express.Router()
router.use(verifyToken)

// Routes
router.route('/')
  .get(async (req, res) => {
    try {
      const goals = await getUserGoals(req.user.id)
      res.json({ data: goals })
    } catch (err) {
      res.status(500).json({
        message: 'error fetching user goals',
      })
    }
  })

router.route('/')
  .post(async (req, res) => {
    try {
      const { body } = req
      if (!body.title || body.title === '') {
        return res.status(400).json({
          message: 'request body text must be provided',
        })
      }
      const newGoal = {
        user: req.user.id,
        title: body.title,
        description: body.description,
        dateCreated: new Date(),
      }
      const updated = await createGoal(newGoal)
      res.json({ data: updated })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'error creating new goal',
      })
    }
  })

router.route('/')
  .delete(async (req, res) => {
    try {
      const { body } = req
      if (!body.id || body.id === '') {
        return res.status(400).json({
          message: 'current goal Id must be provided',
        })
      }
      const existingGoal = {
        user: req.user.id,
        id: body.id,
      }
      await deleteGoal(existingGoal)
      res.json({ data: existingGoal.id })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'error deleting goal',
      })
    }
  })

module.exports = router

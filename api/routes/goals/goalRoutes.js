// Dependencies
const express = require('express')

// Middleware
const verifyToken = require('../../middleware/verifyToken')

// Controllers
const { getGoalsByUSer, createGoal } = require('./goalController')

// Helpers

// Constants
const router = express.Router()

// Routes
router.route('/')
  .get(async (req, res) => {
    try {
      const goals = await getGoalsByUSer(req.user.id)
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
      // if (!body.text || body.text === '') {
      //   res.status(400).json({
      //     message: 'request body text must be provided',
      //   })
        const newGoal = {
          user: body.user.id,
          title: body.title,
          description: body.description,
          dateCreated: new Date(),
          entries: [],
        }
        const id = await createGoal(newGoal)
        res.json({ data: {id} })
        // TODO - ISSUE - DO I NEED A MODEL FOR THIS?
      // }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'error creating new goal',
      })
    }
  })

module.exports = router

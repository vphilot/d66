// Dependencies
const express = require('express')

// Middleware
const verifyToken = require('../../middleware/verifyToken')

// Controllers
const { getEntries, createEntry } = require('./entryController')

// Helpers

// Constants
const router = express.Router()
router.use(verifyToken)

// Routes
router.route('/:goalId')
  .get(async (req, res) => {
    try {
      const { params } = req
      const entries = await getEntries(req.user.id, params.goalId)
      res.json({ data: entries })
    } catch (err) {
      res.status(500).json({
        message: 'error fetching entries',
      })
    }
  })

router.route('/:goalId')
  .post(async (req, res) => {
    try {
      const { params } = req
      const { body } = req
      if (!body.date || !body.state) {
        return res.status(400).json({
          message: 'date and state must be provided!',
        })
      }
      const newEntry = {
        date: body.date,
        state: body.state,
      }
      await createEntry(req.user.id, params.goalId, newEntry)
      res.status(200).json({
        message: 'new entry created successfuly',
      })
    } catch (err) {
      res.status(500).json({
        message: 'error fetching entries',
      })
    }
  })

module.exports = router

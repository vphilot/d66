// Dependencies
const express = require('express')

// Middleware
const verifyToken = require('../../middleware/verifyToken')

// Controllers
const { getEntries, createEntry, deleteEntry } = require('./entryController')

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
        status: body.status,
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

// router.route('/')
//   .post(async (req, res) => {
//     try {
//       const { body } = req
//       if (!body.title || body.title === '') {
//         return res.status(400).json({
//           message: 'request body text must be provided',
//         })
//       }
//       const newGoal = {
//         user: req.user.id,
//         title: body.title,
//         description: body.description,
//         dateCreated: new Date(),
//       }
//       const updated = await createGoal(newGoal)
//       res.json({ data: updated })
//     } catch (err) {
//       console.log(err)
//       res.status(500).json({
//         message: 'error creating new goal',
//       })
//     }
//   })

// router.route('/')
//   .delete(async (req, res) => {
//     try {
//       const { body } = req
//       if (!body.id || body.id === '') {
//         return res.status(400).json({
//           message: 'current goal Id must be provided',
//         })
//       }
//       const existingGoal = {
//         user: req.user.id,
//         id: body.id,
//       }
//       await deleteGoal(existingGoal)
//       res.json({ data: existingGoal.id })
//     } catch (err) {
//       console.log(err)
//       res.status(500).json({
//         message: 'error deleting goal',
//       })
//     }
//   })

module.exports = router

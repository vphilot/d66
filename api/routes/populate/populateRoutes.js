// Dependencies
const express = require('express')

// Util
const moment = require('moment')

// Models
const User = require('../users/userModel')

// Constants
const router = express.Router()
const goalsIds = [
  '5fd4cd2dc038c002e9590eba',
  '5fd4cd32c038c002e9590ebb',
  '5fd4cd35c038c002e9590ebc',
  '5fd4cd38c038c002e9590ebd',
  '5fd4cd3cc038c002e9590ebe',
  '5fd4d16bc038c002e9590ebf',
  '5fd4dfa7e4db350ec3c01c71',
]
const userId = '5fcfdf268841c67a68f5d063'

// helper function to get all dates
const getDaysBetweenDates = (startDate, endDate) => {
  const dateArray = []
  let currentDate = startDate

  while (currentDate.isBefore(endDate)) {
    dateArray.push(currentDate.toDate())
    currentDate = currentDate.add(1, 'days')
  }
  return dateArray
}

// helper function to generate random state
const generateRandomState = () => {
  const acceptedStates = ['bad', 'neutral', 'good']
  return acceptedStates[Math.floor(Math.random() * acceptedStates.length)]
}

// Populate functions
const createEntries = async (goalId) => {
  try {
    const user = await User.findOne({ _id: userId })
    const goal = await user.goals.id(goalId)
    const { entries } = goal

    // entries.push(newEntry)
    await user.save()
    return
  } catch (err) {
    throw err
  }
}

// Routes
router.route('/')
  .post(async (req, res) => {
    try {
      // const { params } = req
      // const { body } = req
      // if (!body.date || !body.state) {
      //   return res.status(400).json({
      //     message: 'date and state must be provided!',
      //   })
      // }
      // const newEntry = {
      //   date: body.date,
      //   state: body.state,
      // }
      // await createEntries(req.user.id, params.goalId, newEntry)
      const dates = getDaysBetweenDates(moment('2020-01-01'), moment())

      const user = await User.findOne({ _id: userId })

      goalsIds.map(async (goalId) => {
        try {
          const goal = await user.goals.id(goalId)
          const { entries } = goal

          dates.map((dateEntry) => {
            entries.push({
              date: dateEntry,
              state: generateRandomState(),
            })
          })
        } catch (err) {
          console.log(err)
        }
      })

      await user.save()
      res.status(500).json({
        message: 'populated all entries successfully!',
      })
    } catch (err) {
      res.status(500).json({
        message: 'error populating all entries',
      })
    }
  })

module.exports = router

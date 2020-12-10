// Dependencies
import React, { FunctionComponent, useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import { Grid, Button } from '@material-ui/core'

// Internal Components
import AddGoal from '../../Goals/AddGoal'
import GoalItem from '../../Goals/GoalItem'
import AppBar from '../../Molecules/AppBar'
import Tip from '../../Molecules/Tip'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  main: {},
}))

// Types
type MainProps = {
  setUser: React.Dispatch<any>,
}

const Main: FunctionComponent<MainProps> = ({ setUser }) => {
  const [goals, setGoals] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals')
      const jsonResponse = await response.json()
      setGoals(jsonResponse.data)
    } catch (err) {
      console.error('Fetching all user goals failed with the error', err)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  return (
    <>
      <AppBar setUser={setUser} />
      {/* handle adding a new goal */}
      <AddGoal fetchGoals={() => fetchGoals()} />
      {/* display all goals */}
      { goals
      && goals
        .sort((a, b) => a.dateCreated < b.dateCreated)
        .map((goal, index) => (
          <React.Fragment key={goal._id}>
            <GoalItem
              id={goal._id}
              title={goal.title}
              description={goal.description}
              dateCreated={goal.dateCreated}
              entries={goal.entries}
              fetchGoals={() => fetchGoals()}
            />
            { index === 0
            && <Tip />}
          </React.Fragment>
        ))}
    </>
  )
}

export default Main

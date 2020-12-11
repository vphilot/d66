// Dependencies
import React, { FunctionComponent, useState } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import {
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core'

// Util
import { validateInputHelper } from '../../../util/helpers'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  addGoalForm: {
    '& .MuiFormControl-fullWidth': {
      marginTop: `${theme.spacing.base}px`,
    },
  },
  addGoalContainer: {
    padding: `${theme.spacing.base * 2}px`,
  },
  buttonContainer: {
    paddingTop: `${theme.spacing.base}px`,
  },
}))

// Types
type AddGoalProps = {
  fetchGoals:any,
}

const AddGoal:FunctionComponent<AddGoalProps> = ({ fetchGoals }) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState(null)

  const handleAddGoal = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          dateCreated: new Date(),
        }),
      })
      const jsonResponse = await response.json()
      if (!response.ok) {
        setError(jsonResponse.message)
        return
      }
      // happy path
      // fetch all goals on parent component
      fetchGoals()
      setIsAdding(false)
      setTitle('')
      setDescription('')
    } catch (err) {
      console.error('Create goal failed with error: ', err)
      throw err
    }
  }

  return (
    <>
      <form className={classes.addGoalForm} onSubmit={handleAddGoal}>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={8} lg={6} className={classes.addGoalContainer}>
            {
              isAdding
                ? (
                  <>
                    <Typography variant="h4" component="h2">
                      Add a new goal
                    </Typography>
                    <TextField
                      id="title"
                      label="title"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                      id="description"
                      label="description"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Grid container spacing={2} className={classes.buttonContainer}>
                      <Grid item xs={6} md={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          fullWidth
                          disableRipple
                          disabled={
                            !(
                              validateInputHelper('generic', title)
                              && !error
                            )
                          }
                        >
                          Continue
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )
                : (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="button"
                          fullWidth
                          disableRipple
                          onClick={() => setIsAdding(!isAdding)}
                        >
                          Add Goal
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )
                }
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default AddGoal

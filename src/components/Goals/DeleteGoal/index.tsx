/* eslint-disable max-len */
// Dependencies
import React, { FunctionComponent, useState } from 'react'
import { createUseStyles } from 'react-jss'

// External components
import {
  Grid,
  Typography,
  Button,
} from '@material-ui/core'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  title: {
    paddingBottom: `${theme.spacing.base / 2}px`,
  },
  buttonContainer: {
    paddingTop: `${theme.spacing.base}px`,
  },
}))

// Types
type DeleteGoalProps = {
  setIsDeleting:React.Dispatch<React.SetStateAction<boolean>>,
  handleDeleteGoal: any,
  goalTitle: string,
}

const DeleteGoal:FunctionComponent<DeleteGoalProps> = ({ setIsDeleting, goalTitle, handleDeleteGoal }) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        Danger Zone
      </Typography>
      <Typography variant="body1" component="p" className={classes.title}>
        Deleting
        {' '}
        <strong>{ goalTitle }</strong>
        {' '}
        will also delete all of its corresponding past past data. It will also disappear from your timeline and there’s currently no way of getting it back
        {' '}
        <span role="img" aria-label="danger emoji">🥵</span>
        {' '}
        . Are you sure?
      </Typography>
      <Grid container spacing={2} className={classes.buttonContainer}>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            fullWidth
            disableRipple
            onClick={() => setIsDeleting(false)}
          >
            Go back
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            fullWidth
            disableRipple
            onClick={() => handleDeleteGoal()}
          >
            Delete it!
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default DeleteGoal

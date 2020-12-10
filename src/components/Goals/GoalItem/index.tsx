// Dependencies
import React, { FunctionComponent, useState } from 'react'
import { createUseStyles } from 'react-jss'

// External components
import {
  Grid,
  Typography,
} from '@material-ui/core'

// Util
import { generateStringFromDate } from '../../../util/helpers'

// Data Access
import { Goal } from '../../../models'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  goalItemContainer: {
    marginBottom: `${theme.spacing.base}px`,
  },
  goalItem: {
    padding: `${theme.spacing.base * 2}px`,
    border: `1px solid ${theme.colors.red}`,
  },
  title: {
    paddingBottom: `${theme.spacing.base / 2}px`,
  },
  description: {
    paddingBottom: `${theme.spacing.base / 4}px`,
  },
  dateCreated: {
    paddingBottom: `${theme.spacing.base / 2}px`,
  },
}))

const GoalItem:FunctionComponent<Goal> = ({
  title,
  description,
  dateCreated,
  entries = [],
}) => {
  const classes = useStyles()

  return (
    <Grid container justify="center" className={classes.goalItemContainer}>
      <Grid item xs={12} sm={12} md={8} lg={6} className={classes.goalItem}>
        <Typography variant="h4" component="h2" className={classes.title}>
          { title }
        </Typography>
        <Typography variant="body1" component="p" className={classes.description}>
          { description }
        </Typography>
        <Typography variant="caption" component="p" className={classes.dateCreated}>
          created on
          {' '}
          { console.log(dateCreated) }
          { generateStringFromDate(new Date(dateCreated)) }
        </Typography>
        <p>
          entries:
          {entries}
        </p>
      </Grid>
    </Grid>
  )
}

export default GoalItem

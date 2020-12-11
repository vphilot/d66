// Dependencies
import React, { FunctionComponent, useState } from 'react'
import { createUseStyles } from 'react-jss'

// External components
import {
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core'

// Icons
import CloseIcon from '@material-ui/icons/Close'

// Internal components
import DeleteGoal from '../DeleteGoal'
import Entry from '../../Entry'

// Util
import { generateStringFromDate } from '../../../util/helpers'

// Data Access
import { Goal, Entry as EntryType } from '../../../models'

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
    position: 'relative',
  },
  title: {
    paddingBottom: `${theme.spacing.base / 2}px`,
  },
  dateCreated: {
    paddingBottom: `${theme.spacing.base / 2}px`,
  },
  description: {
    paddingBottom: `${theme.spacing.base / 4}px`,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: theme.spacing.base * 2,
    right: theme.spacing.base * 2,
  },
}))

interface GoalItemProps extends Goal {
  fetchGoals?: any,
}

const GoalItem:FunctionComponent<GoalItemProps> = ({
  id,
  title,
  description,
  dateCreated,
  entries = new Array<EntryType>(),
  fetchGoals = null,
}) => {
  const classes = useStyles()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)

  const handleDeleteGoal = async () => {
    try {
      const response = await fetch('/api/goals', {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const jsonResponse = await response.json()
      if (!response.ok) {
        setError(jsonResponse.message)
        return
      }
      // happy path
      // fetch all goals on parent component
      fetchGoals()
    } catch (err) {
      console.error('Delete goal failed with error: ', err)
      throw err
    }
  }

  return (
    <Grid container justify="center" className={classes.goalItemContainer}>
      <Grid item xs={12} sm={12} md={8} lg={6} className={classes.goalItem}>
        { isDeleting
          ? (
            <DeleteGoal
              setIsDeleting={setIsDeleting}
              handleDeleteGoal={handleDeleteGoal}
              goalTitle={title}
            />
          )
          : (
            <>
              <Typography variant="h4" component="h2" className={classes.title}>
                { title }
              </Typography>
              <Typography variant="caption" component="p" className={classes.dateCreated}>
                created on
                {' '}
                { generateStringFromDate(dateCreated) }
              </Typography>
              <Typography variant="body1" component="p" className={classes.description}>
                { description }
              </Typography>
              <Entry goalId={id} entries={entries} />
              <div className={classes.closeButtonContainer}>
                <IconButton
                  color="primary"
                  aria-label="delete"
                  onClick={() => setIsDeleting(!isDeleting)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </>
          )}
      </Grid>
    </Grid>
  )
}

export default GoalItem

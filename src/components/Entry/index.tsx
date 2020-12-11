// Dependencies
import React, { FunctionComponent, useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import { Grid, Button, Typography } from '@material-ui/core'
import DayPicker from 'react-day-picker/DayPicker'
import 'react-day-picker/lib/style.css'

// Util
import moment from 'moment'

// Style Components
import { D66ThemeType } from '../../styles/Theme'

// Icons
import { SadIcon, NeutralIcon, HappyIcon } from '../Icons'

// Data Access
import { Entry as EntryType } from '../../models'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  heading: {
    marginTop: `${theme.spacing.base}px !important`,
    paddingTop: `${theme.spacing.base}px`,
    borderTop: '1px solid red',
  },
  entryButton: {
    color: theme.colors.dark,
    opacity: '0.7',
    '& .MuiButton-label': {
      padding: '10px',
      textAlign: 'left',
      lineHeight: '100%',
    },
    '& svg': {
      marginRight: '20px',
      width: '24px',
      height: '24px',
    },
  },
  sad: {
    backgroundColor: `${theme.colors.orange} !important`,
  },
  neutral: {
    backgroundColor: `${theme.colors.blue} !important`,
  },
  happy: {
    backgroundColor: `${theme.colors.green} !important`,
  },
}))

// Helpers

// Types
export type EntryProps = {
  goalId: string,
  entries: Array<EntryType>
}

const Entry:FunctionComponent<EntryProps> = ({
  goalId,
  entries = new Array<EntryType>(),
}) => {
  const classes = useStyles()
  const [currentDate, setCurrentDate] = useState(null)
  const [currentState, setCurrentState] = useState(null)

  const addEntry = async (e) => {
    e.preventDefault()
    console.log('adding entry')
    try {
      const response = await fetch(`/api/entries/${goalId}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          date: currentDate,
          state: currentState,
        }),
      })
      const jsonResponse = await response.json()
      alert('new entry created!')
      return
    } catch (err) {
      console.error('error creating a new entry', err)
    }
  }

  return (
    <>
      <Typography variant="h5" component="h2" className={classes.heading}>
        How did you do today?
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DayPicker
            onDayClick={(day) => setCurrentDate(day)}
            disabledDays={{ after: new Date() }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            className={`${classes.entryButton} ${classes.sad}`}
            onClick={() => setCurrentState('bad')}
          >
            <SadIcon />
            could be better
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            className={`${classes.entryButton} ${classes.neutral}`}
            onClick={() => setCurrentState('neutral')}
          >
            <NeutralIcon />
            tried my best
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            className={`${classes.entryButton} ${classes.happy}`}
            onClick={() => setCurrentState('good')}
          >
            <HappyIcon />
            {'I\'m a rockstar'}
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            className={`${classes.entryButton}`}
            onClick={addEntry}
          >
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Entry

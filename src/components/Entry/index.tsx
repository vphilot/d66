// Dependencies
import React, { FunctionComponent, useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import {
  Grid,
  Button,
  Typography,
  ButtonBase,
} from '@material-ui/core'
import DayPicker from 'react-day-picker/DayPicker'
import 'react-day-picker/lib/style.css'

// Util
import moment from 'moment'

// Icons
import CalendarTodaySharpIcon from '@material-ui/icons/CalendarTodaySharp'
import { SadIcon, NeutralIcon, HappyIcon } from '../Icons'

// Style Components
import { D66ThemeType } from '../../styles/Theme'

// Data Access
import { Entry as EntryType } from '../../models'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  // TODO override these buttons more elegantly
  heading: {
    marginTop: `${theme.spacing.base}px !important`,
    paddingTop: `${theme.spacing.base * 2}px`,
    borderTop: `1px solid ${theme.colors.red}`,
  },
  toggleCalendar: {
    fontSize: 'inherit',
    verticalAlign: 'unset !important',
    borderBottom: `2px solid ${theme.colors.red} !important`,
    '& svg': {
      width: '17px',
      height: '17px',
      marginRight: '5px',
      marginLeft: '5px',
    },
  },
  dayPickerContainer: {
    paddingTop: `${theme.spacing.base}px`,
  },
  buttonsContainer: {
    paddingTop: `${theme.spacing.base * 2}px`,
  },
  entryButton: {
    opacity: '0.55',
    '& svg': {
      marginRight: '20px',
      width: '24px',
      height: '24px',
    },
    '&.selected, &.selected:hover': {
      boxShadow: theme.boxShadow,
      opacity: '1',
    },
    '& .MuiButton-label': {
      padding: '20px 1px 20px 10px',
      textAlign: 'left',
      lineHeight: '100%',
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
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMoodState, setcurrentMoodState] = useState(null)
  const [isPickingNewDate, setIsPickingNewDate] = useState(false)

  const addEntry = async (e?:React.MouseEvent<HTMLElement>) => {
    // deciding between updating an entry or
    // adding a new one is handled by
    // the back end
    if (e) e.preventDefault()
    console.log('adding entry')
    try {
      const response = await fetch(`/api/entries/${goalId}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          date: currentDate,
          state: currentMoodState,
        }),
      })
      const jsonResponse = await response.json()
      console.log('new entry created / updated !')
      return
    } catch (err) {
      console.error('error creating a new entry', err)
    }
  }

  useEffect(() => {
    if (currentMoodState && currentDate) {
      addEntry()
    }
  }, [currentDate, currentMoodState])

  return (
    <>
      <Typography variant="h5" component="h2" className={classes.heading}>
        How did you do
        {' '}
        <ButtonBase
          disableRipple
          disableTouchRipple
          className={classes.toggleCalendar}
          onClick={() => setIsPickingNewDate(true)}
        >
          <CalendarTodaySharpIcon />
          {
            moment(currentDate).isSame(new Date(), 'day')
              ? 'today'
              : `on ${moment(currentDate).format('ddd, MMM Do')}`
          }
          {' '}
          ?
        </ButtonBase>
      </Typography>
      {/* conditional rendering for date picker */}
      { isPickingNewDate
      && (
      <Grid container className={classes.dayPickerContainer}>
        <Grid item xs={12}>
          <DayPicker
            selectedDays={currentDate}
            disabledDays={{ after: new Date() }}
            onDayClick={
              (day) => {
                setCurrentDate(day)
                setcurrentMoodState(null)
                setIsPickingNewDate(false)
              }
            }
          />
        </Grid>
      </Grid>
      )}
      <Grid container className={classes.buttonsContainer} spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            disableElevation
            disableRipple
            className={`
            ${classes.entryButton} 
            ${classes.sad}
            ${currentMoodState === 'bad' ? 'selected' : ''}
              `}
            onClick={() => setcurrentMoodState('bad')}
          >
            <SadIcon />
            could be better
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            disableElevation
            disableRipple
            className={`
            ${classes.entryButton} 
            ${classes.neutral}
            ${currentMoodState === 'neutral' ? 'selected' : ''}
              `}
            onClick={() => setcurrentMoodState('neutral')}
          >
            <NeutralIcon />
            <span>tried my best</span>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            disableElevation
            disableRipple
            className={`
            ${classes.entryButton} 
            ${classes.happy}
            ${currentMoodState === 'good' ? 'selected' : ''}
              `}
            onClick={() => setcurrentMoodState('good')}
          >
            <HappyIcon />
            {'I\'m a rockstar'}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Entry

// Dependencies
import React, { FunctionComponent, useState } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import { Grid, Button } from '@material-ui/core'
import DayPicker from 'react-day-picker/DayPicker'
import 'react-day-picker/lib/style.css'

// Style Components
import { D66ThemeType } from '../../styles/Theme'

// Icons
import { SadIcon, NeutralIcon, HappyIcon } from '../Icons'

// Data Access
import { Entry as EntryType } from '../../models'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  entryButton: {
    color: theme.colors.dark,
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
  const [currentEntry, setCurrentEntry] = useState({ date: null, state: null })

  const getEntries = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const response = await fetch(`/api/entries/${goalId}`)
      const jsonResponse = await response.json()
      console.log(jsonResponse.data)
    } catch (err) {
      console.error('error fetching entries', err)
    }
  }

  return (
    <>
      <div>
        <p>{ goalId }</p>
        { entries.map((entry) => <p key={entry.date.toString()}>{entry.state}</p>)}
        <button type="button" onClick={getEntries}>Get Entries</button>
      </div>
      <Grid container>
        <DayPicker onDayClick={(day) => setCurrentEntry({ date: day, state: null })} />
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            className={`${classes.entryButton} ${classes.sad}`}
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

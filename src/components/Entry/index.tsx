// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import { Grid, Button } from '@material-ui/core'

// Style Components
import { D66ThemeType } from '../../styles/Theme'

// Icons
import { SadIcon, NeutralIcon, HappyIcon } from '../Icons'

// Data Access
import { Entry as EntryType } from '../../models'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  entry: {
    color: theme.colors.red,
  },
}))

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
      <div className={classes.entry}>
        <p>{ goalId }</p>
        { entries.map((entry) => <p key={entry.date.toString()}>{entry.state}</p>)}
        <button type="button" onClick={getEntries}>Get Entries</button>
      </div>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
          >
            <SadIcon />
            <NeutralIcon />
            <HappyIcon />
            could be better
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Entry

// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'

// Internal Components
import { D66ThemeType } from '../../styles/Theme'
import Entry, { EntryType } from '../Entry'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  entry: {
    color: theme.colors.red,
  },
}))

// Types
type GoalType = {
  title: string,
  description: string,
  dateCreated: Date,
  entries: Array<EntryType>
}

const Goal:FunctionComponent<GoalType> = ({
  title,
  description,
  dateCreated,
  entries,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.entry}>
      <p>{ `goal title: ${title}` }</p>
      <p>{ `goal description: ${description}` }</p>
      <p>{ `date created: ${dateCreated.toString()}` }</p>
      <p>Entries: </p>
      {
        entries && entries.map((entry) => (
          <Entry
            key={entry.date.toString()}
            date={entry.date}
            state={entry.state}
          />
        ))
      }
    </div>
  )
}

export default Goal

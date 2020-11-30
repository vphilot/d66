// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'

// Internal Components
import { D66ThemeType } from '../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  entry: {
    color: theme.colors.red,
  },
}))

// Types
export type EntryType = {
  date: Date,
  state: string,
}

const Entry:FunctionComponent<EntryType> = ({
  date,
  state,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.entry}>
      <p>{ date }</p>
      <p>{ state }</p>
    </div>
  )
}

export default Entry

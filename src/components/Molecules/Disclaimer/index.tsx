// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import { Typography } from '@material-ui/core'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme:D66ThemeType) => ({
  disclaimer: {
    position: 'fixed',
    bottom: `${theme.spacing.base}px`,
    opacity: 0.5,
  },
}))

const Disclaimer:FunctionComponent = () => {
  const classes = useStyles()

  return (
    <Typography variant="caption" className={classes.disclaimer}>
      This app does not sell your data or uses it to undermine democracy.
    </Typography>
  )
}

export default Disclaimer

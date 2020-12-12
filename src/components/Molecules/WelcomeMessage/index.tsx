// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'

// Util
import moment from 'moment'

// External Components
import { Grid, Typography, Button } from '@material-ui/core'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Internal Components

// Styles
const useStyles = createUseStyles((theme:D66ThemeType) => ({
  welcomeMessageContainer: {
    paddingTop: `${theme.spacing.base * 2}px`,
    '& h1, & p': {
      whiteSpace: 'break-spaces',
    },
    '& h1': {
      marginBottom: `${theme.spacing.base * 1.5}px`,
      lineHeight: '110%',
    },
    '& h2': {
      marginBottom: `${theme.spacing.base}px`,
      lineHeight: '110%',
    },
    '& p': {
      marginBottom: `${theme.spacing.base}px`,
    },
  },
}))

const WelcomeMessage:FunctionComponent = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container justify="center" spacing={2} className={classes.welcomeMessageContainer}>
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <Typography variant="h2" component="h1">
            Welcome!
          </Typography>
          <Typography variant="h4" component="h2">
            { moment(new Date()).format('dddd') }
            {' '}
            is the best day to start a new habit.
          </Typography>
          <Typography variant="body1">
            {/* eslint-disable-next-line max-len */}
            Consistency is key to every lasting success and in building habits. With d66 you can create repeating objectives and tasks within seconds and track performance over time.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default WelcomeMessage

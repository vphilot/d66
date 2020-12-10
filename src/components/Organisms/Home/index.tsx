// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'
import { useHistory, Link } from 'react-router-dom'

// External Components
import { Grid, Typography, Button } from '@material-ui/core'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Internal Components
import Logo from '../../Molecules/Logo'
import Disclaimer from '../../Molecules/Disclaimer'

// Styles
const useStyles = createUseStyles((theme:D66ThemeType) => ({
  homeContainer: {
    '& h1, & p': {
      whiteSpace: 'break-spaces',
    },
    '& h1': {
      marginBottom: `${theme.spacing.base * 1.5}px`,
      lineHeight: '110%',
    },
    '& p': {
      marginBottom: `${theme.spacing.base}px`,
    },
  },
  buttonContainer: {
    padding: `${theme.spacing.base}px 0`,
  },
  disclaimer: {
    position: 'fixed',
    bottom: `${theme.spacing.base}px`,
  },
}))

const Home:FunctionComponent = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <Logo />
      <Grid container spacing={2} className={classes.homeContainer}>
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <Typography variant="h2" component="h1">
            Changing is hard.
            <br />
            Maybe impossible.
          </Typography>
          <Typography variant="body1">
            A study published in 2009 by the European Journal of Social Psychology concluded
            the average time it takes to form a new habit (or change an old one) is 66 days.
          </Typography>
          <Typography variant="body1">
            <strong>d66 </strong>
            is a platform to help you keep track of small changes of habit
            through this hard journey we call like to call adulthood.
          </Typography>
          <Grid container spacing={2} className={classes.buttonContainer}>
            <Grid item xs={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableRipple
                onClick={() => history.push('/signup')}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={6} md={4}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                disableRipple
              >
                Take a tour
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body1">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            Already have an account? <Link to="/login">Log in here</Link>.
          </Typography>
        </Grid>
      </Grid>
      <Disclaimer />
    </>
  )
}

export default Home

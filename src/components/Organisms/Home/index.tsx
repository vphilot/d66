// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import { Grid, Typography, Button } from '@material-ui/core'

// Internal Components
import { D66ThemeType } from '../../../styles/Theme'

// Asset imports
import Logo from '../../../images/logo.svg'

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
    '& strong': {
      fontWeight: theme.font.weight.bold,
    },
    '& button:hover': {
      boxShadow: theme.boxShadow,
    },
  },
  logoContainer: {
    margin: '80px 0',
    '& img': {
      width: '100%',
    },
  },
  buttonContainer: {
    paddingTop: `${theme.spacing.base}px`,
  },
  disclaimer: {
    position: 'fixed',
    bottom: `${theme.spacing.base}px`,
  },
}))

const Home:FunctionComponent = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={2} className={classes.homeContainer}>
        <Grid item xs={12} md={6}>
          <Grid container className={classes.logoContainer}>
            <Grid item xs={6} md={4}>
              <img src={Logo} alt="d66 logo" />
            </Grid>
          </Grid>
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
        </Grid>
      </Grid>
      <Typography variant="body2" className={classes.disclaimer}>
        This app does not sell your data or uses it to undermine democracy.
      </Typography>
    </>
  )
}

export default Home

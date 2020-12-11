// Dependencies
import React, { FunctionComponent, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

// External components
import {
  Grid,
  Typography,
  Button,
} from '@material-ui/core'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  appBar: {
    paddingTop: `${theme.spacing.base}px`,
    paddingBottom: `${theme.spacing.base}px`,
    borderBottom: `1px solid ${theme.colors.red}`,
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: theme.font.weight.normal,
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
    // MuiButton overrides
    '& button': {
      fontSize: 'inherit',
    },
    '& button:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      textDecoration: 'underline',
    },
  },
}))

// Types
type AppBarProps = {
  setUser: React.Dispatch<any>,
}

const AppBar:FunctionComponent <AppBarProps> = ({ setUser }) => {
  const classes = useStyles()
  const history = useHistory()

  const logOut = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
      })
      const jsonResponse = await response.json()
      if (!response.ok) {
        throw new Error(jsonResponse.message)
      }
      // resetting state on the main app
      // will trigger a reload
      setUser(undefined)
      history.push('/logout')
    } catch (err) {
      console.error('Could not log you with the errror', err)
    }
  }

  return (
    <Grid container alignItems="center" justify="space-between" className={classes.appBar}>
      <Grid item xs={3} md={3}>
        <Typography variant="h4">
          <Link to="/">
            <strong>d66</strong>
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={9} md={4}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body1">
              <Link to="/">
                My Goals
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              <Link to="/timeline">
                My Timeline
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              <Button
                variant="text"
                color="primary"
                disableRipple
                disableElevation
                disableFocusRipple
                onClick={() => logOut()}
              >
                Log out
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AppBar

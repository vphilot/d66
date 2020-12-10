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
  title: {
    paddingBottom: `${theme.spacing.base / 2}px`,
  },
  buttonContainer: {
    paddingTop: `${theme.spacing.base}px`,
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
      setUser(undefined)
      history.push('/logout')
    } catch (err) {
      console.error('Could not log you with the errror', err)
    }
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <Link to="/">
          <strong>d66</strong>
        </Link>
      </Grid>
      <Grid item xs={2}>
        <Link to="/">
          <strong>My Goals</strong>
        </Link>
      </Grid>
      <Grid item xs={2}>
        <Link to="/timeline">
          <strong>My Timeline</strong>
        </Link>
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={() => logOut()}
        >
          <strong>Log out</strong>
        </Button>
      </Grid>
    </Grid>
  )
}

export default AppBar

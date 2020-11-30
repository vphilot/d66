// Dependencies
import React, { FunctionComponent, useState } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import { Grid, TextField, Button } from '@material-ui/core'

// Internal Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  form: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.colors.red,
    },
    '& label': {
      color: theme.colors.red,
    },
  },
}))

// Types

const Signup: FunctionComponent = () => {
  const classes = useStyles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      })
      if (response.ok) {
        alert('user created successfully!')
      } else {
        console.log('Error saving record')
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSignUp}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              color="primary"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              color="primary"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              color="primary"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              color="primary"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" type="submit">
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default Signup

// Dependencies
import React, { FunctionComponent, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

// External Components
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import DoneIcon from '@material-ui/icons/Done'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Internal Components
import Logo from '../../Molecules/Logo'
import Disclaimer from '../../Molecules/Disclaimer'

// Util
import { validateInputHelper } from '../../../util/helpers'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  loginForm: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.colors.red,
    },
    '& label': {
      color: theme.colors.red,
    },
    '& .MuiFormControl-fullWidth': {
      marginTop: `${theme.spacing.base}px`,
    },
  },
  buttonContainer: {
    paddingTop: `${theme.spacing.base}px`,
    '& button:hover': {
      boxShadow: theme.boxShadow,
    },
  },
}))

// Constants

const generateValidateInputIcon = (type:string, term:string):JSX.Element => {
  if (term === '') {
    return null
  }
  if (validateInputHelper(type, term)) {
    return <DoneIcon />
  }
  return <ErrorIcon />
}

const Signup: FunctionComponent = () => {
  const classes = useStyles()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      if (response.ok) {
        alert('login was successful!')
      } else {
        alert('error logging in')
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Logo />
      <form className={classes.loginForm} onSubmit={handleSignUp}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1">
              Log in with your email:
            </Typography>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              color="primary"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    { generateValidateInputIcon('email', email) }
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              color="primary"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    { generateValidateInputIcon('password', password) }
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={2} className={classes.buttonContainer}>
              <Grid item xs={6} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disableRipple
                  disabled={
                    !(
                      validateInputHelper('email', email)
                      && validateInputHelper('password', password)
                    )
                  }
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Disclaimer />
    </>
  )
}

export default Signup

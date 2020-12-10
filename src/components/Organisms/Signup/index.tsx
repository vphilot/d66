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
  Chip,
} from '@material-ui/core'

// Icons
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Internal Components
import Logo from '../../Molecules/Logo'
import Disclaimer from '../../Molecules/Disclaimer'

// Util
import { validateInputHelper } from '../../../util/helpers'
import generateValidateInputIcon from '../../../util/generateValidateInputIcon'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  signUpForm: {
    marginBottom: `${theme.spacing.base * 2}px`,
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
  chipContainer: {
    marginTop: `${theme.spacing.base / 2}px`,
  },
}))

// Types
type SignUpProps = {
  getUser: () => Promise<void>,
}

const Signup: FunctionComponent<SignUpProps> = ({ getUser }) => {
  const classes = useStyles()
  const history = useHistory()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const signUpResponse = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      })

      const signUpResponseJson = await signUpResponse.json()
      if (!signUpResponse.ok) {
        setError(signUpResponseJson.message)
        return
      }

      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const loginResponseJson = await loginResponse.json()
      if (!loginResponse.ok) {
        setError(loginResponseJson.message)
        return
      }

      // happy path
      getUser()
      history.push('/')
    } catch (err) {
      throw err
    }
  }

  return (
    <>
      <Logo />
      {/* Email Signup */}
      <form className={classes.signUpForm} onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Typography variant="h4" component="h1">
              Sign up using your email:
            </Typography>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              color="primary"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    { generateValidateInputIcon('generic', firstName) }
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              color="primary"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    { generateValidateInputIcon('generic', lastName) }
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              color="primary"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    { generateValidateInputIcon('email', email) }
                  </InputAdornment>
                ),
              }}
            />
            {error
            && (
              <Chip
                icon={<PriorityHighIcon />}
                label={error}
                variant="default"
                color="secondary"
                className={classes.chipContainer}
              />
            )}
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
            <Typography variant="caption">
              At least 6 characters, must include a number
            </Typography>
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
                      validateInputHelper('generic', firstName)
                      && validateInputHelper('generic', lastName)
                      && validateInputHelper('email', email)
                      && validateInputHelper('password', password)
                      && !error
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
      {/* Link to Login */}
      <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <Typography variant="h4" component="h2">
            Already have an account?
          </Typography>
          <Grid container spacing={2} className={classes.buttonContainer}>
            <Grid item xs={6} md={4}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                disableRipple
                onClick={() => history.push('/login')}
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Disclaimer />
    </>
  )
}

export default Signup

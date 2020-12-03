// Dependencies
import React, { FunctionComponent, useState, useEffect } from 'react'
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

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  signUpForm: {
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
const validationExpressions:Record<string, RegExp> = {
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  password: /^(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/,
  generic: /^[a-zA-Z0-9- ]{3,15}$/,
}

const validateInput = (type:string, term:string):boolean => validationExpressions[type].test(term)

const generateValidateInputIcon = (type:string, term:string):JSX.Element => {
  if (term === '') {
    return null
  }
  if (validateInput(type, term)) {
    return <DoneIcon />
  }
  return <ErrorIcon />
}

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
      <Logo />
      <form className={classes.signUpForm} onSubmit={handleSignUp}>
        <Grid container>
          <Grid item xs={12} md={6}>
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
                      validateInput('generic', firstName)
                      && validateInput('generic', lastName)
                      && validateInput('email', email)
                      && validateInput('password', password)
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

// Dependencies
import React, { FunctionComponent, useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

// External Components
import {
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core'

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
      marginBottom: `${theme.spacing.base}px`,
    },
    '& h1': {
      marginBottom: `${theme.spacing.base}px`,
    },
  },
  buttonContainer: {
    marginTop: `${theme.spacing.base}px`,
    '& button:hover': {
      boxShadow: theme.boxShadow,
    },
  },
}))

// Constants
const validationExpressions:Record<string, RegExp> = {
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
}

const validateInput = (type:string, term:string):boolean => validationExpressions[type].test(term)

const Signup: FunctionComponent = () => {
  const classes = useStyles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(
    () => {
      console.log(validateInput('email', email))
    }, [email],
  )

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
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              color="primary"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              color="primary"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <p>{`is email valid? ${validateInput('email', email)}`}</p>
            <p>{`is password valid? ${validateInput('password', password)}`}</p>
            <Grid container spacing={2} className={classes.buttonContainer}>
              <Grid item xs={6} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disableRipple
                  disabled
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

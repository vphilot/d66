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

// Util
import { validateInputHelper } from '../../../util/helpers'
import generateValidateInputIcon from '../../../util/generateValidateInputIcon'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  loginForm: {
    '& .MuiFormControl-fullWidth': {
      marginTop: `${theme.spacing.base}px`,
    },
  },
  buttonContainer: {
    paddingTop: `${theme.spacing.base}px`,
  },
  chipContainer: {
    marginTop: `${theme.spacing.base}px`,
  },
}))

// Types
type SignUpProps = {
  getUser: () => Promise<void>,
}

const Signup: FunctionComponent<SignUpProps> = ({ getUser }) => {
  const classes = useStyles()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(undefined)
  }, [email, password])

  const handleSubmit = async (e) => {
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
      const jsonResponse = await response.json()

      if (!response.ok) {
        setError(jsonResponse.message)
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
      <form className={classes.loginForm} onSubmit={handleSubmit}>
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
            { error
            && (
              <Chip
                icon={<PriorityHighIcon />}
                label={error}
                variant="default"
                color="secondary"
                className={classes.chipContainer}
              />
            )}
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
    </>
  )
}

export default Signup

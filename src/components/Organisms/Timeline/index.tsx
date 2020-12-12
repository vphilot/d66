// Dependencies
import React, { FunctionComponent } from 'react'
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

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

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
  },
  chipContainer: {
    marginTop: `${theme.spacing.base / 2}px`,
  },
}))

// Types
type SignUpProps = {
  getUser: () => Promise<void>,
}

const Timeline: FunctionComponent<SignUpProps> = () => {
  const classes = useStyles()
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={8} lg={6}>
          Timeline
        </Grid>
      </Grid>
    </>
  )
}

export default Timeline

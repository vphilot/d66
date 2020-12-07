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

const Main: FunctionComponent = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <Logo />
      <p>This is where users are taken if logged in</p>
    </>
  )
}

export default Main

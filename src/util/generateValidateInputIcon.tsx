// Dependencies
import React from 'react'

// Icons
import ErrorIcon from '@material-ui/icons/Error'
import DoneIcon from '@material-ui/icons/Done'

// Util
import { validateInputHelper } from './helpers'

const generateValidateInputIcon = (type:string, term:string):JSX.Element => {
  if (term === '') {
    return <></>
  }
  if (validateInputHelper(type, term)) {
    return <DoneIcon />
  }
  return <ErrorIcon />
}

export default generateValidateInputIcon

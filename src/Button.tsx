// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'

// Internal Components
import { D66ThemeType } from './styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  button: {
    color: theme.colors.red,
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      fontSize: '54px',
    },
  },
}))

// Types
type ButtonProps = {
  label: string,
  variant?: 'primary' | 'secondary',
  clickHandler?: void,
}

const Button:FunctionComponent<ButtonProps> = ({
  label,
  variant = 'primary',
  clickHandler = null,
}) => {
  const classes = useStyles()

  return (
    <button type="button" className={classes.button}>
      { label }
    </button>
  )
}

export default Button

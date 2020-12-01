// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

// External Components
import { Grid, Typography } from '@material-ui/core'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Asset imports
import logoSource from '../../../images/logo.svg'

// Styles
const useStyles = createUseStyles((theme:D66ThemeType) => ({
  logoContainer: {
    margin: '80px 0',
    '& img': {
      width: '100%',
    },
  },
}))

const Logo:FunctionComponent = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.logoContainer}>
      <Grid item xs={12} md={6}>
        <Grid item xs={6} md={4}>
          <Link to="/">
            <img src={logoSource} alt="d66 logo" />
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Logo

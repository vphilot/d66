/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'

// External components
import {
  Grid,
  Typography,
} from '@material-ui/core'

// Icons
import LooksIcon from '@material-ui/icons/Looks'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  tip: {
    padding: theme.spacing.base * 2,
    paddingTop: theme.spacing.base,
  },
}))

const Tip:FunctionComponent = () => {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={8} lg={6} className={classes.tip}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Grid container justify="center" alignItems="center">
              <LooksIcon />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1" component="p">
              Pro tip: if you click on <strong>today</strong>, you can select a past date to edit your history. We like to keep future a mystery tho.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Tip

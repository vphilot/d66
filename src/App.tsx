// Dependencies
import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider } from 'react-jss'
import { MuiThemeProvider } from '@material-ui/core'

// External Components
import Container from '@material-ui/core/Container'

// Style Components
import BaseStyles from './styles/BaseStyles'
import { d66Theme, muiTheme } from './styles/Theme'

// Internal Components
import { Home, Signup } from './components'
// TODO remove this component entirely
import ListUsers from './components/Organisms/ListUsers'

const App:FunctionComponent = () => {
  console.log('app is running')

  return (
    <>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={d66Theme}>
          <BaseStyles />
          <Container maxWidth="lg">
            <Router>
              <Switch>
                <Route
                  exact
                  path="/listusers"
                  render={() => <ListUsers />}
                />
                <Route
                  exact
                  path="/signup"
                  render={() => <Signup />}
                />
                <Route
                  path="/"
                  render={() => <Home />}
                />
              </Switch>
            </Router>
          </Container>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}

export default App

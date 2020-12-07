// Dependencies
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
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
import {
  Home,
  Signup,
  Login,
  Main,
} from './components'
// TODO remove this component entirely
import ListUsers from './components/Organisms/ListUsers'

const App:FunctionComponent = () => {
  const [user, setUser] = useState(undefined)

  const getUser = useCallback(async () => {
    try {
      const response = await fetch('/api/users/me')
      const jsonResponse = await response.json()
      if (!response.ok) {
        throw new Error(jsonResponse.message)
      }
      setUser(jsonResponse.data)
    } catch (err) {
      setUser(undefined)
    }
  },
  [])

  useEffect(() => {
    getUser()
  },
  [getUser])

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
                  exact
                  path="/login"
                  render={() => <Login />}
                />
                <Route
                  path="/"
                  render={() => {
                    if (!user) {
                      return <Home />
                    }
                    return <Main />
                  }}
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

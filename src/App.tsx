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
import ReactDayPickerStyles from './styles/ReactDayPickerStyles'

// Internal Components
import {
  Home,
  Signup,
  Login,
  Main,
  Timeline,
  AppBar,
} from './components'

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
      console.error('Get user failed with error: ', err)
      setUser(undefined)
    }
  },
  [])

  useEffect(() => {
    getUser()
  },
  [getUser, user])

  return (
    <>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={d66Theme}>
          <BaseStyles />
          <ReactDayPickerStyles />
          <Container maxWidth="lg">
            <Router>
              <Switch>
                <Route
                  exact
                  path="/signup"
                  render={() => <Signup getUser={getUser} />}
                />
                <Route
                  exact
                  path="/login"
                  render={() => <Login getUser={getUser} />}
                />
                <Route
                  path="/timeline"
                  render={() => {
                    if (!user) {
                      return <Home setUser={setUser} />
                    }
                    return (
                      <>
                        <AppBar setUser={setUser} />
                        <Timeline goals={user.goals} />
                      </>
                    )
                  }}
                />
                <Route
                  path="/"
                  render={() => {
                    if (!user) {
                      return <Home setUser={setUser} />
                    }
                    return (
                      <>
                        <AppBar setUser={setUser} />
                        <Main setUser={setUser} />
                      </>
                    )
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

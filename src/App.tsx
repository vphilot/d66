// Dependencies
import React, { FunctionComponent, useEffect, useState } from 'react'
import { ThemeProvider } from 'react-jss'

// Internal Components
import BaseStyles from './styles/BaseStyles'
import { d66Theme } from './styles/Theme'
import Goal from './components/Goal'

const App:FunctionComponent = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchApiData = async () => {
      const response = await fetch('/api/users')
      console.log(response)
      const usersResponse = await response.json()
      setUsers(usersResponse)
    }

    fetchApiData()
  }, [])

  return (
    <>
      <ThemeProvider theme={d66Theme}>
        <BaseStyles />
        {
          users && users.map((user) => (
            <>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              {
                user.goals.map((goal) => (
                  <Goal
                    key={goal.title}
                    title={goal.title}
                    description={goal.description}
                    dateCreated={goal.dateCreated}
                    entries={goal.entries}
                  />
                ))
              }
            </>
          ))
        }
      </ThemeProvider>
    </>
  )
}

export default App

// Dependencies
import React, { FunctionComponent, useState, useEffect } from 'react'

// Internal Components
import Goal from '../../Goal'

const ListUsers: FunctionComponent = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchApiData = async () => {
      const response = await fetch('/api/users')
      const jsonResponse = await response.json()
      setUsers(jsonResponse.data)
    }

    fetchApiData()
  }, [])

  return (
    <>
      {
      users && users.map((user) => (
        <div key={user._id}>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          {
            user.goals.length > 0 && user.goals.map((goal) => (
              <Goal
                key={goal.title}
                title={goal.title}
                description={goal.description}
                dateCreated={goal.dateCreated}
                entries={goal.entries}
              />
            ))
          }
        </div>
      ))
      }
    </>
  )
}

export default ListUsers

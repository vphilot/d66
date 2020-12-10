// Dependencies
import React, { FunctionComponent, useState } from 'react'
import { createUseStyles } from 'react-jss'

// Data Access
import { Goal } from '../../../models'

const GoalItem:FunctionComponent<Goal> = ({
  title,
  description,
  dateCreated,
  entries = [],
}) => (
  <>
    <p>
      title:
      {title}
    </p>
    <p>
      description:
      {description}
    </p>
    <p>
      dateCreated:
      {dateCreated}
    </p>
    <p>
      entries:
      {entries}
    </p>
  </>
)

export default GoalItem

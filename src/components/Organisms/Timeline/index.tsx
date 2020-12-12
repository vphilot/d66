// Dependencies
import React, { FunctionComponent } from 'react'
import { createUseStyles } from 'react-jss'
import moment from 'moment'

// External Components
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Chip,
} from '@material-ui/core'

// Style Components
import { D66ThemeType } from '../../../styles/Theme'

// Styles
const useStyles = createUseStyles((theme: D66ThemeType) => ({
  timelineContainer: {
    width: '100%',
    overflowX: 'scroll',
    marginTop: `${theme.spacing.base * 4}px`,
  },
  row: {
    width: '700vw',
    [theme.breakpoints.up('sm')]: {
      width: '200vw',
    },
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: `${theme.spacing.base * 2}px`,
  },
  titleCell: {
    width: '5%',
    marginRight: `${theme.spacing.base / 2}px`,
  },
  entryCell: {
    flexGrow: 1,
    height: '100%',
  },
  badState: {
    backgroundColor: theme.colors.orange,
  },
  neutralState: {
    backgroundColor: theme.colors.blue,
  },
  goodState: {
    backgroundColor: theme.colors.green,
  },
}))

// Types
type TimelineProps = {
  goals: Array<{
    title: string,
    entries: Array<{
      date: Date,
      state: string,
    }>
  }>,
}

const Timeline: FunctionComponent<TimelineProps> = ({ goals }) => {
  const classes = useStyles()

  const generateEntryClassName = (entryState:string) => {
    switch (entryState) {
      case 'bad':
        return classes.badState
        break
      case 'good':
        return classes.goodState
        break
      default:
        return classes.neutralState
    }
  }

  return (
    <div className={classes.timelineContainer}>
      {
        goals.map((goal) => (
          <div key={goal.title} className={classes.row}>
            <div className={classes.titleCell}>
              <p>{ goal.title }</p>
            </div>
            {
              goal.entries.map((entry, index) => (
                <div
                  className={`
                    ${classes.entryCell}
                    ${generateEntryClassName(entry.state)}
                  `}
                  key={entry.date.toString()}
                >
                  <>
                    {
                      (index < (goal.entries.length - 1))
                      && (
                        !(moment(entry.date).format('MMM') === moment(goal.entries[index + 1].date).format('MMM'))
                        && (
                          <p>{moment(entry.date).format('MMM')}</p>
                        )
                      )
                    }
                  </>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Timeline

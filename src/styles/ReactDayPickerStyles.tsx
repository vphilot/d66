// Dependencies
import React, { FunctionComponent } from 'react'

// Theme
import { d66Theme } from './Theme'

const ReactDayPickerStyles:FunctionComponent = () => (
  <style>
    {`
    .DayPicker-Day {
      color: ${d66Theme.colors.red};
      outline: none;
    }
    .DayPicker-Day:hover {
      color: ${d66Theme.colors.red};
      background-color: ${d66Theme.colors.white} !important;
    }
    .DayPicker-Day:focus {
      color: ${d66Theme.colors.white};
      background-color: ${d66Theme.colors.red} !important;
    }
    .DayPicker-Day--today {
      font-weight: normal;
      text-decoration: underline;
    }
    .DayPicker-Day--disabled {
      color: ${d66Theme.colors.gray};
      pointer-events: none;
    }
    .DayPicker-Weekday {
      color: ${d66Theme.colors.gray};
      pointer-events: none;
    }
    .DayPicker-NavButton {
      outline: none;
    }
  `}
  </style>
)

export default ReactDayPickerStyles

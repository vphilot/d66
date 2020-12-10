// Dependencies
import React from 'react'
import { createUseStyles } from 'react-jss'
import { d66Theme } from './Theme'

// Styles
const useStyles = createUseStyles({
  '@global': {
    'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video': {
      margin: '0',
      padding: '0',
      border: '0',
      fontSize: '100%',
      font: 'inherit',
      verticalAlign: 'baseline',
      boxSizing: 'border-box',
    },
    html: {
      fontFamily: `${d66Theme.font.family}, sans-serif`,
      fontWeight: d66Theme.font.weight.medium,
      scrollBehavior: 'smooth',
      backgroundColor: d66Theme.colors.light,
      color: d66Theme.colors.red,
      '@media (prefers-reduced-motion: reduce)': {
        html: {
          scrollBehavior: 'auto',
        },
      },
    },
    'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': {
      display: 'block',
    },
    strong: {
      fontWeight: d66Theme.font.weight.bold,
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
    button: {
      // button reset
      appearance: 'none',
      padding: 0,
      border: 0,
      background: 'inherit',
      fontFamily: `${d66Theme.font.family}, sans-serif`,
    },
  },
})

const BaseStyles = (): JSX.Element => {
  useStyles()

  return (
    <></>
  )
}

export default BaseStyles

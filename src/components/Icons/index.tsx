// Dependencies
import React, { FunctionComponent } from 'react'

// External components
import SvgIcon from '@material-ui/core/SvgIcon'

export const SadIcon: FunctionComponent = () => (
  <SvgIcon viewBox="0 0 29 16">
    <g fill="none" fillRule="evenodd">
      <path d="m-3-9h36v36h-36z" />
      <g fill="#1f4055" fillRule="nonzero">
        <path d="m0 0v2h12v-2z" />
        <path d="m17 0v2h12v-2z" />
        <path d="m23.018781 9.94185177v7.53973853h2v-9.53973853h-21.05298231v9.53973853h2v-7.53973853z" />
      </g>
    </g>
  </SvgIcon>
)

export const NeutralIcon: FunctionComponent = () => (
  <SvgIcon viewBox="0 0 29 16">
    <g fill="none" fillRule="evenodd" transform="translate(-3 -13)">
      <path d="m0 0h36v36h-36z" />
      <g fill="#1f4055" fillRule="nonzero">
        <path d="m3 13v2h12v-2z" />
        <path d="m7 21v2h21v-2z" />
        <path d="m20 13v2h12v-2z" />
      </g>
    </g>
  </SvgIcon>
)

export const HappyIcon: FunctionComponent = () => (
  <SvgIcon viewBox="0 0 29 16">
    <g fill="none" fillRule="evenodd">
      <g fill="#1f4055" fillRule="nonzero">
        <path d="m0 0v2h12v-2z" />
        <path d="m17 0v2h12v-2z" />
        <path d="m5.96579869 13.0581482v-8.5581482h-2v10.5581482h21.05298231v-9.36679472h-2v7.36679472z" transform="translate(0,2)" />
      </g>
      <path d="m-3-10h36v36h-36z" />
    </g>
  </SvgIcon>
)

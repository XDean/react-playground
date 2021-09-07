import React, {PropsWithChildren, useState} from 'react'
import {createPortal} from 'react-dom'

type Props = PropsWithChildren<JSX.IntrinsicElements['iframe']>

export const IFrame = (props: Props) => {
  const {children} = props
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null)
  const mountNode = contentRef?.contentWindow?.document?.body

  return (
    <iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
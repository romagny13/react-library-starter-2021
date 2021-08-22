import React from 'react'

import './ComponentA.css'

export interface ComponentAProps {
  message?: string
}

export default function ComponentA({
  message = 'Hello World',
}: ComponentAProps) {
  return (
    <>
      <h2>Component A</h2>
      <p>{message}</p>
    </>
  )
}

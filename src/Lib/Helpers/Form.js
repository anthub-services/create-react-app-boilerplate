import React from 'react'
import Alert from '../../Components/Alert'

export function setFocus(UISchema, input) {
  if (input) {
    document.getElementById(`${UISchema['ui:rootFieldId']}_${input}`).focus()
  }
}

export function errorList(props) {
  return <Alert formError />
}

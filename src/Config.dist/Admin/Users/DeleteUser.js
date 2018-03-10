import React from 'react'

export default {
  title: 'Delete user?',
  message: (
    <span>
      <strong>Warning!</strong> All associated records of this user
      shall be deleted. You cannot undo this action.
    </span>
  ),
  button: { title:  'Delete', style: 'danger' }
}

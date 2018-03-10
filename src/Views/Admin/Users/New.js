import React, { Component } from 'react'
import { PageTitle } from '../../../Lib/Common/Views'
import AdminUserForm from '../../../Components/Forms/Admin/User'

export default class New extends Component {
  render() {
    return (
      <div className="users-form-new">
        <PageTitle title="New User" appName="Admin" />
        <div className="form-wrapper -default">
          <AdminUserForm />
        </div>
      </div>
    )
  }
}

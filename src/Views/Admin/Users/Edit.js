import React, { Component } from 'react'
import { PageTitle } from '../../../Lib/Common/Views'
import AdminUserForm from '../../../Components/Forms/Admin/User'

export default class Edit extends Component {
  render() {
    return (
      <div className="users-form-edit">
        <PageTitle title="Edit User" appName="Admin" />
        <div className="form-wrapper -default">
          <AdminUserForm {...this.props} />
        </div>
      </div>
    )
  }
}

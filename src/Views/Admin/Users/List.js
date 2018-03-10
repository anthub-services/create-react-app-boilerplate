import React, { Component } from 'react'
import { PageTitle } from '../../../Lib/Common/Views'
import AdminUsersDataTable from '../../../Redux/Containers/Admin/Users'

export default class List extends Component {
  render() {
    return (
      <div className="users-view">
        <PageTitle title="Users" appName="Admin" />
        <AdminUsersDataTable {...this.props} />
      </div>
    )
  }
}

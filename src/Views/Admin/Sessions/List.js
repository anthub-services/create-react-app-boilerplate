import React, { Component } from 'react'
import { PageTitle } from '../../../Lib/Common/Views'
import AdminSessionsDataTable from '../../../Redux/Containers/Admin/Sessions'

export default class List extends Component {
  render() {
    return (
      <div className="sessions-view">
        <PageTitle title="Sessions" appName="Admin" />
        <AdminSessionsDataTable {...this.props} />
      </div>
    )
  }
}

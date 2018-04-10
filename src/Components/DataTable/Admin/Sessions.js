import React, { Component } from 'react'
import DataTable from '../DataTable'
import Config from '../../../Config/Admin/Sessions/DataTable'

export default class Sessions extends Component {
  render() {
    const props = this.props

    return (
      <DataTable
        {...Config}
        dataSource={process.env.REACT_APP_API_SESSIONS_URL}
        path={props.path}
        dataTableState={props.AdminSessions}
        saveQueryState={props.saveQuery}
      />
    )
  }
}

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DeleteRecord from '../DataTable/Action/DeleteRecord'
import * as Session from '../../Lib/Helpers/Session'
import DELETE_USER from '../../Config/Admin/Users/DeleteUser'

export default class DeleteUser extends Component {
  constructor() {
    super()

    this.state = { redirectToUsers: false }
  }

  handleRedirectToUsers() {
    setTimeout(() => {
      this.setState({ redirectToUsers: true })
    }, 300)
  }

  render() {
    if (!Session.isAuthorised('/admin/users/delete'))
      return null

    if (this.state.redirectToUsers)
      return <Redirect to="/admin/users" />

    const props = this.props

    return (
      <DeleteRecord
        isButton
        dataSource={process.env.REACT_APP_API_USERS_URL}
        showDeleteRecord={true}
        resource={props.resource}
        disabled={props.disabled}
        onSuccess={this.handleRedirectToUsers.bind(this)}
        resourceIdKey="userId"
        confirmModal={DELETE_USER}
        successMessage="User has been successfully deleted."
      />
    )
  }
}

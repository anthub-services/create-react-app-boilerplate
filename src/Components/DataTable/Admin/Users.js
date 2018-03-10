import React, { Component } from 'react'
import DataTable from '../DataTable'
import { isAuthorised } from '../../../Lib/Helpers/Session'
import AdminUserForm from '../../Forms/Admin/User'
import AdminUserStatic from '../../Forms/Static/Admin/User'
import Config from '../../../Config/Admin/Users/DataTable'
import DELETE_USER from '../../../Config/Admin/Users/DeleteUser'

const NEW_FORM_OPTION = {
  title: 'New User',
  component: AdminUserForm
}
const EDIT_FORM_OPTION = {
  title: 'Edit User',
  component: AdminUserForm
}
const VIEW_RECORD_OPTION = {
  title: 'User',
  component: AdminUserStatic
}

export default class Users extends Component {
  render() {
    const props = this.props

    return (
      <DataTable
        {...Config}
        dataSource={process.env.REACT_APP_API_USERS_URL}
        path={props.path}
        dataTableState={props.AdminUsers}
        saveQueryState={props.saveQuery}
        showNewForm={isAuthorised('/admin/users/new')}
        showViewRecord={isAuthorised('/admin/users/:userId')}
        showEditRecord={isAuthorised('/admin/users/:userId/edit')}
        showDeleteRecord={isAuthorised('/admin/users/delete')}
        resourceIdKey="userId"
        newFormOption={NEW_FORM_OPTION}
        editFormOption={EDIT_FORM_OPTION}
        viewRecordOption={VIEW_RECORD_OPTION}
        confirmModal={DELETE_USER}
      />
    )
  }
}

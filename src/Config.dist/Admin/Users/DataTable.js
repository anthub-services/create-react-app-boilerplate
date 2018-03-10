import Moment from 'moment'
import { ucFirst } from '../../../Lib/Helpers/Text'

const columns = [{
    Header: 'User ID',
    accessor: 'userId',
    width: 90
  }, {
    Header: 'First Name',
    accessor: 'firstName'
  }, {
    Header: 'Last Name',
    accessor: 'lastName'
  }, {
    Header: 'Email',
    accessor: 'email'
  }, {
    Header: 'Role',
    accessor: 'role'
  }, {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => ucFirst(value)
  }, {
    Header: 'Created At',
    accessor: 'createdAt',
    Cell: ({ value }) => Moment(value).format('MM/DD/YYYY hh:mm A'),
    width: 160
}]

const columnFilters = {
  userId: {
    type: 'string',
    title: 'User ID'
  },
  firstName: {
    type: 'string',
    title: 'First Name'
  },
  lastName: {
    type: 'string',
    title: 'Last Name'
  },
  email: {
    type: 'string',
    title: 'Email'
  },
  role: {
    type: 'string',
    title: 'Role'
  },
  status: {
    type: 'string',
    title: 'Status'
  },
  dateFrom: {
    type: 'string',
    title: 'Date From'
  },
  dateTo: {
    type: 'string',
    title: 'Date To'
  }
}

export default {
  columns,
  columnFilters
}

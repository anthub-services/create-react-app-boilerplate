import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'

const columns = [{
    Header: 'Sess ID',
    accessor: 'sessionId',
    width: 90
  }, {
    Header: 'User',
    accessor: 'user',
    Cell: ({ value }) => <Link to={['/admin/users', value.userId].join('/')}>{value.name}</Link>,
  }, {
    Header: 'User Agent',
    accessor: 'userAgent'
  }, {
    Header: 'IP Address',
    accessor: 'ipAddress',
    width: 100
  }, {
    Header: 'Signed In',
    accessor: 'createdAt',
    Cell: ({ value }) => Moment(value).format('MM/DD/YYYY hh:mm A'),
    width: 160
  }, {
    Header: 'Signed Out',
    accessor: 'signedOutAt',
    Cell: ({ value }) => {
      return value !== null ? Moment(value).format('MM/DD/YYYY hh:mm A') : null
    },
    width: 160
}]

const columnFilters = {
  user: {
    type: 'string',
    title: 'User'
  },
  userAgent: {
    type: 'string',
    title: 'User Agent'
  },
  ipAddress: {
    type: 'string',
    title: 'IP Address'
  },
  dateFrom: {
    type: 'string',
    title: 'Signed Date From'
  },
  dateTo: {
    type: 'string',
    title: 'Signed Date To'
  }
}

export default {
  columns,
  columnFilters
}

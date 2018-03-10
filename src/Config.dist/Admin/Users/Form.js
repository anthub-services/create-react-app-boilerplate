import _ from 'lodash'
import Paths from '../../Paths'

const SUPER_ADMIN_PATH_NAMES = _.map(Paths.SuperAdmin, 'name')
const SUPER_ADMIN_PATHS = _.map(Paths.SuperAdmin, 'path')
const USER_PATHS = _.map(Paths.User, 'path')

const ROLES = [
  'Super Admin',
  'Admin',
  'Developer',
  'User'
]

const STATUS = [
  { name: 'Active', value: 'active' },
  { name: 'Inactive', value: 'inactive' },
  { name: 'Pending', value: 'pending' },
  { name: 'Blocked', value: 'blocked' }
]

const initData = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'User',
  status: 'pending',
  redirect: '',
  allowedPaths: USER_PATHS,
  excludedPaths: []
}

const schema = {
  type: 'object',
  required: [
    'firstName',
    'lastName',
    'email',
    'status',
    'allowedPaths'
  ],
  properties: {
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
      title: 'Email',
      default: ''
    },
    role: {
      type: 'string',
      title: 'Role',
      enum: ROLES,
    },
    status: {
      type: 'string',
      title: 'Status',
      enum: _.map(STATUS, 'value'),
      enumNames: _.map(STATUS, 'name')
    },
    redirect: {
      type: 'string',
      title: 'Redirect Path or URL'
    }
  }
}

const schemaAllowedPaths = {
  type: 'array',
  title: 'Allowed Paths',
  items: {
    type: 'string',
    enum: _.concat(['*'], SUPER_ADMIN_PATHS),
    enumNames: _.concat(['All'], SUPER_ADMIN_PATH_NAMES),
  },
  uniqueItems: true
}

const schemaAllowedAllPaths = {
  type: 'array',
  title: 'Allowed Paths',
  items: {
    type: 'string',
    enum: ['*'],
    enumNames: ['All']
  },
  uniqueItems: true
}

const schemaExcludedPaths = {
  type: 'array',
  title: 'Excluded Paths',
  items: {
    type: 'string',
    enum: SUPER_ADMIN_PATHS,
    enumNames: SUPER_ADMIN_PATH_NAMES,
  },
  uniqueItems: true
}

const uiSchema = {
  'ui:rootFieldId': 'user',
  firstName: {
    'ui:emptyValue': '',
  },
  lastName: {
    'ui:emptyValue': '',
  },
  email: {
    'ui:widget': 'email'
  },
  role: {
    'ui:widget': 'radio',
    'ui:options': { inline: true }
  },
  status: {
    'ui:widget': 'radio',
    'ui:options': { inline: true }
  },
  allowedPaths: {
    'ui:widget': 'checkboxes'
  },
  excludedPaths: {
    'ui:widget': 'checkboxes'
  },
  redirect: {
    'ui:help': [
      "If there's no referrer found, the path or URL is used for user's redirection after signing in.",
      'Enter a path without domain for internal redirection, e.i. /admin/dashboard.',
      'Or enter a complete URL for external redirection, e.i. http://domain.com/page.'
    ].join(' ')
  }
}

export default {
  paths: Paths,
  initData,
  schema,
  schemaAllowedPaths,
  schemaAllowedAllPaths,
  schemaExcludedPaths,
  uiSchema
}

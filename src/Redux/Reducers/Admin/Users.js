import * as Types from '../../Actions/Admin/Users/Types'

const DEFAULT_STATE = { queryString: '' }

export default function(state=DEFAULT_STATE, action) {
  switch(action.type) {
    case Types.ADMIN_USERS_SAVE_QUERY:
      return action.AdminUsers
    default:
      return state
  }
}

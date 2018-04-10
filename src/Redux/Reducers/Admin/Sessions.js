import * as Types from '../../Actions/Admin/Sessions/Types'

const DEFAULT_STATE = { queryString: '' }

export default function(state=DEFAULT_STATE, action) {
  switch(action.type) {
    case Types.ADMIN_SESSIONS_SAVE_QUERY:
      return action.AdminSessions
    default:
      return state
  }
}

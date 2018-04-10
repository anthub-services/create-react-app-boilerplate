import { ADMIN_SESSIONS_SAVE_QUERY } from  './Types'

export function saveQuery(AdminSessions) {
  return { type: ADMIN_SESSIONS_SAVE_QUERY, AdminSessions }
}

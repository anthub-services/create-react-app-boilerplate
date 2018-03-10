import { ADMIN_USERS_SAVE_QUERY } from  './Types'

export function saveQuery(AdminUsers) {
  return { type: ADMIN_USERS_SAVE_QUERY, AdminUsers }
}

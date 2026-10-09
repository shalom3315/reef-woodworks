// Being signed in to Supabase is not enough to be an admin: only these addresses
// may use the admin panel and write data. Keep in sync with public.is_admin() in
// supabase/migrations/20261009_admin_only_writes.sql, which enforces the same
// list at the database level.
export const ADMIN_EMAILS = ['shalom3315@gmail.com']

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase())
}

import { Session } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'
export type AuthData = {
  session?: Session | null
  profile?: any | null
  isLoading: boolean
  isLoggedIn: boolean
  onLogout: () => Promise<void>
}
export const AuthContext = createContext<AuthData>({
  session: undefined,
  profile: undefined,
  isLoading: true,
  isLoggedIn: false,
  onLogout: async () => {},
})
export const useAuthContext = () => useContext(AuthContext)
export const useAuth = () => useAuthContext()

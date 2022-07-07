import { LoginCredentials, SignupCredentials, User } from 'fluro'
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { client } from '../fluro'

export interface AuthContextType {
  user?: User
  loading: boolean
  error?: Error
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (error) setError(undefined)
  }, [location.pathname]) /* eslint-disable-line react-hooks/exhaustive-deps */

  useEffect(() => {
    const user = client.auth.getCurrentUser()
    setUser(user)
    setLoadingInitial(false)
  }, [])

  async function login(credentials: LoginCredentials): Promise<void> {
    setLoading(true)
    try {
      const { data: user } = await client.auth.login(credentials)
      setUser(user)
      history.push('/')
    } catch (error) {
      const formattedError = new Error(client.utils.errorMessage(error))
      setError(formattedError)
      throw formattedError
    } finally {
      setLoading(false)
    }
  }

  async function signup(credentials: SignupCredentials): Promise<void> {
    setLoading(true)
    try {
      const { data: user } = await client.auth.signup(credentials)
      setUser(user)
      history.push('/')
    } catch (error) {
      const formattedError = new Error(client.utils.errorMessage(error))
      setError(formattedError)
      throw formattedError
    } finally {
      setLoading(false)
    }
  }

  async function logout(): Promise<void> {
    setLoading(true)
    try {
      await client.auth.logout()
      setUser(undefined)
      history.push('/')
    } catch (error) {
      setError(new Error(client.utils.errorMessage(error)))
    } finally {
      setLoading(false)
    }
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signup,
      logout
    }),
    [user, loading, error] /* eslint-disable-line react-hooks/exhaustive-deps */
  )

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export function useAuth(): AuthContextType {
  return useContext(AuthContext)
}

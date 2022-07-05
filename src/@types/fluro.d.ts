declare module 'fluro' {
  interface Account {
    _id: string
    title: string
    color: string
  }

  interface PermissionSet {
    permissions: string[]
    _id: string
    title: string
  }

  export interface User {
    _id: string
    name: string
    email: string
    firstName: string
    lastName: string
    accountType: string
    verified: boolean
    account: Account
    permissionSets: { [key: string]: PermissionSet }
  }

  export interface LoginRequest {
    username: string
    password: string
    account?: string
  }

  export interface LoginResponse extends User {
    token: string
    expires: Date
    refreshToken: string
  }

  declare class Fluro {
    constructor(config?: {
      apiURL?: string
      applicationToken?: string
      domain?: string
    })

    api: {
      get<T>(path: string): Promise<T>
    }

    auth: {
      login: (
        request: LoginRequest
      ) => Promise<import('axios').AxiosResponse<LoginResponse>>
      logout: () => Promise<void>
      getCurrentUser: () => Promise<User | undefined>
      /**
       * Adds a callback that will be triggered whenever the specified event occurs
       * @param {string} event The event to listen for
       * @param {function} callback The function to fire when this event is triggered
       */
      addEventListener: (event: string, callback: () => void) => void
      /**
       * Sets the current user data, often from localStorage or after new session data has been generated from the server after signing in
       * @param {User} user The user session object
       */
      set: (user: User) => void
    }

    stats: {
      refresh: () => void
    }

    utils: {
      errorMessage: (err) => string
    }
  }
  export = Fluro
}

// This type is pulled from fluro js documentation
// https://fluro-developers.github.io/fluro

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

  export interface Realm {
    _id: string
    _type: string
    title: string
    slug: string
    bgColor: string
    color: string
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
    contacts: string[]
    permissionSets: { [key: string]: PermissionSet }
    persona: string
  }

  export interface LoginCredentials {
    username: string
    password: string
  }

  export interface SignupCredentials {
    firstName: string
    lastName: string
    username: string
    password: string
  }

  declare class Fluro {
    constructor(config?: {
      apiURL?: string
      applicationToken?: string
      domain?: string
    })

    access: {
      /**
       * Returns an array of all realms the user is allowed to do the specified action
       */
      retrieveActionableRealms<T>(permission: string): Promise<Realm[]>
    }

    api: {
      /**
       * Makes a get http request to the Fluro REST API
       * @param path The Fluro API endpoint to request
       * @param config Optional parameters for the request
       */
      get<T>(path: string, config: object): Promise<T>
      /**
       * Makes a post http request to the Fluro REST API
       * @param path The Fluro API endpoint to request
       * @param config Optional parameters for the request
       */
      post<T>(
        path: string,
        config: object
      ): Promise<import('axios').AxiosResponse<T>>
      /**
       * Makes a put http request to the Fluro REST API
       * @param path The Fluro API endpoint to request
       * @param config Optional parameters for the request
       */
      put<T>(
        path: string,
        config: object
      ): Promise<import('axios').AxiosResponse<T>>
    }

    auth: {
      /**
       * Logs the user in to Fluro and returns a new user session
       */
      login: (
        credentials: LoginCredentials
      ) => Promise<import('axios').AxiosResponse<User>>
      /**
       * Deletes the user session object, clears all Fluro caches and tokens from memory
       */
      logout: () => Promise<void>
      /**
       * Returns the current user's session data
       */
      getCurrentUser: () => User | undefined
      /**
       * Adds a callback that will be triggered whenever the specified event occurs
       * @param event The event to listen for
       * @param callback The function to fire when this event is triggered
       */
      addEventListener: (event: string, callback: () => void) => void
      /**
       * Triggers a new Reset Password email request to the specified user.
       */
      sendResetPasswordRequest: (body: { username: string }) => Promise<void>
      /**
       * Sets the current user data, often from localStorage or after new session data has been generated from the server after signing in
       * @param user The user session object
       */
      set: (user: User) => void
      /**
       * Logs the user in to Fluro and returns a new user session
       */
      signup: (
        credentials: SignupCredentials
      ) => Promise<import('axios').AxiosResponse<User>>
    }

    cache: {
      /**
       * A helper function to reset all cache objects, useful if changing account or logging in or out as another user
       */
      reset: () => void
    }

    content: {
      /**
       * This function returns a single populated item by providing its _id
       * @param _id The item's _id
       * @param params Extra query string parameters for the request
       */
      get<T, Params = Record<string, unknown>>(
        _id: string,
        params?: Params
      ): Promise<T>
    }

    stats: {
      refresh: () => void
    }

    types: {
      /**
       * Retrieves a list of specified types and their respective definitions. Get method does not return data property on ContentDefinition - must use retrieve.
       */
      retrieve: <T>(array: string[]) => Promise<T[]>
    }

    utils: {
      /**
       * Helper function for retrieving a human readable error message from server error response objects
       * @param error The error object to translate
       */
      errorMessage: (error) => string
    }
  }
  export = Fluro
}

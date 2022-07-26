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
    contacts: string[]
    permissionSets: { [key: string]: PermissionSet }
    contacts: string[]
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
      get: import('axios').AxiosInstance['get']
      /**
       * Makes a put http request to the Fluro REST API
       * @param path The Fluro API endpoint to request
       * @param data The data to send to fluro
       * @param config Optional parameters for the request
       */
      put: import('axios').AxiosInstance['put']
      /**
       * Makes a post http request to the Fluro REST API
       * @param path The Fluro API endpoint to request
       * @param config Optional parameters for the request
       */
      post: import('axios').AxiosInstance['post']
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
      /**
       * A helper function for retrieving the results of a dynamic query
       * @param  {Object} criteria The query criteria
       * @param  {Object} options Extra options and parameters
       * @example
       *
       * //Find all events that have a status of active or archived where the endDate is greater than or equal to now and return the titles
       * fluro.content.retrieve({_type:'event', status:{$in:['active', 'archived']}, endDate:{$gte:"date('now')"}}}, {select:'title'})
       */
      retrieve: <T>(
        criteria: {
          _type: string
        } & Record<string, unknown>,
        params?: unknown
      ) => Promise<T[]>
      /**
       * This function makes it easy to retrieve the full content items for a specified selection of ids
       * @param typeName The type or definition name of the content you want to retrieve
       * @param ids The ids of the content you want to retrieve
       * @param options extra options for the request.
       * @param options.select specify fields you want to retrieve for the items. If blank will return the full object
       *
       */
      getMultiple: <T>(
        typeName: DefinitionName,
        ids: string[],
        options?: { select?: string[] }
      ) => Promise<T[]>
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

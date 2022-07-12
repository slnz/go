// This type is pulled from fluro js documentation
// https://fluro-developers.github.io/fluro

declare module 'fluro' {
  export type DefinitionName = 'contact' | 'process'

  export interface Definition {
    definitionName: string
    definitions: ContentDefinition[]
  }

  export interface ContentDefinition<T> {
    _id: string
    definitionName: string
    data: T
    // description of definition
    firstLine: string
    // content type
    parentType: string
    // plural of definition title
    plural: string
    title: string
  }

  export interface ProcessDefinitionData {
    states: { title: string; key: string }
  }

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

    api: {
      /**
       * Makes a get http request to the Fluro REST API
       * @param path The Fluro API endpoint to request
       * @param config Optional parameters for the request
       */
      get<T>(path: string, config: object): Promise<T>
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

    stats: {
      refresh: () => void
    }

    types: {
      /**
       * Retrieves a list of specified types and their respective definitions. Get method does not return data property on ContentDefinition - must use retrieve.
       */
      retrieve: (array: DefinitionName[]) => Promise<Definition[]>
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

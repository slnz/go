import { MutationFunction } from '@tanstack/react-query'

import { client } from '../fluro'

export interface CreateContactData {
  _id: string
}

export interface CreateContactVariables {
  firstName: string
  lastName?: string
  gender: string
  phone?: string
  email?: string
  realms: string[]
}

export const createContact: MutationFunction<
  CreateContactData,
  CreateContactVariables
> = async (variables) => {
  try {
    const response = await client.api.post<CreateContactData>(
      '/content/contact',
      {
        firstName: variables.firstName,
        lastName: variables.lastName,
        gender: variables.gender,
        phoneNumbers: variables.phone,
        emails: variables.email,
        realms: variables.realms
      }
    )
    return { _id: response.data._id }
  } catch (error) {
    throw new Error(client.utils.errorMessage(error))
  }
}

import { MutationFunction } from 'react-query'

import { client } from '../fluro'

interface Realms {
  _id: string
  _type: string
  title: string
  slug: string
  bgColor: string
  color: string
}

const createContact: MutationFunction<
  { _id: string },
  {
    firstName: string
    lastName?: string
    gender: string
    phone?: string
    email?: string
    realms: Realms[]
  }
> = async (variables) => {
  const response = await client.api.post<{ _id: string }>('/content/contact', {
    firstName: variables.firstName,
    lastName: variables.lastName,
    gender: variables.gender,
    phoneNumbers: variables.phone,
    emails: variables.email,
    realms: variables.realms
  })
  return { _id: response.data._id }
}

export { createContact }

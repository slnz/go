import { MutationFunction } from 'react-query'

import { client } from '../fluro'
import { GetContact } from '../queries/getContact/getContact'

interface Realms {
  _id: string
  _type: string
  title: string
  slug: string
  bgColor: string
  color: string
}

const createProcessCard: MutationFunction<
  GetContact,
  {
    firstName: string
    lastName?: string
    gender: string
    phone?: string
    email?: string
    process: string
    realms: Realms[]
    contactId?: string
    createdContact: string
    state?: string
  }
> = async (variables) => {
  const response = await client.api.post<GetContact>(
    `/content/${variables.process}`,
    {
      item: { _id: variables.createdContact },
      _type: 'process',
      definition: variables.process,
      assignedTo: [variables.contactId],
      realms: variables.realms,
      title: `${variables.firstName} ${variables.lastName}`,
      state: variables.state
    }
  )
  return response.data
}

export { createProcessCard }

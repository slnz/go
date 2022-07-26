import { client } from '../../fluro'

export interface GetContact {
  _id: string
  firstName: string
  lastName: string
  phoneNumbers: string[]
  emails: string[]
  process: {
    [key: string]: {
      definition: string
      item: string
      state: string
      _id: string
    }[]
  }
  realms: [
    {
      _id: string
      _type: string
      title: string
      slug: string
      bgColor: string
      color: string
    }
  ]
}

export function getContact(id: string): () => Promise<GetContact> {
  return async (): Promise<GetContact> =>
    await client.content.get<GetContact>(id, {
      type: 'contact',
      appendProcess: 'all',
      select: ['firstName', 'lastName', 'phoneNumbers', 'emails', 'realms']
    })
}

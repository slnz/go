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
}

export function getContact(id: string): () => Promise<GetContact> {
  return async (): Promise<GetContact> =>
    await client.content.get<GetContact>(id, {
      appendProcess: 'all',
      select: ['firstName', 'lastName', 'phoneNumbers', 'emails']
    })
}

import { Realm } from 'fluro'

import { client } from '../../fluro'

export interface GetPersona {
  _id: string
  firstName: string
  lastName: string
  title: string
  realms: Realm[]
}

export function getPersona(id: string): () => Promise<GetPersona> {
  return async (): Promise<GetPersona> =>
    await client.content.get<GetPersona>(id, { type: 'persona' })
}

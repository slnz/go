import { Realm } from 'fluro'

import { client } from '../../fluro'

export interface GetPersona {
  _id: string
  realms: Realm[]
  firstName: string
  lastName: string
  title: string
}

export function getPersona(id: string): () => Promise<GetPersona> {
  return async (): Promise<GetPersona> =>
    await client.content.get<GetPersona>(`${id}?type=persona`)
}

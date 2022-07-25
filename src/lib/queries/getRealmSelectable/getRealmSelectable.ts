import { z } from 'zod'

import { client } from '../../fluro'

interface R {
  _id: string
  title: string
  children: R[]
}

const realm: z.ZodType<R> = z.lazy(() =>
  z.object({
    _id: z.string(),
    title: z.string(),
    children: z.array(realm)
  })
)

export type Realm = z.infer<typeof realm>

const realmSelectable = z.array(
  z.object({
    definition: z.string(),
    plural: z.string(),
    realms: z.array(realm)
  })
)

export type GetRealmSelectable = z.infer<typeof realmSelectable>

export interface GetRealmSelectableParams {
  definition?: string
  parentType?: string
  type?: string
}

export function getRealmSelectable(
  params: GetRealmSelectableParams = {}
): () => Promise<GetRealmSelectable> {
  return async (): Promise<GetRealmSelectable> => {
    const response = await client.api.get('/realm/selectable', {
      params
    })
    return realmSelectable.parse(response.data)
  }
}

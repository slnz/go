import { z } from 'zod'

import { client } from '../../fluro'

interface R {
  _id: string
  title: string
  children?: R[]
}

const realm: z.ZodType<R> = z.lazy(() =>
  z.object({
    _id: z.string(),
    title: z.string(),
    children: z.array(realm).optional()
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

/** Customize the realms retrieved by the API. */
export interface GetRealmSelectableParams {
  /** return realms with the provided definition */
  definition?: string
  /** filter realms which can receive the parentType */
  parentType?: string
  /** filter realms which can receive the type */
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

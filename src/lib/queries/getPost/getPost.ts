import { Realm } from '../getRealmSelectable/getRealmSelectable'

export type PostFieldDataValues = string | boolean | number | undefined

export type PostFieldData = {
  [key: string]: PostFieldDataValues
}

export interface GetPost {
  _id: string
  definition: string
  parent: { _id: string }
  data: PostFieldData
  realms: Realm[]
}

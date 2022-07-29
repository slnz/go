import { Realm } from '../getRealmSelectable/getRealmSelectable'

export interface PostFieldData {
  [key: string]: string | boolean | number
}

export interface GetPost {
  _id: string
  definition: string
  parent: { _id: string }
  data: PostFieldData
  realms: Realm[]
}

export interface Owner {
  _id: string
  firstName: string
  lastName: string
  name: string
  _type: string
}

export interface ManagedOwner {
  _id: string
  _type: string
  firstName: string
  title: string
  lastName: string
}

export interface Realm {
  _id: string
  _type: string
  title: string
  slug: string
  bgColor: string
  color: string
}

export interface Tag {
  _id: string
  _type: string
  title: string
  slug: string
}

export interface Account {
  _id: string
  status: string
  title: string
  timezone: string
  countryCode: string
}

export interface Touchpoints {}

export interface Details {}

export interface StatDates {}

export interface Data {}

export interface Author {
  _id: string
  firstName: string
  lastName: string
  name: string
  _type: string
}

export interface ManagedAuthor {
  _id: string
  _type: string
  firstName: string
  title: string
  lastName: string
}

export interface Contact {
  _id: string
  owners: Owner[]
  ownerGroups: any[]
  managedOwners: ManagedOwner[]
  status: string
  hashtags: any[]
  _references: any[]
  mentions: any[]
  keywords: string[]
  privacy: string
  emails: any[]
  phoneNumbers: string[]
  local: string[]
  international: string[]
  capabilities: any[]
  locations: any[]
  realms: Realm[]
  tags: Tag[]
  verified: boolean
  deceased: boolean
  distinctFrom: any[]
  historicalIDs: any[]
  firstName: string
  lastName: string
  gender: string
  account: Account
  reactionAuthor: string
  _type: string
  created: Date
  updated: Date
  relationships: any[]
  title: string
  dobVerified: boolean
  deceasedDate?: any
  __v: number
  touchpoints: Touchpoints
  details: Details
  statDates: StatDates
  _sid: number
  data: Data
  author: Author
  countryCode: string
  managedAuthor: ManagedAuthor
  timezone: string
}

import { client } from '../../fluro'

type GetContactTimelineBase = {
  _id: string
  created: string
  date: string
  key: string
}

export type GetContactTimelineDefault = GetContactTimelineBase & {
  _id: string
  created: string
  date: string
  key: string
  message: string
  _type: undefined
}

export type GetContactTimelinePost = GetContactTimelineBase & {
  _type: 'post'
  definition: string
  fullDefinition: {
    title: string
    fields: {
      type: string
      title: string
      key: string
    }[]
  }
  data: Record<string, unknown>
  author?: {
    _id: string
    name: string
  }
}

export type GetContactTimeline =
  | GetContactTimelineDefault
  | GetContactTimelinePost

export function getContactTimeline(
  id: string
): () => Promise<GetContactTimeline[]> {
  return async (): Promise<GetContactTimeline[]> => {
    const response = await client.api.get<GetContactTimeline[]>(
      `/contact/${id}/timeline`
    )
    return response.data
  }
}

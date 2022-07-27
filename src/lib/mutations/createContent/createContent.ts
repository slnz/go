import { MutationFunction } from 'react-query'

import { client } from '../../fluro'

export interface CreateContentData {
  _id: string
  definition: string
}

export interface CreateContentVariables {
  definition: string
  [key: string]: unknown
}

export const createContent: MutationFunction<
  CreateContentData,
  CreateContentVariables
> = async (content) => {
  const response = await client.api.post(
    `/content/${content.definition}`,
    content
  )
  return response.data
}

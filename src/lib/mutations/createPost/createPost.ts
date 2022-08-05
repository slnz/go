import { MutationFunction } from '@tanstack/react-query'

import { client } from '../../fluro'
import { GetPost } from '../../queries/getPost'

export type CreatePostVariables = Omit<GetPost, '_id' | 'parent'> & {
  parent: string
}

export const createPost: MutationFunction<
  GetPost,
  CreatePostVariables
> = async (post) => {
  try {
    const response = await client.api.post<GetPost>(
      `/post/${post.parent}/${post.definition}`,
      { data: post.data, parent: post.parent, realms: post.realms }
    )
    return response.data
  } catch (error) {
    throw new Error(client.utils.errorMessage(error))
  }
}

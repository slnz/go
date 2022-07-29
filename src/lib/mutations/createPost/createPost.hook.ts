import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query'

import { GetPost } from '../../queries/getPost'

import { createPost, CreatePostVariables } from './createPost'

export function useCreatePost(): UseMutationResult<
  GetPost,
  unknown,
  CreatePostVariables
> {
  const queryClient = useQueryClient()
  return useMutation(createPost, {
    onMutate: (post) => {
      const tempId = `${post.parent}-${post.definition}`
      return queryClient.setQueryData<GetPost>(['post', tempId], {
        ...post,
        parent: { _id: post.parent },
        _id: tempId
      })
    },
    onError: (_error, post, previousValue) => {
      console.log('onError', _error, post, previousValue)
      queryClient.removeQueries(['post', previousValue?._id])
    },
    onSettled: (_data, _error, post, previousValue) => {
      console.log('onSettled', _data, _error, post, previousValue)
      queryClient.removeQueries(['post', previousValue?._id])
      if (_data) {
        queryClient.setQueryData<GetPost>(['post', _data._id], _data)
      }
    }
  })
}

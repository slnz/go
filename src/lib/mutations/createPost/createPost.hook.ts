import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { GetPost } from '../../queries/getPost'

import { createPost, CreatePostVariables } from './createPost'

export function useCreatePost(): UseMutationResult<
  GetPost,
  unknown,
  CreatePostVariables
> {
  return useMutation(createPost)
}

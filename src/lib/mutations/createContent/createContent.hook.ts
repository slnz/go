import {
  useMutation,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'

import {
  createContent,
  CreateContentData,
  CreateContentVariables
} from './createContent'

export function useCreateContent(
  options?: Omit<
    UseMutationOptions<
      CreateContentData,
      unknown,
      CreateContentVariables,
      unknown
    >,
    'mutationFn'
  >
): UseMutationResult<CreateContentData, unknown, CreateContentVariables> {
  return useMutation(createContent, options)
}

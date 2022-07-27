import { useMutation, UseMutationResult } from 'react-query'

import {
  createContent,
  CreateContentData,
  CreateContentVariables
} from './createContent'

export function useCreateContent(): UseMutationResult<
  CreateContentData,
  unknown,
  CreateContentVariables
> {
  return useMutation(createContent)
}

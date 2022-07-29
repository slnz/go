import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query'

import { GetProcess } from '../../queries/getProcess/getProcess'

import { updateProcess, UpdateProcessVariables } from './updateProcess'

export function useUpdateProcess(): UseMutationResult<
  GetProcess,
  unknown,
  UpdateProcessVariables
> {
  const queryClient = useQueryClient()
  return useMutation(updateProcess, {
    onMutate: (process) => {
      const previousValue = queryClient.getQueryData<GetProcess>([
        'process',
        process._id
      ])
      if (previousValue != null)
        queryClient.setQueryData<GetProcess>(['process', process._id], {
          ...previousValue,
          ...process
        })
      return previousValue
    },
    onError: (_error, process, previousValue) => {
      queryClient.setQueryData(['process', process._id], previousValue)
    },
    onSettled: (_data, _error, process) => {
      queryClient.invalidateQueries(['process', process._id])
    }
  })
}

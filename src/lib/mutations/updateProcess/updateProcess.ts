import { MutationFunction } from 'react-query'

import { client } from '../../fluro'
import { GetProcess } from '../../queries/getProcess/getProcess'

export type UpdateProcessVariables = Partial<GetProcess> &
  Pick<GetProcess, '_id' | 'definition'>

export const updateProcess: MutationFunction<
  GetProcess,
  UpdateProcessVariables
> = async (process) => {
  const response = await client.api.put<GetProcess>(
    `/content/${process.definition}/${process._id}?replaceData=true`,
    process
  )
  return response.data
}

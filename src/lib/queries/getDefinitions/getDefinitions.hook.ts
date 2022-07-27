import { reduce } from 'lodash'
import { useQuery } from 'react-query'

import {
  getDefinitions,
  ProcessTypeName,
  ProcessObjectType
} from './getDefinitions'

type UseDefinitionsResult<T> = ReturnType<
  typeof useQuery<
    ProcessObjectType<T>[],
    unknown,
    { [definitionName: string]: ProcessObjectType<T> },
    { type: T }[]
  >
>

export function useDefinitions<T extends ProcessTypeName>(
  type: T
): UseDefinitionsResult<T> {
  return useQuery(['definitions', { type }], getDefinitions(type), {
    select: (data) =>
      reduce(
        data,
        (result, definition) => {
          result[definition.definitionName] = definition
          return result
        },
        {} as { [definitionName: string]: typeof data[number] }
      )
  })
}

import { useQuery } from '@tanstack/react-query'
import { reduce } from 'lodash'

import {
  getDefinitions,
  DefinitionTypeName,
  DefinitionObjectType
} from './getDefinitions'

export type UseDefinitionsData<T> = {
  [definitionName: string]: DefinitionObjectType<T>
}

export type UseDefinitionsResult<T> = ReturnType<
  typeof useQuery<
    DefinitionObjectType<T>[],
    unknown,
    UseDefinitionsData<T>,
    { type: T }[]
  >
>

export function useDefinitions<T extends DefinitionTypeName>(
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

import { client } from '../../fluro'

export interface DefinitionCollection<T> {
  definitionName: string
  definitions: T[]
  plural: string
  title: string
}

interface Definition {
  _id: string
  definitionName: string
  plural: string
  title: string
  firstLine?: string
}

export interface ProcessDefinition extends Definition {
  data: { states: { title: string; key: string }[] }
}

export interface PostDefinition extends Definition {
  fields: {
    title: string
    key: string
    type: string
    directive: string
    maximum: number
    minimum: number
    askCount?: number
    description?: string
    placeholder?: string
    options?: { value: string }[]
  }[]
}

export type ProcessTypeName = 'process' | 'post'

export type ProcessObjectType<T> = T extends 'process'
  ? ProcessDefinition
  : T extends 'post'
  ? PostDefinition
  : never

export function getDefinitions<T extends ProcessTypeName>(
  type: T
): () => Promise<ProcessObjectType<T>[]> {
  return async (): Promise<ProcessObjectType<T>[]> => {
    const data = await client.types.retrieve<
      DefinitionCollection<ProcessObjectType<T>>
    >([type])
    return data[0].definitions
  }
}

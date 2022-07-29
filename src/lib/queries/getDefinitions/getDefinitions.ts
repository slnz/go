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

export type DefinitionTypeName = 'process' | 'post'

export type DefinitionObjectType<T> = T extends 'process'
  ? ProcessDefinition
  : T extends 'post'
  ? PostDefinition
  : never

export function getDefinitions<T extends DefinitionTypeName>(
  type: T
): () => Promise<DefinitionObjectType<T>[]> {
  return async (): Promise<DefinitionObjectType<T>[]> => {
    const data = await client.types.retrieve<
      DefinitionCollection<DefinitionObjectType<T>>
    >([type])
    return data[0].definitions
  }
}

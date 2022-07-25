import { client } from '../../fluro'

export interface Definition<TypeDefinition> {
  definitionName: string
  definitions: TypeDefinition[]
  plural: string
  title: string
}

interface TypeDefinition {
  _id: string
  definitionName: string
  plural: string
  title: string
  firstLine?: string
}

export interface ProcessDefinition extends TypeDefinition {
  data: { states: { title: string; key: string }[] }
}

export interface PostDefinition extends TypeDefinition {
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

export interface GetDefinitions<T> {
  [definitionName: string]: T
}

export function transformDefinitions<T>(
  data: Definition<T>
): GetDefinitions<T> {
  const definitions: GetDefinitions<T> = {}

  data.definitions.forEach((definition): void => {
    const { definitionName } = definition as unknown as TypeDefinition
    definitions[definitionName] = definition
  })

  return definitions
}

export async function getProcessDefinitions(): Promise<
  Definition<ProcessDefinition>
> {
  const data = await client.types.retrieve<Definition<ProcessDefinition>>([
    'process'
  ])
  return data[0]
}

export async function getPostDefinitions(): Promise<
  Definition<PostDefinition>
> {
  const data = await client.types.retrieve<Definition<PostDefinition>>(['post'])

  return data[0]
}

import { client } from '../fluro'

interface ProcessDefinition {
  _id: string
  definitionName: string
  data: { states: { title: string; key: string }[] }
  firstLine: string
  plural: string
  title: string
}

interface Definition {
  definitionName: string
  definitions: ProcessDefinition[]
}

export interface GetProcessDefinitions {
  [definitionName: string]: ProcessDefinition
}

export function getProcessDefinitions(): () => Promise<GetProcessDefinitions> {
  return async (): Promise<GetProcessDefinitions> => {
    const data = await client.types.retrieve<Definition>(['process'])
    const definitions: {
      [key: string]: ProcessDefinition
    } = {}

    data[0].definitions.forEach((definition): void => {
      definitions[definition.definitionName] = definition
    })

    return definitions
  }
}

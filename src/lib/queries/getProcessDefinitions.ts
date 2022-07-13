import { ContentDefinition, ProcessDefinitionData } from 'fluro'

import { client } from '../fluro'

export interface GetProcessDefinitions {
  [definitionName: string]: ContentDefinition<ProcessDefinitionData>
}

export async function getProcessDefinitions(): Promise<GetProcessDefinitions> {
  return client.types.retrieve(['process']).then((data) => {
    const definitions: {
      [key: string]: ContentDefinition<ProcessDefinitionData>
    } = {}
    data[0].definitions.forEach((definition): void => {
      definitions[definition.definitionName] = definition
    })
    return definitions
  })
}

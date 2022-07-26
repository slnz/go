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

export async function getProcessDefinitions(): Promise<GetProcessDefinitions> {
  const data = await client.types.retrieve<Definition>(['process'])
  const definitions: {
    [key: string]: ProcessDefinition
  } = {}

  data[0].definitions.forEach((definition): void => {
    definitions[definition.definitionName] = definition
  })

  return definitions
}

// export function getProcessDefinitions(): GetProcessDefinitions {
//   const definitions: {
//     [key: string]: ProcessDefinition
//   } = {}

//   client.types.retrieve(['process']).then((data) => {
//     data[0].definitions.forEach((definition): void => {
//       definitions[definition.definitionName] = definition
//     })
//   })

//   return definitions
// }
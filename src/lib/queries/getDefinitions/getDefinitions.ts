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

export type PostFieldType =
  | 'string'
  | 'boolean'
  | 'date'
  | 'email'
  | 'url'
  | 'number'
  | 'integer'
  | 'float'
// Too complex / out of scope
// | 'reference'
// | 'void'
// | 'object'

export type PostFieldComponent =
  | 'input'
  | 'textarea'
  // Hidden value
  | 'value'
  | 'select'
  | 'button-select'
  | 'order-select'
  | 'datetime-select'
  // Nice to have. See https://3.basecamp.com/3105655/buckets/28313680/todos/5169623952
  | 'search-select'
  | 'time-select'
  | 'date-select'
  | 'dob-select'
  | 'currency'
  // Too complex / out of scope. See https://3.basecamp.com/3105655/buckets/28313680/todos/5169608665
  | 'wysiwyg'
  | 'code'
  | 'color'
  | 'signature'
  | 'countryselect'
  | 'timezoneselect'
  | 'custom'

export interface PostField {
  key: string
  // Label of field
  title: string
  type: PostFieldType
  directive: PostFieldComponent
  // Determines required fields - default is max 1, min 0
  maximum: number
  minimum: number
  askCount?: number
  // Hint test
  description?: string
  placeholder?: string
  // defaultValues: [],
  // allowedValues: [],
  // allowedReferences: []
  // defaultReferences: []
  expressions?: { hide?: string }
  options?: { name: string; value: string }[]
  params?: {
    maxDate?: string
    minDate?: string
  }
}

export interface PostDefinition extends Definition {
  fields: PostField[]
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

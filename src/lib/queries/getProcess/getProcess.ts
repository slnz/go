import { client } from '../../fluro'

interface ProcessDefinition {
  _id: string
  definitionName: string
  data: { states: { title: string; key: string }[] }
  firstLine: string
  plural: string
  title: string
}

export interface Task {
  _id: string
  created: string
  name: string
  required: boolean
  status: 'complete' | 'incomplete' | 'pending' | 'failed'
  description?: string
  instructions?: {
    completeLabel: string
    pendingLabel: string
    failedLabel: string
  }
  postComplete?: string
  postFailed?: string
  postPending?: string
}

export interface TaskList {
  state: string
  title: string
  tasks: Task[]
}

export interface GetProcess {
  _id: string
  definition: string
  state: string
  item: {
    _id: string
    firstName: string
    lastName: string
    _type: 'contact'
  }
  assignedTo: {
    _id: string
    firstName: string
    lastName: string
  }[]
  fullDefinition: ProcessDefinition
  taskLists: TaskList[]
}

export function getProcess(id: string): () => Promise<GetProcess> {
  return async (): Promise<GetProcess> =>
    await client.content.get<GetProcess>(id, {
      type: 'process',
      appendContactDetail: 'all',
      appendAssignments: 'all'
    })
}

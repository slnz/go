import { client } from '../../fluro'

export interface Process {
  _id: string
  // contactIds of assigned users
  assignedTo: string[]
  // process type
  definition: string
  item: string
  taskCount: {
    incomplete: number
    pending: number
  }
}

export interface Contact {
  _id: string
  firstName: string
  lastName: string
}

export interface GetContacts extends Contact {
  // Process card object stores multiple types of processes
  process: {
    [key: string]: Process
  }
}

export function getContacts(
  userContactId?: string
): () => Promise<GetContacts[]> {
  return async (): Promise<GetContacts[]> => {
    const userProcesses = await client.content.retrieve<Process>({
      _type: 'process',
      assignedTo: { $in: [userContactId ?? 'none'] }
    })

    // itemIds could be contactId, typeFormId, paperFormId
    const itemIds = userProcesses.map((process) => process.item)

    const contacts = await client.content.getMultiple<Contact>(
      'contact',
      itemIds,
      {
        select: ['firstName', 'lastName']
      }
    )

    const contactList: { [key: string]: GetContacts } = {}

    // Select only processes with contact itemId
    contacts.forEach((contact) => {
      contactList[contact._id] = { ...contact, process: {} }
    })
    userProcesses.forEach((process) => {
      const processType = process.definition
      const contactId = process.item

      if (contactList[contactId] != null) {
        contactList[contactId].process[processType] = process
      }
    })

    return Object.values(contactList)
  }
}

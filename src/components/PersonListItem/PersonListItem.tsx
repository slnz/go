import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { GetContacts } from '../../lib/queries/getContacts/getContacts'
import { UseDefinitionsData } from '../../lib/queries/getDefinitions'

interface PersonListItemProps {
  contact: GetContacts
  definitions: UseDefinitionsData<'process'>
}

export function PersonListItem({
  contact,
  definitions
}: PersonListItemProps): ReactElement {
  const processKeys = Object.keys(contact.process)
  const processes = processKeys.map((key) => {
    return definitions[key].title
  })
  let processLabel: string
  switch (processes.length) {
    case 0:
      processLabel = ''
      break
    case 1:
      processLabel = processes[0]
      break
    case 2:
      processLabel = `${processes.slice(0, -1).join(', ')} & ${processes.slice(
        -1
      )}`
      break
    default:
      processLabel = `${processes.slice(0, 2).join(', ')} & ${
        processes.slice(2).length
      } more`
  }

  let taskCount = 0
  Object.values(contact.process).forEach((process) => {
    taskCount += process.taskCount.incomplete + process.taskCount.pending
  })

  const taskLabel =
    taskCount === 1 ? `${taskCount} faith step` : `${taskCount} faith steps`

  return (
    <Card sx={{ width: '100%', maxWidth: 345, mb: 2 }}>
      <CardActionArea component={Link} to={`/people/${contact._id}`}>
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            {processLabel}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {contact.firstName} {contact.lastName}
          </Typography>
          <Typography variant="body1">{taskLabel}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

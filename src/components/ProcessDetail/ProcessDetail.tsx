import {
  Box,
  Chip,
  Divider,
  List,
  ListSubheader,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import { Fragment, ReactElement } from 'react'
import { useQuery } from 'react-query'

import { getProcess } from '../../lib/queries/getProcess'
import { TaskItem } from '../TaskItem'

export interface ProcessDetailProps {
  id: string
}

export function ProcessDetail({ id }: ProcessDetailProps): ReactElement {
  const { data, isLoading } = useQuery(['process', id], getProcess(id))

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography
          display="flex"
          justifyContent="center"
          variant="h4"
          align="center"
        >
          {isLoading ? <Skeleton width={220} /> : data?.item.firstName}
        </Typography>
        <Typography
          display="flex"
          justifyContent="center"
          variant="h5"
          align="center"
          gutterBottom
        >
          {isLoading ? <Skeleton width={190} /> : data?.item.lastName}
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          {data?.assignedTo.map((assignee) => (
            <Chip
              label={`${assignee.firstName} ${assignee.lastName}`}
              key={assignee._id}
              size="small"
            />
          ))}
        </Stack>
      </Box>
      <Divider />
      <List>
        {data?.taskLists.map((taskList) => (
          <Fragment key={taskList.title}>
            <ListSubheader>
              {taskList.title.replace(/[Tt]asks$/, 'Faith Steps')}
            </ListSubheader>
            {taskList.tasks.map((task) => (
              <TaskItem task={task} taskList={taskList} key={task._id} />
            ))}
          </Fragment>
        ))}
      </List>
    </>
  )
}

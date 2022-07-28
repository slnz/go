import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Fragment, ReactElement } from 'react'

import { useUpdateProcess } from '../../lib/mutations/updateProcess/updateProcess.hook'
import { getProcess } from '../../lib/queries/getProcess'
import { TaskItem } from '../TaskItem'

export interface ProcessDetailProps {
  id: string
}

export function ProcessDetail({ id }: ProcessDetailProps): ReactElement {
  const { data, isLoading } = useQuery(['process', id], getProcess(id))
  const { mutate } = useUpdateProcess()

  function handleStateChange(event: SelectChangeEvent): void {
    if (data == null) return

    mutate({
      _id: data._id,
      definition: data.definition,
      state: event.target.value
    })
  }

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
          {isLoading && (
            <Skeleton
              width={86}
              height={24}
              variant="rectangular"
              sx={{ borderRadius: 4 }}
            />
          )}
          {data?.assignedTo.map((assignee) => (
            <Chip
              label={`${assignee.firstName} ${assignee.lastName}`}
              key={assignee._id}
              size="small"
            />
          ))}
        </Stack>
      </Box>
      <Box sx={{ m: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="state-select-label">Current State</InputLabel>
          <Select
            labelId="state-select-label"
            id="state-select"
            data-testid="state-select"
            value={data?.state ?? ''}
            label="Current State"
            onChange={handleStateChange}
            disabled={isLoading}
          >
            {data?.fullDefinition.data.states.map(({ title, key }) => (
              <MenuItem key={key} value={key}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <List>
        {isLoading && (
          <>
            <ListSubheader>
              <Skeleton width={220} />
            </ListSubheader>
            {[0, 1, 2, 3].map((value) => (
              <ListItem key={value}>
                <ListItemIcon>
                  <Checkbox edge="start" disabled />
                </ListItemIcon>
                <ListItemText
                  primary={<Skeleton width={210} />}
                  secondary={<Skeleton width={190} />}
                />
              </ListItem>
            ))}
          </>
        )}
        {data?.taskLists.map((taskList) => (
          <Fragment key={taskList.title}>
            <ListSubheader>
              {taskList.title.replace(/[Tt]asks$/, 'Faith Steps')}
            </ListSubheader>
            {taskList.tasks.map((task) => (
              <TaskItem
                process={data}
                task={task}
                taskList={taskList}
                key={task._id}
              />
            ))}
          </Fragment>
        ))}
      </List>
    </>
  )
}

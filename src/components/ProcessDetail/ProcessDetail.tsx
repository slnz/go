import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  List,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import { Fragment, ReactElement } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { updateProcess } from '../../lib/mutations/updateProcess/updateProcess'
import { getProcess } from '../../lib/queries/getProcess'
import { GetProcess } from '../../lib/queries/getProcess/getProcess'
import { TaskItem } from '../TaskItem'

export interface ProcessDetailProps {
  id: string
}

export function ProcessDetail({ id }: ProcessDetailProps): ReactElement {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(['process', id], getProcess(id))
  const mutation = useMutation(updateProcess, {
    onMutate: (process) => {
      const previousValue = queryClient.getQueryData<GetProcess>([
        'process',
        process._id
      ])
      queryClient.setQueryData<GetProcess | undefined>(
        ['process', process._id],
        (old) => (old ? { ...old, process } : undefined)
      )
      return previousValue
    },
    onError: (_error, process, previousValue) => {
      queryClient.setQueryData(['process', process._id], previousValue)
    },
    onSettled: (_data, _error, process) => {
      queryClient.invalidateQueries(['process', process._id])
    }
  })

  async function handleStateChange(event: SelectChangeEvent): Promise<void> {
    if (data?.definition != null) {
      await mutation.mutate({
        _id: data._id,
        definition: data.definition,
        state: event.target.value
      })
    }
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
            value={data?.state ?? ''}
            label="Current State"
            onChange={handleStateChange}
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

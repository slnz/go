import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ErrorIcon from '@mui/icons-material/Error'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { findIndex } from 'lodash'
import { useSnackbar } from 'notistack'
import { ReactElement } from 'react'

import { useUpdateProcess } from '../../../lib/mutations/updateProcess/updateProcess.hook'
import {
  GetProcess,
  Task,
  TaskList
} from '../../../lib/queries/getProcess/getProcess'

export interface TaskItemDrawerProps {
  process: Pick<GetProcess, '_id' | 'taskLists' | 'definition'>
  task: Task
  taskList: TaskList
  onClose: () => void
  open: boolean
}

export function TaskItemDrawer({
  process,
  task,
  taskList,
  open,
  onClose
}: TaskItemDrawerProps): ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useUpdateProcess()

  function onClick(status: Task['status']): () => Promise<void> {
    return async function (): Promise<void> {
      const taskLists = process.taskLists
      const taskIndex = findIndex(taskList.tasks, ['_id', task._id])
      taskList.tasks[taskIndex] = { ...task, status }
      const taskListIndex = findIndex(taskLists, ['title', taskList.title])
      taskLists[taskListIndex] = taskList

      try {
        await mutateAsync({
          _id: process._id,
          definition: process.definition,
          taskLists
        })
        enqueueSnackbar('Faith step updated successfully!', {
          variant: 'success'
        })
      } catch {
        enqueueSnackbar('Failed to update faith step. Please try again!', {
          variant: 'error'
        })
      }
    }
  }
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderTopLeftRadius: 8, borderTopRightRadius: 8 } }}
    >
      <Box
        sx={{
          width: 'auto'
        }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List sx={{ p: 0 }}>
          <ListItem>
            <ListItemText
              primary={task.name}
              secondary={task.description?.replace(/<\/?[^>]+(>|$)/g, '')}
            />
          </ListItem>
          <Divider />
          <ListItemButton
            selected={task.status === 'complete'}
            onClick={onClick('complete')}
          >
            <ListItemIcon>
              <CheckBoxIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary={task.instructions?.completeLabel ?? 'Complete'}
            />
          </ListItemButton>
          <ListItemButton
            selected={task.status === 'pending'}
            onClick={onClick('pending')}
          >
            <ListItemIcon>
              <IndeterminateCheckBoxIcon color="warning" />
            </ListItemIcon>
            <ListItemText
              primary={task.instructions?.pendingLabel ?? 'In Progress'}
            />
          </ListItemButton>
          <ListItemButton
            selected={task.status === 'failed'}
            onClick={onClick('failed')}
          >
            <ListItemIcon>
              <ErrorIcon color="error" />
            </ListItemIcon>
            <ListItemText
              primary={task.instructions?.failedLabel ?? 'Failed'}
            />
          </ListItemButton>
          {task.status !== 'incomplete' && (
            <ListItemButton onClick={onClick('incomplete')}>
              <ListItemIcon>
                <CheckBoxOutlineBlankIcon />
              </ListItemIcon>
              <ListItemText
                primary="Incomplete"
                secondary="Reset this faith step back to it's untouched state"
              />
            </ListItemButton>
          )}
          <Divider variant="inset" />
          <ListItemButton>
            <ListItemText inset primary="Cancel" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  )
}

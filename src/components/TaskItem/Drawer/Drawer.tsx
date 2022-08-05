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
import { ReactElement, useCallback, useState } from 'react'

import { useUpdateProcess } from '../../../lib/mutations/updateProcess/updateProcess.hook'
import {
  GetProcess,
  Task,
  TaskList
} from '../../../lib/queries/getProcess/getProcess'
import { FullscreenDialog } from '../../FullscreenDialog'
import { PostForm } from '../../PostForm'

export interface TaskItemDrawerProps {
  process: Pick<GetProcess, '_id' | 'taskLists' | 'definition' | 'item'>
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
  const [taskStatus, setTaskStatus] = useState(task.status)
  const [postType, setPostType] = useState<string>()

  async function handleSubmit(status = taskStatus): Promise<void> {
    const taskLists = process.taskLists
    const taskIndex = findIndex(taskList.tasks, ['_id', task._id])
    taskList.tasks[taskIndex] = {
      ...task,
      status: taskStatus
    }
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
      handleDialogClose()
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar('Failed to update faith step. Please try again!', {
          variant: 'error'
        })
      }
    }
  }

  function handleDialogClose(): void {
    setPostType(undefined)
  }

  function handleClick(status: Task['status']): () => void {
    return function (): void {
      setTaskStatus(status)
      const postType = getPostType(status)
      setPostType(postType)
      if (postType == null) {
        handleSubmit(status)
      }
    }
  }

  const getPostType = useCallback(
    (status: Omit<Task['status'], 'incomplete'>) => {
      switch (status) {
        case 'complete':
          return task.postComplete
        case 'pending':
          return task.postPending
        case 'failed':
          return task.postFailed
        default:
          return undefined
      }
    },
    [task.postComplete, task.postPending, task.postFailed]
  )

  return (
    <>
      <FullscreenDialog open={postType != null} onClose={handleDialogClose}>
        {postType && (
          <PostForm
            personId={process.item._id}
            definitionType={postType}
            onSubmit={handleSubmit}
          />
        )}
      </FullscreenDialog>
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
              onClick={handleClick('complete')}
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
              onClick={handleClick('pending')}
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
              onClick={handleClick('failed')}
            >
              <ListItemIcon>
                <ErrorIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary={task.instructions?.failedLabel ?? 'Failed'}
              />
            </ListItemButton>
            {task.status !== 'incomplete' && (
              <ListItemButton onClick={handleClick('incomplete')}>
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
    </>
  )
}

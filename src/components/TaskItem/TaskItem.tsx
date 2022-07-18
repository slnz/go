import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ErrorIcon from '@mui/icons-material/Error'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import {
  Checkbox,
  CheckboxProps,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { ReactElement, useState } from 'react'

import {
  GetProcess,
  Task,
  TaskList
} from '../../lib/queries/getProcess/getProcess'

import { TaskItemDrawer } from './Drawer'

interface CheckedIconProps {
  status: Task['status']
}

function CheckedIcon({ status }: CheckedIconProps): ReactElement {
  switch (status) {
    case 'complete':
      return <CheckBoxIcon />
    case 'pending':
      return <IndeterminateCheckBoxIcon />
    case 'failed':
      return <ErrorIcon />
    default:
      return <></>
  }
}

function checkboxColor(status: Task['status']): CheckboxProps['color'] {
  switch (status) {
    case 'complete':
      return 'success'
    case 'pending':
      return 'warning'
    case 'failed':
      return 'error'
    default:
      return 'default'
  }
}

interface TaskItemProps {
  process: GetProcess
  task: Task
  taskList: TaskList
}

export function TaskItem({
  process,
  task,
  taskList
}: TaskItemProps): ReactElement {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TaskItemDrawer
        process={process}
        task={task}
        taskList={taskList}
        open={open}
        onClose={(): void => setOpen(false)}
      />
      <ListItemButton onClick={(): void => setOpen(true)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            disableRipple
            checked={task.status !== 'incomplete'}
            checkedIcon={<CheckedIcon status={task.status} />}
            color={checkboxColor(task.status)}
          />
        </ListItemIcon>
        <ListItemText
          primary={task.name}
          secondary={task.description?.replace(/<\/?[^>]+(>|$)/g, '')}
        />
      </ListItemButton>
    </>
  )
}

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
import { ReactElement } from 'react'

import { Task, TaskList } from '../../../lib/queries/getProcess/getProcess'

interface Props {
  task: Task
  taskList: TaskList
  onClose: () => void
  open: boolean
}

export function TaskItemDrawer({ task, open, onClose }: Props): ReactElement {
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
          <ListItemButton selected={task.status === 'complete'}>
            <ListItemIcon>
              <CheckBoxIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary={task.instructions?.completeLabel ?? 'Complete'}
            />
          </ListItemButton>
          <ListItemButton selected={task.status === 'pending'}>
            <ListItemIcon>
              <IndeterminateCheckBoxIcon color="warning" />
            </ListItemIcon>
            <ListItemText
              primary={task.instructions?.pendingLabel ?? 'In Progress'}
            />
          </ListItemButton>
          <ListItemButton selected={task.status === 'failed'}>
            <ListItemIcon>
              <ErrorIcon color="error" />
            </ListItemIcon>
            <ListItemText
              primary={task.instructions?.failedLabel ?? 'Failed'}
            />
          </ListItemButton>
          {task.status !== 'incomplete' && (
            <ListItemButton>
              <ListItemIcon>
                <CheckBoxOutlineBlankIcon />
              </ListItemIcon>
              <ListItemText
                primary="Incomplete"
                secondary="Reset this faith step back to it's untouched state"
              />
            </ListItemButton>
          )}
        </List>
      </Box>
    </Drawer>
  )
}

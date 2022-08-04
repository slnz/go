import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import { TransitionProps } from '@mui/material/transitions'
import { ReactElement, ReactNode, forwardRef } from 'react'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface FullscreenDialogProps {
  open: boolean
  title?: string
  action?: ReactNode
  children: ReactNode
  onClose: () => void
}

export function FullscreenDialog({
  open,
  title,
  action,
  children,
  onClose
}: FullscreenDialogProps): ReactElement {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          {action}
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  )
}

import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { values } from 'lodash'
import { forwardRef, ReactElement, Ref, useState } from 'react'

import { useCreateContent } from '../../lib/mutations/createContent/createContent.hook'
import {
  ProcessDefinition,
  useDefinitions
} from '../../lib/queries/getDefinitions'
import { useAuth } from '../../lib/useAuth'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface AddProcessButtonProps {
  /** add the item with id to the selected process */
  itemId: string
  /** only show processes that receive this type e.g `contact` or any */
  itemType: string
  /** called when the item has been added to the process successfully */
  onSuccess?: () => void
}

export function AddProcessButton({
  onSuccess,
  itemId,
  itemType
}: AddProcessButtonProps): ReactElement {
  const { data } = useDefinitions('process')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<ProcessDefinition>()
  const { mutateAsync } = useCreateContent()
  const { user } = useAuth()

  async function handleSave(): Promise<void> {
    if (selected == null || user == null) return
    await mutateAsync({
      definition: selected.definitionName,
      _type: 'process',
      item: { _id: itemId, type: itemType },
      assignedTo: [{ _id: user._id }]
    })
    setOpen(false)
  }

  function handleClose(): void {
    setOpen(false)
  }

  const handleOpen = (): void => setOpen(true)

  return (
    <>
      <Button onClick={handleOpen}>Add Process</Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add To Process
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              Select
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {data != null &&
            values(data)
              .filter(({ data }) =>
                data.processTypes != null
                  ? data.processTypes?.includes(itemType)
                  : true
              )
              .map((process) => (
                <ListItemButton
                  key={process._id}
                  selected={selected?._id === process._id}
                  onClick={(): void => setSelected(process)}
                >
                  {selected?._id === process._id && (
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText inset={selected?._id !== process._id}>
                    {process.title}
                  </ListItemText>
                </ListItemButton>
              ))}
        </List>
      </Dialog>
    </>
  )
}

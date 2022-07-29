import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import {
  AppBar,
  Dialog,
  Fab,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router'

import { createContact } from '../../lib/mutations/createContact'
import { ContactForm, ContactFormProps } from '../ContactForm/ContactForm'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export function AddContactButton(): ReactElement {
  const [open, setOpen] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const mutation = useMutation(createContact)
  const history = useHistory()

  const handleClickOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const onSubmit: ContactFormProps['onSubmit'] = async (
    values
  ): Promise<void> => {
    if (values.lastName === '') {
      values.lastName = 'Unknown'
    }
    const response = await mutation.mutateAsync({ ...values })
    enqueueSnackbar('Contact Created', { variant: 'success' })
    history.push(`/people/${response._id}`)
  }
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        name="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
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
              Add Contact
            </Typography>
          </Toolbar>
        </AppBar>
        <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
      </Dialog>
    </>
  )
}

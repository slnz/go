import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { ReactElement, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import {
  AddProcessButtonDialog,
  AddProcessButtonDialogProps
} from './Dialog/Dialog'

export type AddProcessButtonProps = Omit<
  AddProcessButtonDialogProps,
  'open' | 'onClose'
>

export function AddProcessButton(props: AddProcessButtonProps): ReactElement {
  const [open, setOpen] = useState(false)
  const { search } = useLocation()

  useEffect(() => {
    if (search === '?addtoprocess=true') {
      setOpen(true)
    }
  }, [search])

  return (
    <>
      <Button onClick={(): void => setOpen(true)} startIcon={<AddIcon />}>
        Add Process
      </Button>
      <AddProcessButtonDialog
        open={open}
        onClose={(): void => setOpen(false)}
        {...props}
      />
    </>
  )
}

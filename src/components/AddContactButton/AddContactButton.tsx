import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export function AddContactButton(): ReactElement {
  return (
    <Fab
      color="primary"
      aria-label="add"
      component={Link}
      to="/tabs/people/add"
    >
      <AddIcon />
    </Fab>
  )
}

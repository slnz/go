import { Container, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'

import { client } from '../../lib/fluro'
import { createContact } from '../../lib/mutations/createContact'
import { ContactForm, ContactFormProps } from '../ContactForm/ContactForm'

export function AddContact(): ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const mutation = useMutation(createContact)
  const history = useHistory()

  const onSubmit: ContactFormProps['onSubmit'] = async (
    values
  ): Promise<void> => {
    if (values.lastName === '') {
      values.lastName = 'Unknown'
    }

    try {
      const response = await mutation.mutateAsync({ ...values })
      enqueueSnackbar('Contact Created', { variant: 'success' })
      history.push(`/tabs/people/${response._id}`)
    } catch (error) {
      const formattedError = new Error(client.utils.errorMessage(error))
      console.error(formattedError)
    }
  }
  return (
    <Container sx={{ p: 2 }}>
      <Container maxWidth="sm">
        <Typography>Fill in the details below to add a new contact</Typography>
      </Container>
      <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
    </Container>
  )
}

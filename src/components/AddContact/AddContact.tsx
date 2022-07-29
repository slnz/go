import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { useHistory } from 'react-router'

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
    const response = await mutation.mutateAsync({ ...values })
    enqueueSnackbar('Contact Created', { variant: 'success' })
    history.push(`/people/${response._id}`)
  }
  return (
    <>
      <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
    </>
  )
}

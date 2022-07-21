import { IonContent, IonHeader, IonPage } from '@ionic/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { filter, find, get } from 'lodash'
import { useSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useHistory } from 'react-router'

import { ContactForm } from '../../../components/ContactForm'
import { ContactFormProps } from '../../../components/ContactForm/ContactForm'
import { client } from '../../../lib/fluro/client'
import { createContact } from '../../../lib/mutations/createContact'
import { createProcessCard } from '../../../lib/mutations/createProcessCard'
import {
  GetContact,
  getContact
} from '../../../lib/queries/getContact/getContact'
import { useAuth } from '../../../lib/useAuth/useAuth'

export function PersonAddPage(): ReactElement {
  const history = useHistory()
  const contacts = useAuth().user?.contacts[0] ?? ''
  const { data: userContact } = useQuery(['contact'], getContact(contacts))
  const realms = userContact?.realms
  const contactId = userContact?._id

  const mutation = useMutation(createContact)

  const processMutation = useMutation(createProcessCard)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit: ContactFormProps['onSubmit'] = async (
    values
  ): Promise<void> => {
    if (values.lastName === '') {
      values.lastName = 'Unknown'
    }
    console.log(values.process)
    if (realms != null) {
      try {
        const response = await mutation.mutateAsync({ ...values, realms })
        console.log('response', response)

        const createdContact = response._id
        try {
          const response = await processMutation.mutateAsync({
            ...values,
            realms,
            contactId,
            createdContact
          })
          console.log('State: ' + values.state)
          console.log('process card response', response)
          enqueueSnackbar('Contact Created', { variant: 'success' })
        } catch (error) {
          const formattedError = new Error(client.utils.errorMessage(error))
          console.log('formatted', formattedError)
          console.log('in here', createdContact)
          enqueueSnackbar(formattedError.toString(), { variant: 'error' })
          const newContact = await client.content.get<GetContact>(
            createdContact,
            {
              appendProcess: 'all',
              select: [
                'firstName',
                'lastName',
                'phoneNumbers',
                'emails',
                'realms'
              ]
            }
          )
          console.log('newContact', newContact)
          const card = filter(get(newContact, 'process')[values.process], {
            item: createdContact
          })
          console.log('card', card)
          const response = await client.api.put<any>(
            `/content/${values.process}/${card[0]._id}`,
            {
              assignedTo: contactId
            }
          )
          console.log('res', response)
        }
      } catch (error) {
        const formattedError = new Error(client.utils.errorMessage(error))
        console.error(formattedError)
      }
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Button
              sx={{ mr: 2 }}
              onClick={(): void => history.goBack()}
              startIcon={<ArrowBackIcon />}
              color="inherit"
            >
              Back
            </Button>
          </Toolbar>
        </AppBar>
      </IonHeader>
      <IonContent fullscreen>
        <Container maxWidth="sm" sx={{ p: 2 }}>
          <Typography variant="h2">Add Contact</Typography>
          <Typography>Fill in the details to add a contact</Typography>
        </Container>

        <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  )
}

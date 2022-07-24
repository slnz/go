import { IonContent, IonHeader, IonPage } from '@ionic/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useHistory } from 'react-router'

import { ContactForm } from '../../../components/ContactForm'
import { ContactFormProps } from '../../../components/ContactForm/ContactForm'
import { client } from '../../../lib/fluro/client'
import { createContact } from '../../../lib/mutations/createContact'
import { getPersona } from '../../../lib/queries/getPersona/getPersona'
import { useAuth } from '../../../lib/useAuth/useAuth'

export function PersonAddPage(): ReactElement {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const user = useAuth().user?.persona ?? ''
  const { data: persona } = useQuery(['persona'], getPersona(user))
  const realms = persona?.realms
  const mutation = useMutation(createContact)

  const onSubmit: ContactFormProps['onSubmit'] = async (
    values
  ): Promise<void> => {
    if (values.lastName === '') {
      values.lastName = 'Unknown'
    }
    if (realms != null) {
      try {
        const response = await mutation.mutateAsync({ ...values, realms })
        console.log('response', response)
        enqueueSnackbar('Contact Created', { variant: 'success' })
        history.goBack()
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

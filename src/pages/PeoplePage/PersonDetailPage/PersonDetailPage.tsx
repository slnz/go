import { IonContent, IonHeader, IonPage } from '@ionic/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@mui/material'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { RouteComponentProps, useHistory } from 'react-router'

import type { Contact } from '../../../@types/contact'
import { client } from '../../../lib/fluro'

type PersonDetailPageProps = Pick<
  RouteComponentProps<{
    personId: string
  }>,
  'match'
>

export function PersonDetailPage({
  match
}: PersonDetailPageProps): ReactElement {
  const history = useHistory()
  const { data } = useQuery(
    ['contact', match.params.personId],
    async () =>
      await client.content.get<Contact>(match.params.personId, {
        appendProcess: 'all'
      })
  )
  return (
    <IonPage>
      <IonHeader>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton onClick={(): void => history.goBack()} color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Typography flexGrow={1} align="center">
              {data?.title}
            </Typography>
            <Box sx={{ width: 40 }} />
          </Toolbar>
        </AppBar>
      </IonHeader>
      <IonContent fullscreen>
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            '> .MuiTab-root': { color: 'primary.main' }
          }}
        >
          <Tab
            icon={<CallOutlinedIcon />}
            label="Call"
            disabled={data?.phoneNumbers[0] == null}
          />
          <Tab icon={<MessageOutlinedIcon />} label="Text" />
          <Tab icon={<BookmarkAddOutlinedIcon />} label="Save" />
        </Box>
        <Divider />
      </IonContent>
    </IonPage>
  )
}

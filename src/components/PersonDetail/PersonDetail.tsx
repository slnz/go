import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tab,
  Typography
} from '@mui/material'
import { flatMap, map } from 'lodash'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'

import { getContact } from '../../lib/queries/getContact'

interface Props {
  id: string
}

export function PersonDetail({ id }: Props): ReactElement {
  const { data } = useQuery(['contact', id], getContact(id))

  return (
    <>
      <Box sx={{ px: 3, py: 5 }}>
        <Typography variant="h4" align="center">
          {data?.firstName}
        </Typography>
        <Typography variant="h5" align="center">
          {data?.lastName}
        </Typography>
      </Box>
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
          href={`tel:${data?.phoneNumbers[0]}`}
        />
        <Tab
          icon={<MessageOutlinedIcon />}
          label="Text"
          disabled={data?.phoneNumbers[0] == null}
          href={`sms:${data?.phoneNumbers[0]}`}
        />
        <Tab
          icon={<EmailOutlinedIcon />}
          label="Email"
          disabled={data?.emails[0] == null}
          href={`mailto:${data?.emails[0]}`}
        />
      </Box>
      <Divider />
      <List component="nav">
        {data && (data?.phoneNumbers.length > 0 || data?.emails.length > 0) && (
          <ListSubheader>Contact Details</ListSubheader>
        )}
        {data?.phoneNumbers.map((phoneNumber) => (
          <ListItemButton
            key={phoneNumber}
            component="a"
            href={`tel:${phoneNumber}`}
          >
            <ListItemIcon>
              <CallOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={phoneNumber} />
          </ListItemButton>
        ))}
        {data?.emails.map((email) => (
          <ListItemButton key={email} component="a" href={`mailto:${email}`}>
            <ListItemIcon>
              <EmailOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={email} />
          </ListItemButton>
        ))}
        {Object.keys(data?.process ?? {}).length > 0 && (
          <ListSubheader>Processes</ListSubheader>
        )}
        {data?.process &&
          flatMap(data.process, (value, key) =>
            map(value, ({ state, definition }) => (
              <ListItem key={key}>
                <ListItemText primary={state} secondary={definition} />
              </ListItem>
            ))
          )}
      </List>
    </>
  )
}

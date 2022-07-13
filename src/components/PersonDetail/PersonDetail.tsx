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
  Skeleton,
  Tab,
  Typography
} from '@mui/material'
import { flatMap, map } from 'lodash'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'

import { getContact } from '../../lib/queries/getContact'

export interface PersonDetailProps {
  id: string
}

export function PersonDetail({ id }: PersonDetailProps): ReactElement {
  const { data: contact, isLoading: isContactLoading } = useQuery(
    ['contact', id],
    getContact(id)
  )

  return (
    <>
      <Box sx={{ px: 3, py: 5 }}>
        <Typography
          display="flex"
          justifyContent="center"
          variant="h4"
          align="center"
        >
          {isContactLoading ? <Skeleton width="70%" /> : contact?.firstName}
        </Typography>
        <Typography
          display="flex"
          justifyContent="center"
          variant="h5"
          align="center"
        >
          {isContactLoading ? <Skeleton width="60%" /> : contact?.lastName}
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
          disabled={contact?.phoneNumbers[0] == null}
          href={`tel:${contact?.phoneNumbers[0]}`}
        />
        <Tab
          icon={<MessageOutlinedIcon />}
          label="Text"
          disabled={contact?.phoneNumbers[0] == null}
          href={`sms:${contact?.phoneNumbers[0]}`}
        />
        <Tab
          icon={<EmailOutlinedIcon />}
          label="Email"
          disabled={contact?.emails[0] == null}
          href={`mailto:${contact?.emails[0]}`}
        />
      </Box>
      <Divider />
      <List component="nav">
        {(isContactLoading ||
          (contact &&
            (contact?.phoneNumbers.length > 0 ||
              contact?.emails.length > 0))) && (
          <ListSubheader>Contact Details</ListSubheader>
        )}
        {contact?.phoneNumbers.map((phoneNumber) => (
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
        {isContactLoading && (
          <ListItemButton>
            <ListItemIcon>
              <CallOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={<Skeleton width="60%" />} />
          </ListItemButton>
        )}
        {contact?.emails.map((email) => (
          <ListItemButton key={email} component="a" href={`mailto:${email}`}>
            <ListItemIcon>
              <EmailOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={email} />
          </ListItemButton>
        ))}
        {isContactLoading && (
          <ListItemButton>
            <ListItemIcon>
              <EmailOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={<Skeleton width="80%" />} />
          </ListItemButton>
        )}
        {Object.keys(contact?.process ?? {}).length > 0 && (
          <ListSubheader>Processes</ListSubheader>
        )}
        {contact?.process &&
          flatMap(contact.process, (value, key) =>
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

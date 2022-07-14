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

import { getProcessDefinitions } from '../../lib/queries'
import { getContact } from '../../lib/queries/getContact'

export interface PersonDetailProps {
  id: string
}

export function PersonDetail({ id }: PersonDetailProps): ReactElement {
  const { data: contact, isLoading: isContactLoading } = useQuery(
    ['contact', id],
    getContact(id)
  )
  const { data: processes, isLoading: isProcessesLoading } = useQuery(
    ['processes'],
    getProcessDefinitions
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
          {isContactLoading ? <Skeleton width={220} /> : contact?.firstName}
        </Typography>
        <Typography
          display="flex"
          justifyContent="center"
          variant="h5"
          align="center"
        >
          {isContactLoading ? <Skeleton width={190} /> : contact?.lastName}
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
          <ListItem>
            <ListItemIcon>
              <CallOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={<Skeleton width={160} />} />
          </ListItem>
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
          <ListItem>
            <ListItemIcon>
              <EmailOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={<Skeleton width={220} />} />
          </ListItem>
        )}
        {(isContactLoading ||
          Object.keys(contact?.process ?? {}).length > 0) && (
          <ListSubheader>Processes</ListSubheader>
        )}
        {isContactLoading && (
          <ListItem>
            <ListItemText
              primary={<Skeleton width={100} />}
              secondary={<Skeleton width={80} />}
            />
          </ListItem>
        )}
        {contact?.process &&
          flatMap(contact.process, (value, key) =>
            map(value, ({ state, definition }) => (
              <ListItemButton key={key}>
                <ListItemText
                  primary={
                    isProcessesLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      processes?.[definition]?.data?.states?.find(
                        ({ key }) => key === state
                      )?.title
                    )
                  }
                  secondary={
                    isProcessesLoading ? (
                      <Skeleton width={80} />
                    ) : (
                      processes?.[definition]?.title
                    )
                  }
                />
              </ListItemButton>
            ))
          )}
      </List>
    </>
  )
}

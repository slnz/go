import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton
} from '@mui/material'
import { flatMap, map } from 'lodash'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'

import { getContact } from '../../../lib/queries/getContact'
import { getProcessDefinitions } from '../../../lib/queries/getProcessDefinitions'

export interface PersonDetailInfoProps {
  id: string
}

export function PersonDetailInfo({ id }: PersonDetailInfoProps): ReactElement {
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
      <List component="nav">
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
            map(value, ({ state, definition }) =>
              isProcessesLoading ? (
                <ListItem key={key}>
                  <ListItemText
                    primary={<Skeleton width={100} />}
                    secondary={<Skeleton width={80} />}
                  />
                </ListItem>
              ) : (
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
              )
            )
          )}
      </List>
    </>
  )
}

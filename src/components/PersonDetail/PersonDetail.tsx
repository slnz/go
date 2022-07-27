import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Divider, Skeleton, Tab, Typography } from '@mui/material'
import { ReactElement, SyntheticEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { getContact } from '../../lib/queries/getContact'

import { PersonDetailInfo } from './Info'
import { PersonDetailTimeline } from './Timeline'

export interface PersonDetailProps {
  id: string
}

export function PersonDetail({ id }: PersonDetailProps): ReactElement {
  const [value, setValue] = useState('1')

  const handleChange = (_event: SyntheticEvent, newValue: string): void => {
    setValue(newValue)
  }

  const { data: contact, isLoading: isContactLoading } = useQuery(
    ['contact', id],
    getContact(id)
  )

  return (
    <>
      <Box sx={{ px: 3, pt: 3, pb: 1 }}>
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
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            textColor="inherit"
            variant="fullWidth"
            aria-label="contact tabs"
          >
            <Tab label="Details" value="1" />
            <Tab label="Timeline" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 0 }}>
          <PersonDetailInfo id={id} />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0 }}>
          <PersonDetailTimeline id={id} />
        </TabPanel>
      </TabContext>
    </>
  )
}

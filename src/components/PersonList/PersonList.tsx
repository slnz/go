import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Card, CardContent, Skeleton, Typography } from '@mui/material'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/system'
import { ReactElement, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { getContacts } from '../../lib/queries/getContacts'
import { GetContacts } from '../../lib/queries/getContacts/getContacts'
import { getProcessDefinitions } from '../../lib/queries/getProcessDefinitions'
import { useAuth } from '../../lib/useAuth'
import { PersonListItem } from '../PersonListItem'

interface Processes {
  // Where string[] is the array of contactIds
  [processType: string]: string[]
}

interface PersonListProps {
  search: string
}

function getAllProcesses(contacts: GetContacts[] | undefined): Processes {
  const allProcesses: Processes = { all: [] }

  if (contacts != null) {
    contacts.forEach((contact) => {
      const processTypes = Object.keys(contact.process)
      const processes = Object.values(contact.process)

      processTypes.forEach((type) => {
        if (allProcesses[type] == null) {
          allProcesses[type] = []
        }
      })
      processes.forEach((process) => {
        allProcesses.all.push(process.item)
        allProcesses[process.definition].push(process.item)
      })
    })
  }

  return allProcesses
}

export function PersonList({ search }: PersonListProps): ReactElement {
  const { user } = useAuth()
  const [processType, setProcessType] = useState('all')

  const { data: definitions, isLoading: isDefinitionLoading } = useQuery(
    ['definitions', { type: 'process' }],
    getProcessDefinitions
  )

  const { data: contacts, isLoading: isContactLoading } = useQuery(
    ['contacts', { user: user?.contacts[0] }],
    getContacts(user?.contacts[0]),
    {
      enabled: user?.contacts[0] != null
    }
  )

  const allProcesses = useMemo(() => {
    return getAllProcesses(contacts)
  }, [contacts])

  const processTypes = Object.keys(allProcesses)
  const oneProcessType = processTypes.length < 3

  const handleChange = (e: React.SyntheticEvent, newValue: string): void => {
    setProcessType(newValue)
  }

  return (
    <TabContext value={processType}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={handleChange}
          variant={'scrollable'}
          aria-label="process tab list"
        >
          <Tab key={`all-tab`} sx={{ px: 1 }} label={'All'} value={'all'} />
          {!isDefinitionLoading && !isContactLoading && definitions != null ? (
            processTypes
              .slice(1, oneProcessType ? 1 : undefined)
              .map((processType) => (
                <Tab
                  key={`${processType}-tab`}
                  sx={{ px: 1 }}
                  label={
                    allProcesses[processType].length === 1
                      ? definitions[processType].title
                      : definitions[processType].plural
                  }
                  value={processType}
                />
              ))
          ) : (
            <Box sx={{ display: 'flex' }}>
              {[1, 2, 3].map((num) => (
                <Skeleton
                  key={`placeholder-tab${num}`}
                  variant="text"
                  width={80}
                  height={26}
                  sx={{
                    mx: 1.5,
                    my: '11px'
                  }}
                />
              ))}
            </Box>
          )}
        </TabList>
      </Box>
      {processTypes
        .slice(0, oneProcessType ? 1 : undefined)
        .map((processType, index) => {
          return (
            <TabPanel
              key={`${processTypes[index]}-tabPanel`}
              value={processTypes[index]}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {!isContactLoading &&
              !isDefinitionLoading &&
              contacts != null &&
              definitions != null ? (
                Object.values(contacts)
                  .filter((contact) => {
                    return (
                      allProcesses[processType].includes(contact._id) &&
                      `${contact.firstName} ${contact.lastName}`
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                  })
                  .sort((a, b) => {
                    if (
                      `${a.firstName} ${a.lastName}` <
                      `${b.firstName} ${b.lastName}`
                    ) {
                      return -1
                    }
                    if (
                      `${a.firstName} ${a.lastName}` >
                      `${b.firstName} ${b.lastName}`
                    ) {
                      return 1
                    }
                    return 0
                  })
                  .map(
                    (contact): ReactElement => (
                      <PersonListItem
                        key={contact._id}
                        contact={contact}
                        definitions={definitions}
                      />
                    )
                  )
              ) : (
                <>
                  {[1, 2, 3, 4].map((num) => (
                    <Card
                      key={`placeholder-contact${num}`}
                      sx={{ width: '100%', maxWidth: 345, mb: 2 }}
                    >
                      <CardContent
                        sx={{
                          '&:last-child': {
                            pb: 2
                          }
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          <Skeleton
                            variant="text"
                            width={80}
                            sx={{
                              mt: '3px'
                            }}
                          />
                        </Typography>
                        <Typography variant="h6">
                          <Skeleton
                            variant="text"
                            width={200}
                            sx={{
                              pt: '3px',
                              mb: 0.5
                            }}
                          />
                        </Typography>
                        <Typography variant="body1">
                          <Skeleton variant="text" width={140} />
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </TabPanel>
          )
        })}
    </TabContext>
  )
}

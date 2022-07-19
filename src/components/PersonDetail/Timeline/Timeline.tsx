import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@mui/lab'
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography
} from '@mui/material'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'

import { getContactTimeline } from '../../../lib/queries/getContactTimeline'
import { GetContactTimeline } from '../../../lib/queries/getContactTimeline/getContactTimeline'

import { PersonDetailTimelineDefault } from './Default'
import { PersonDetailTimelinePost } from './Post'

export interface PersonDetailTimelineProps {
  id: string
}

function TimelineItemLoading(): ReactElement {
  return (
    <TimelineItem sx={{ py: 1, '&:before': { p: 0, flex: 0 } }}>
      <TimelineSeparator>
        <TimelineDot sx={{ mx: '12px' }} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography>
          <Skeleton width={100} />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Skeleton width={80} />
        </Typography>
      </TimelineContent>
    </TimelineItem>
  )
}

type Filter = 'post' | 'all'

export function PersonDetailTimeline({
  id
}: PersonDetailTimelineProps): ReactElement {
  const { data, isLoading } = useQuery(
    ['contactTimeline', id],
    getContactTimeline(id)
  )
  const [filter, setFilter] = useState<Filter>('post')

  const handleChange = (event: SelectChangeEvent): void => {
    setFilter(event.target.value as Filter)
  }
  return (
    <>
      <Box sx={{ px: 2, pt: 2 }}>
        <Select
          sx={{ width: '100%' }}
          value={filter}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Filter' }}
          startAdornment={
            <InputAdornment position="start">
              <FilterAltOutlinedIcon />
            </InputAdornment>
          }
        >
          <MenuItem value="post">Posts</MenuItem>
          <MenuItem value="all">All</MenuItem>
        </Select>
      </Box>
      <Timeline sx={{ mt: 0, px: 1 }}>
        {isLoading
          ? [0, 1, 2, 3, 4, 5].map((value) => (
              <TimelineItemLoading key={value} />
            ))
          : data?.map(
              (timeline) =>
                (filter === 'all' || filter === timeline._type) && (
                  <TimelineItem
                    key={timeline._id}
                    sx={{ py: 1, '&:before': { p: 0, flex: 0 } }}
                  >
                    {renderContactTimeline(timeline)}
                  </TimelineItem>
                )
            )}
      </Timeline>
    </>
  )
}

function renderContactTimeline(timeline: GetContactTimeline): ReactElement {
  switch (timeline._type) {
    case 'post':
      return <PersonDetailTimelinePost timeline={timeline} />
    default:
      return <PersonDetailTimelineDefault timeline={timeline} />
  }
}

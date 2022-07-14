import { Timeline, TimelineItem } from '@mui/lab'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'

import { getContactTimeline } from '../../../lib/queries/getContactTimeline'
import { GetContactTimeline } from '../../../lib/queries/getContactTimeline/getContactTimeline'

import { PersonDetailTimelineDefault } from './Default'
import { PersonDetailTimelinePost } from './Post'

export interface PersonDetailTimelineProps {
  id: string
}

export function PersonDetailTimeline({
  id
}: PersonDetailTimelineProps): ReactElement {
  const { data, isLoading } = useQuery(
    ['contactTimeline', id],
    getContactTimeline(id)
  )

  return (
    <Timeline sx={{ mt: 0, px: 1 }}>
      {data?.map((timeline) => (
        <TimelineItem key={timeline._id} sx={{ '&:before': { p: 0, flex: 0 } }}>
          {renderContactTimeline(timeline)}
        </TimelineItem>
      ))}
    </Timeline>
  )
}

function renderContactTimeline(timeline: GetContactTimeline): ReactElement {
  switch (timeline._type) {
    case 'post':
      return <PersonDetailTimelinePost timeline={timeline} />
    case undefined:
      return <PersonDetailTimelineDefault timeline={timeline} />
  }
}

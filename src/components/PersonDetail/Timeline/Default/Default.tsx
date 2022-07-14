import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator
} from '@mui/lab'
import { Divider, Typography } from '@mui/material'
import { formatDistance, parseISO } from 'date-fns'
import { ReactElement } from 'react'

import { GetContactTimelineDefault } from '../../../../lib/queries/getContactTimeline/getContactTimeline'

interface Props {
  timeline: GetContactTimelineDefault
}

export function PersonDetailTimelineDefault({ timeline }: Props): ReactElement {
  const date = parseISO(timeline.date)
  return (
    <>
      <TimelineSeparator>
        <TimelineDot sx={{ mx: '12px' }} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography>{timeline.message}</Typography>
        <Typography variant="body2" color="textSecondary">
          {formatDistance(date, new Date(), { addSuffix: true })}
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </TimelineContent>
    </>
  )
}
